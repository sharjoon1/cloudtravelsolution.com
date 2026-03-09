import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendCampaign } from "@/lib/email-campaigns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== (process.env.CRON_SECRET || "cron-secret-change-me")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "email-campaigns",
      where: {
        status: { equals: "scheduled" },
        scheduledAt: { less_than_equal: new Date().toISOString() },
      },
      limit: 10,
    });

    const campaigns = result.docs;

    if (campaigns.length === 0) {
      return NextResponse.json({ success: true, message: "No campaigns to send" });
    }

    for (const campaign of campaigns) {
      sendCampaign(campaign.id as number).catch((err) =>
        console.error(`[Cron Send Error] Campaign ${campaign.id}:`, err)
      );
    }

    return NextResponse.json({
      success: true,
      message: `Triggered ${campaigns.length} campaign(s)`,
    });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
