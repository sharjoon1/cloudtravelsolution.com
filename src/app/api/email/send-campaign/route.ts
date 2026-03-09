import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendCampaign } from "@/lib/email-campaigns";
import { sendCampaignEmail } from "@/lib/email";
import {
  renderNewsletterTemplate,
  renderPromotionTemplate,
  renderTravelAlertTemplate,
  renderVisaUpdateTemplate,
  renderCustomTemplate,
} from "@/lib/email-templates";

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: request.headers });
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { campaignId, test } = await request.json();
    if (!campaignId) {
      return NextResponse.json({ success: false, message: "Campaign ID required" }, { status: 400 });
    }

    if (test) {
      const campaign = await payload.findByID({ collection: "email-campaigns", id: campaignId });
      if (!campaign) {
        return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
      }

      const unsubscribeUrl = "#test-preview";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const templateData = (campaign as any).templateData || {};
      const template = campaign.template as string;

      let html: string;
      switch (template) {
        case "newsletter":
          html = renderNewsletterTemplate(templateData, unsubscribeUrl);
          break;
        case "promotion":
          html = renderPromotionTemplate(templateData, unsubscribeUrl);
          break;
        case "travel-alert":
          html = renderTravelAlertTemplate(templateData, unsubscribeUrl);
          break;
        case "visa-update":
          html = renderVisaUpdateTemplate(templateData, unsubscribeUrl);
          break;
        default:
          html = renderCustomTemplate("<p>Test preview</p>", unsubscribeUrl);
      }

      const result = await sendCampaignEmail({
        to: user.email,
        subject: `[TEST] ${campaign.subject}`,
        html,
        campaignId: String(campaignId),
      });

      return NextResponse.json({ success: result.success, message: result.success ? "Test email sent" : result.error });
    }

    // Real send — run in background
    sendCampaign(campaignId).catch((err) => console.error("[Send Campaign Error]", err));

    return NextResponse.json({ success: true, message: "Campaign sending started" });
  } catch (error) {
    console.error("Send campaign error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
