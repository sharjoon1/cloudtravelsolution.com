import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { mutateCampaignStats, type CampaignStatsPayload } from "@/lib/campaign-stats";
import { verifyWebhookSignature } from "@/lib/webhook-signature";

interface ResendWebhookEvent {
  type: string;
  data: {
    email_id: string;
    to: string[];
    tags?: { name: string; value: string }[];
  };
}

// Soft rollout: warn once per process while the signing secret is unset, so
// the existing (insecure) flow keeps working until RESEND_WEBHOOK_SECRET lands.
let warnedUnverifiedSecret = false;

export async function POST(request: Request) {
  try {
    // Verify against the RAW body — re-serialised JSON invalidates the signature.
    const rawBody = await request.text();

    const secret = process.env.RESEND_WEBHOOK_SECRET;
    if (secret) {
      const result = verifyWebhookSignature({
        secret,
        body: rawBody,
        headers: {
          "svix-id": request.headers.get("svix-id") ?? undefined,
          "svix-timestamp": request.headers.get("svix-timestamp") ?? undefined,
          "svix-signature": request.headers.get("svix-signature") ?? undefined,
        },
      });
      if (!result.ok) {
        return NextResponse.json(
          { error: "invalid signature", reason: result.reason },
          { status: 401 }
        );
      }
    } else if (!warnedUnverifiedSecret) {
      warnedUnverifiedSecret = true;
      console.warn(
        "[email/webhook] RESEND_WEBHOOK_SECRET is not set — accepting unverified webhooks. " +
          "Add the signing secret (Resend → Webhooks → your endpoint) to enforce signature verification."
      );
    }

    const event = JSON.parse(rawBody) as ResendWebhookEvent;
    const payload = await getPayload({ config });

    const campaignTag = event.data.tags?.find((t) => t.name === "campaign_id");
    if (!campaignTag) {
      return NextResponse.json({ received: true });
    }

    const campaignId = parseInt(campaignTag.value, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json({ received: true });
    }

    const campaign = await payload.findByID({
      collection: "email-campaigns",
      id: campaignId,
    });

    if (!campaign) {
      return NextResponse.json({ received: true });
    }

    // Subscriber side-effects captured during the stats mutation, applied after
    // the lock is released so they can't block other webhook events.
    let bouncedEmail: string | undefined;
    let complainedEmail: string | undefined;

    // Atomic, clobber-free counter update: read-merge-write under the
    // per-campaign lock, so concurrent deliveries don't lose increments and the
    // webhook never stomps on sendCampaign's totalSent (or vice-versa).
    await mutateCampaignStats(
      payload as unknown as CampaignStatsPayload,
      campaignId,
      (s) => {
        switch (event.type) {
          case "email.delivered":
            s.delivered += 1;
            break;
          case "email.opened":
            s.opened += 1;
            break;
          case "email.clicked":
            s.clicked += 1;
            break;
          case "email.bounced":
            s.bounced += 1;
            bouncedEmail = event.data.to?.[0];
            break;
          case "email.complained":
            s.unsubscribed += 1;
            complainedEmail = event.data.to?.[0];
            break;
        }
      }
    );

    if (bouncedEmail) {
      const sub = await payload.find({
        collection: "subscribers",
        where: { email: { equals: bouncedEmail } },
        limit: 1,
      });
      if (sub.docs[0]) {
        await payload.update({
          collection: "subscribers",
          id: sub.docs[0].id,
          data: { status: "bounced" },
        });
      }
    }

    if (complainedEmail) {
      const sub = await payload.find({
        collection: "subscribers",
        where: { email: { equals: complainedEmail } },
        limit: 1,
      });
      if (sub.docs[0]) {
        await payload.update({
          collection: "subscribers",
          id: sub.docs[0].id,
          data: { status: "unsubscribed", unsubscribedAt: new Date().toISOString() },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
