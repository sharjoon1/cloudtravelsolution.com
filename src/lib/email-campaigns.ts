import { getPayload } from "payload";
import config from "@payload-config";
import { sendCampaignEmail } from "./email";
import {
  renderNewsletterTemplate,
  renderPromotionTemplate,
  renderTravelAlertTemplate,
  renderVisaUpdateTemplate,
  renderCustomTemplate,
} from "./email-templates";

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "https://cloudtravelsolution.com";

interface CampaignDoc {
  id: number;
  subject: string;
  template: string;
  content?: unknown;
  templateData?: {
    headline?: string | null;
    bodyText?: string | null;
    offerPercentage?: string | null;
    ctaText?: string | null;
    ctaUrl?: string | null;
    alertType?: string | null;
    countryName?: string | null;
    featuredImage?: { url?: string } | null;
  } | null;
  audience: string;
  segmentFilter?: { tag: string }[] | null;
}

interface SubscriberDoc {
  id: number;
  email: string;
  unsubscribeToken: string;
}

async function getMatchingSubscribers(campaign: CampaignDoc): Promise<SubscriberDoc[]> {
  const payload = await getPayload({ config });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {
    status: { equals: "active" },
  };

  if (campaign.audience === "segment-filter" && campaign.segmentFilter?.length) {
    const tags = campaign.segmentFilter.map((s) => s.tag);
    where["segments.tag"] = { in: tags };
  }

  const result = await payload.find({
    collection: "subscribers",
    where,
    limit: 10000,
    pagination: false,
  });

  return result.docs as unknown as SubscriberDoc[];
}

function renderCampaignHtml(campaign: CampaignDoc, unsubscribeUrl: string): string {
  const data = campaign.templateData || {};

  switch (campaign.template) {
    case "newsletter":
      return renderNewsletterTemplate(data, unsubscribeUrl);
    case "promotion":
      return renderPromotionTemplate(data, unsubscribeUrl);
    case "travel-alert":
      return renderTravelAlertTemplate(data, unsubscribeUrl);
    case "visa-update":
      return renderVisaUpdateTemplate(data, unsubscribeUrl);
    case "custom":
    default: {
      const richTextHtml = extractRichTextHtml(campaign.content);
      return renderCustomTemplate(richTextHtml, unsubscribeUrl);
    }
  }
}

function extractRichTextHtml(content: unknown): string {
  if (!content || typeof content !== "object") return "";

  const root = (content as Record<string, unknown>).root;
  if (!root || typeof root !== "object") return "";

  const children = (root as Record<string, unknown>).children;
  if (!Array.isArray(children)) return "";

  return children
    .map((node: Record<string, unknown>) => {
      if (node.type === "paragraph") {
        const text = extractNodeText(node);
        return `<p style="margin:0 0 12px;">${text}</p>`;
      }
      if (node.type === "heading") {
        const tag = node.tag || "h3";
        const text = extractNodeText(node);
        return `<${tag} style="margin:0 0 12px;color:#0c6cbc;">${text}</${tag}>`;
      }
      if (node.type === "list") {
        const listTag = node.listType === "number" ? "ol" : "ul";
        const items = (node.children as Record<string, unknown>[])
          ?.map((li) => `<li>${extractNodeText(li)}</li>`)
          .join("");
        return `<${listTag} style="margin:0 0 12px;padding-left:20px;">${items}</${listTag}>`;
      }
      return "";
    })
    .join("\n");
}

function extractNodeText(node: Record<string, unknown>): string {
  if (typeof node.text === "string") {
    let text = node.text;
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    return text;
  }
  if (Array.isArray(node.children)) {
    return (node.children as Record<string, unknown>[]).map(extractNodeText).join("");
  }
  return "";
}

const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendCampaign(campaignId: number): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config });

  const campaign = await payload.findByID({
    collection: "email-campaigns",
    id: campaignId,
  }) as unknown as CampaignDoc;

  if (!campaign) {
    return { success: false, error: "Campaign not found" };
  }

  await payload.update({
    collection: "email-campaigns",
    id: campaignId,
    data: { status: "sending" },
  });

  try {
    const subscribers = await getMatchingSubscribers(campaign);

    if (subscribers.length === 0) {
      await payload.update({
        collection: "email-campaigns",
        id: campaignId,
        data: {
          status: "sent",
          sentAt: new Date().toISOString(),
          stats: { totalSent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 },
        },
      });
      return { success: true };
    }

    let totalSent = 0;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      const results = await Promise.allSettled(
        batch.map((subscriber) => {
          const unsubscribeUrl = `${siteUrl()}/api/email/unsubscribe?token=${subscriber.unsubscribeToken}`;
          const html = renderCampaignHtml(campaign, unsubscribeUrl);

          return sendCampaignEmail({
            to: subscriber.email,
            subject: campaign.subject,
            html,
            campaignId: String(campaignId),
          });
        })
      );

      totalSent += results.filter((r) => r.status === "fulfilled" && r.value.success).length;

      await payload.update({
        collection: "email-campaigns",
        id: campaignId,
        data: { stats: { totalSent, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 } },
      });

      if (i + BATCH_SIZE < subscribers.length) {
        await sleep(BATCH_DELAY_MS);
      }
    }

    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: {
        status: "sent",
        sentAt: new Date().toISOString(),
        stats: { totalSent, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 },
      },
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    await payload.update({
      collection: "email-campaigns",
      id: campaignId,
      data: { status: "failed" },
    });
    return { success: false, error: message };
  }
}
