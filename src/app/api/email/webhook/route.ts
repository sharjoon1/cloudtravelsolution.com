import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

interface ResendWebhookEvent {
  type: string;
  data: {
    email_id: string;
    to: string[];
    tags?: { name: string; value: string }[];
  };
}

export async function POST(request: Request) {
  try {
    const event: ResendWebhookEvent = await request.json();
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stats = (campaign as any).stats || {
      totalSent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
    };

    switch (event.type) {
      case "email.delivered":
        stats.delivered = (stats.delivered || 0) + 1;
        break;
      case "email.opened":
        stats.opened = (stats.opened || 0) + 1;
        break;
      case "email.clicked":
        stats.clicked = (stats.clicked || 0) + 1;
        break;
      case "email.bounced": {
        stats.bounced = (stats.bounced || 0) + 1;
        const bouncedEmail = event.data.to?.[0];
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
        break;
      }
      case "email.complained": {
        stats.unsubscribed = (stats.unsubscribed || 0) + 1;
        const complainedEmail = event.data.to?.[0];
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
        break;
      }
    }

    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: { stats },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
