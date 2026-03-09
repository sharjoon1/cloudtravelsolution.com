# Email Marketing System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a fully integrated email marketing system inside Payload CMS + Resend — subscribers, campaigns, templates, scheduling, and analytics.

**Architecture:** Two new Payload collections (Subscribers, EmailCampaigns), auto-sync hooks on existing collections, 4 pre-built HTML email templates + custom rich text, batch sending via Resend API, cron-based scheduling, webhook-based analytics, and token-based unsubscribe flow.

**Tech Stack:** Payload CMS 3.76, Resend API, Next.js 15 API routes, SQLite, Zod validation

---

## Task 1: Subscribers Collection

**Files:**
- Create: `src/collections/Subscribers.ts`
- Modify: `payload.config.ts:26,65` (add import + register)

**Step 1: Create the Subscribers collection**

Create `src/collections/Subscribers.ts`:

```typescript
import type { CollectionConfig } from "payload";
import crypto from "crypto";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
    group: "Email Marketing",
    defaultColumns: ["email", "name", "source", "status", "subscribedAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && data) {
          if (!data.subscribedAt) {
            data.subscribedAt = new Date().toISOString();
          }
          if (!data.unsubscribeToken) {
            data.unsubscribeToken = crypto.randomBytes(32).toString("hex");
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "manual",
      options: [
        { label: "Newsletter Form", value: "newsletter-form" },
        { label: "Lead Form", value: "lead-form" },
        { label: "Inquiry Form", value: "inquiry-form" },
        { label: "B2B Form", value: "b2b-form" },
        { label: "Manual", value: "manual" },
        { label: "Import", value: "import" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      admin: { position: "sidebar" },
      options: [
        { label: "Active", value: "active" },
        { label: "Unsubscribed", value: "unsubscribed" },
        { label: "Bounced", value: "bounced" },
      ],
    },
    {
      name: "segments",
      type: "array",
      admin: {
        description: "Tags for targeting (e.g. us-visa, bangalore, student)",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "subscribedAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "unsubscribedAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "unsubscribeToken",
      type: "text",
      admin: { hidden: true },
    },
  ],
};
```

**Step 2: Register in payload.config.ts**

Add import at line 26 (after B2BInquiries import):
```typescript
import { Subscribers } from "./src/collections/Subscribers";
```

Add `Subscribers` to the collections array after `B2BInquiries`.

**Step 3: Verify**

Run: `npm run dev` — check that the `subscribers` collection appears in admin panel under "Email Marketing" group. Stop dev server.

**Step 4: Commit**

```bash
git add src/collections/Subscribers.ts payload.config.ts
git commit -m "feat: add Subscribers collection for email marketing"
```

---

## Task 2: EmailCampaigns Collection

**Files:**
- Create: `src/collections/EmailCampaigns.ts`
- Modify: `payload.config.ts` (add import + register)

**Step 1: Create the EmailCampaigns collection**

Create `src/collections/EmailCampaigns.ts`:

```typescript
import type { CollectionConfig } from "payload";

export const EmailCampaigns: CollectionConfig = {
  slug: "email-campaigns",
  admin: {
    useAsTitle: "name",
    group: "Email Marketing",
    defaultColumns: ["name", "subject", "template", "status", "sentAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Internal campaign name (not shown to recipients)" },
    },
    {
      name: "subject",
      type: "text",
      required: true,
      admin: { description: "Email subject line recipients will see" },
    },
    {
      name: "template",
      type: "select",
      required: true,
      defaultValue: "custom",
      options: [
        { label: "Newsletter", value: "newsletter" },
        { label: "Promotion", value: "promotion" },
        { label: "Travel Alert", value: "travel-alert" },
        { label: "Visa Update", value: "visa-update" },
        { label: "Custom (Rich Text)", value: "custom" },
      ],
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description: "Email body content (used with Custom template)",
        condition: (data) => data?.template === "custom",
      },
    },
    {
      name: "templateData",
      type: "group",
      admin: {
        description: "Fields for pre-built templates",
        condition: (data) => data?.template !== "custom",
      },
      fields: [
        {
          name: "headline",
          type: "text",
          admin: { description: "Main heading in the email" },
        },
        {
          name: "bodyText",
          type: "textarea",
          admin: { description: "Main body text" },
        },
        {
          name: "offerPercentage",
          type: "text",
          admin: {
            description: "E.g. 20% OFF (Promotion template)",
            condition: (_, siblingData) => siblingData?.template === "promotion",
          },
        },
        {
          name: "ctaText",
          type: "text",
          admin: { description: "Button text e.g. Learn More, Book Now" },
        },
        {
          name: "ctaUrl",
          type: "text",
          admin: { description: "Button link URL" },
        },
        {
          name: "alertType",
          type: "select",
          options: [
            { label: "Info", value: "info" },
            { label: "Warning", value: "warning" },
            { label: "Urgent", value: "urgent" },
          ],
          admin: {
            description: "Alert severity (Travel Alert template)",
            condition: (_, siblingData) => siblingData?.template === "travel-alert",
          },
        },
        {
          name: "countryName",
          type: "text",
          admin: {
            description: "Country this alert/update is about",
            condition: (_, siblingData) =>
              siblingData?.template === "travel-alert" || siblingData?.template === "visa-update",
          },
        },
        {
          name: "featuredImage",
          type: "upload",
          relationTo: "media",
          admin: { description: "Optional image for the email" },
        },
      ],
    },
    {
      name: "audience",
      type: "select",
      required: true,
      defaultValue: "all-active",
      options: [
        { label: "All Active Subscribers", value: "all-active" },
        { label: "Filter by Segments", value: "segment-filter" },
      ],
    },
    {
      name: "segmentFilter",
      type: "array",
      admin: {
        description: "Target subscribers with these segment tags",
        condition: (data) => data?.audience === "segment-filter",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      admin: { position: "sidebar" },
      options: [
        { label: "Draft", value: "draft" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Sending", value: "sending" },
        { label: "Sent", value: "sent" },
        { label: "Failed", value: "failed" },
      ],
    },
    {
      name: "scheduledAt",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Schedule send date/time",
        date: { pickerAppearance: "dayAndTime" },
        condition: (data) => data?.status === "scheduled",
      },
    },
    {
      name: "sentAt",
      type: "date",
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "stats",
      type: "group",
      admin: { readOnly: true },
      fields: [
        { name: "totalSent", type: "number", defaultValue: 0 },
        { name: "delivered", type: "number", defaultValue: 0 },
        { name: "opened", type: "number", defaultValue: 0 },
        { name: "clicked", type: "number", defaultValue: 0 },
        { name: "bounced", type: "number", defaultValue: 0 },
        { name: "unsubscribed", type: "number", defaultValue: 0 },
      ],
    },
  ],
};
```

**Step 2: Register in payload.config.ts**

Add import:
```typescript
import { EmailCampaigns } from "./src/collections/EmailCampaigns";
```

Add `EmailCampaigns` to the collections array after `Subscribers`.

**Step 3: Verify**

Run: `npm run dev` — check that `email-campaigns` appears in admin under "Email Marketing". Stop dev server.

**Step 4: Commit**

```bash
git add src/collections/EmailCampaigns.ts payload.config.ts
git commit -m "feat: add EmailCampaigns collection with template data and stats"
```

---

## Task 3: Email Templates

**Files:**
- Create: `src/lib/email-templates.ts`
- Modify: `src/lib/email.ts` (add `campaignEmailLayout` and `unsubscribeFooter` helpers)

**Step 1: Add campaign email helpers to email.ts**

Add these exports at the bottom of `src/lib/email.ts`:

```typescript
// ── Campaign Email Helpers ────────────────────────────────────────────

export function campaignEmailLayout(title: string, body: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
  <tr><td style="background:#0c6cbc;padding:24px 32px;">
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Cloud Travel Solutions</h1>
  </td></tr>
  <tr><td style="padding:32px;">
    <h2 style="margin:0 0 16px;color:#0c6cbc;font-size:18px;">${title}</h2>
    ${body}
  </td></tr>
  <tr><td style="background:#f8f9fa;padding:20px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;color:#6b7280;font-size:13px;">Cloud Travel Solutions | Visa & Travel Services</p>
    <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Bangalore | Hyderabad | Delhi | Chennai</p>
    <p style="margin:4px 0 0;color:#6b7280;font-size:12px;">cloudtravelsolution.com</p>
    <p style="margin:12px 0 0;color:#9ca3af;font-size:11px;">
      You're receiving this because you subscribed at cloudtravelsolution.com.
      <a href="${unsubscribeUrl}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendCampaignEmail(opts: {
  to: string;
  subject: string;
  html: string;
  campaignId: string;
}): Promise<EmailResult> {
  const resend = getResend();
  if (!resend) {
    console.log(`[Campaign Email - Dev Mode] To: ${opts.to} | Subject: ${opts.subject}`);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: `Cloud Travel Solutions <${fromEmail()}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      headers: {
        "X-Campaign-ID": opts.campaignId,
      },
      tags: [
        { name: "campaign_id", value: opts.campaignId },
      ],
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error(`[Campaign Email Error] ${message}`);
    return { success: false, error: message };
  }
}
```

Note: You also need to export `getResend`, `fromEmail`, and `EmailResult` from `email.ts` so they can be used by `email-campaigns.ts`. Change the existing declarations:
- `function getResend()` → `export function getResend()`
- `const fromEmail` → `export const fromEmail`
- `type EmailResult` → `export type EmailResult`

**Step 2: Create email-templates.ts**

Create `src/lib/email-templates.ts`:

```typescript
import { campaignEmailLayout } from "./email";

interface TemplateData {
  headline?: string | null;
  bodyText?: string | null;
  offerPercentage?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  alertType?: string | null;
  countryName?: string | null;
  featuredImage?: { url?: string } | null;
}

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "https://cloudtravelsolution.com";

function ctaButton(text: string, url: string): string {
  return `<p style="margin:24px 0;text-align:center;">
    <a href="${url}" style="display:inline-block;padding:12px 28px;background:#0c6cbc;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">${text}</a>
  </p>`;
}

function imageBlock(url: string): string {
  return `<p style="margin:16px 0;"><img src="${url}" alt="" style="width:100%;max-width:536px;height:auto;border-radius:8px;" /></p>`;
}

export function renderNewsletterTemplate(data: TemplateData, unsubscribeUrl: string): string {
  const body = `
    ${data.headline ? `<h2 style="margin:0 0 16px;color:#0c6cbc;font-size:22px;font-weight:700;">${data.headline}</h2>` : ""}
    ${data.featuredImage?.url ? imageBlock(data.featuredImage.url) : ""}
    ${data.bodyText ? `<p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;white-space:pre-wrap;">${data.bodyText}</p>` : ""}
    ${data.ctaText && data.ctaUrl ? ctaButton(data.ctaText, data.ctaUrl) : ctaButton("Visit Our Website", siteUrl())}
  `;
  return campaignEmailLayout(data.headline || "Newsletter", body, unsubscribeUrl);
}

export function renderPromotionTemplate(data: TemplateData, unsubscribeUrl: string): string {
  const body = `
    ${data.offerPercentage ? `<div style="text-align:center;margin:0 0 20px;">
      <span style="display:inline-block;padding:8px 20px;background:#0c6cbc;color:#ffffff;font-size:24px;font-weight:800;border-radius:8px;">${data.offerPercentage}</span>
    </div>` : ""}
    ${data.headline ? `<h2 style="margin:0 0 12px;color:#0c6cbc;font-size:22px;font-weight:700;text-align:center;">${data.headline}</h2>` : ""}
    ${data.featuredImage?.url ? imageBlock(data.featuredImage.url) : ""}
    ${data.bodyText ? `<p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 20px;white-space:pre-wrap;">${data.bodyText}</p>` : ""}
    ${data.ctaText && data.ctaUrl ? ctaButton(data.ctaText, data.ctaUrl) : ctaButton("Grab This Offer", siteUrl())}
  `;
  return campaignEmailLayout(data.headline || "Special Offer", body, unsubscribeUrl);
}

export function renderTravelAlertTemplate(data: TemplateData, unsubscribeUrl: string): string {
  const alertColors: Record<string, { bg: string; border: string; label: string }> = {
    info: { bg: "#eff6ff", border: "#3b82f6", label: "INFO" },
    warning: { bg: "#fffbeb", border: "#f59e0b", label: "WARNING" },
    urgent: { bg: "#fef2f2", border: "#ef4444", label: "URGENT" },
  };
  const alert = alertColors[data.alertType || "info"] || alertColors.info;

  const body = `
    <div style="padding:16px;background:${alert.bg};border-left:4px solid ${alert.border};border-radius:4px;margin:0 0 20px;">
      <span style="display:inline-block;padding:2px 8px;background:${alert.border};color:#ffffff;font-size:11px;font-weight:700;border-radius:3px;letter-spacing:0.5px;">${alert.label}</span>
      ${data.countryName ? `<span style="margin-left:8px;color:#374151;font-size:14px;font-weight:600;">${data.countryName}</span>` : ""}
    </div>
    ${data.headline ? `<h2 style="margin:0 0 12px;color:#111827;font-size:20px;font-weight:700;">${data.headline}</h2>` : ""}
    ${data.bodyText ? `<p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 20px;white-space:pre-wrap;">${data.bodyText}</p>` : ""}
    ${data.ctaText && data.ctaUrl ? ctaButton(data.ctaText, data.ctaUrl) : ""}
  `;
  return campaignEmailLayout(data.headline || "Travel Alert", body, unsubscribeUrl);
}

export function renderVisaUpdateTemplate(data: TemplateData, unsubscribeUrl: string): string {
  const body = `
    ${data.countryName ? `<p style="margin:0 0 8px;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">VISA UPDATE</p>
    <p style="margin:0 0 16px;color:#0c6cbc;font-size:16px;font-weight:700;">${data.countryName}</p>` : ""}
    ${data.headline ? `<h2 style="margin:0 0 12px;color:#111827;font-size:20px;font-weight:700;">${data.headline}</h2>` : ""}
    ${data.featuredImage?.url ? imageBlock(data.featuredImage.url) : ""}
    ${data.bodyText ? `<p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 20px;white-space:pre-wrap;">${data.bodyText}</p>` : ""}
    ${data.ctaText && data.ctaUrl ? ctaButton(data.ctaText, data.ctaUrl) : ctaButton("Learn More", siteUrl())}
  `;
  return campaignEmailLayout(data.headline || "Visa Update", body, unsubscribeUrl);
}

export function renderCustomTemplate(richTextHtml: string, unsubscribeUrl: string): string {
  const body = `<div style="color:#374151;font-size:15px;line-height:1.7;">${richTextHtml}</div>`;
  return campaignEmailLayout("", body, unsubscribeUrl);
}
```

**Step 3: Commit**

```bash
git add src/lib/email-templates.ts src/lib/email.ts
git commit -m "feat: add campaign email layout, send helper, and 4 pre-built email templates"
```

---

## Task 4: Campaign Send Logic

**Files:**
- Create: `src/lib/email-campaigns.ts`

**Step 1: Create the campaign send engine**

Create `src/lib/email-campaigns.ts`:

```typescript
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
  const where: Record<string, unknown> = {
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
      // For custom template, convert Lexical rich text to HTML
      // Payload stores rich text as Lexical JSON — we'll do a simple extraction
      const richTextHtml = extractRichTextHtml(campaign.content);
      return renderCustomTemplate(richTextHtml, unsubscribeUrl);
    }
  }
}

function extractRichTextHtml(content: unknown): string {
  // Lexical stores as { root: { children: [...] } }
  // Simple extraction — converts paragraph nodes to HTML
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

  // Get campaign
  const campaign = await payload.findByID({
    collection: "email-campaigns",
    id: campaignId,
  }) as unknown as CampaignDoc;

  if (!campaign) {
    return { success: false, error: "Campaign not found" };
  }

  // Update status to sending
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
        data: { status: "sent", sentAt: new Date().toISOString(), stats: { totalSent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 } },
      });
      return { success: true };
    }

    let totalSent = 0;

    // Send in batches
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

      // Update stats progressively
      await payload.update({
        collection: "email-campaigns",
        id: campaignId,
        data: { stats: { totalSent, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0 } },
      });

      // Delay between batches
      if (i + BATCH_SIZE < subscribers.length) {
        await sleep(BATCH_DELAY_MS);
      }
    }

    // Mark as sent
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
```

**Step 2: Commit**

```bash
git add src/lib/email-campaigns.ts
git commit -m "feat: add campaign send engine with batch processing and rich text rendering"
```

---

## Task 5: API Routes — Send Campaign, Cron, Webhook, Unsubscribe

**Files:**
- Create: `src/app/api/email/send-campaign/route.ts`
- Create: `src/app/api/email/cron/route.ts`
- Create: `src/app/api/email/webhook/route.ts`
- Create: `src/app/api/email/unsubscribe/route.ts`

**Step 1: Send Campaign API**

Create `src/app/api/email/send-campaign/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendCampaign } from "@/lib/email-campaigns";

export async function POST(request: Request) {
  try {
    // Verify admin auth
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
      // Send test email to the admin user
      const campaign = await payload.findByID({ collection: "email-campaigns", id: campaignId });
      if (!campaign) {
        return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
      }

      // Import dynamically to avoid circular deps
      const { sendCampaignEmail, campaignEmailLayout } = await import("@/lib/email");
      const {
        renderNewsletterTemplate,
        renderPromotionTemplate,
        renderTravelAlertTemplate,
        renderVisaUpdateTemplate,
        renderCustomTemplate,
      } = await import("@/lib/email-templates");

      const unsubscribeUrl = "#test-preview";
      const templateData = (campaign as Record<string, unknown>).templateData || {};
      const template = campaign.template as string;

      let html: string;
      switch (template) {
        case "newsletter":
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          html = renderNewsletterTemplate(templateData as any, unsubscribeUrl);
          break;
        case "promotion":
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          html = renderPromotionTemplate(templateData as any, unsubscribeUrl);
          break;
        case "travel-alert":
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          html = renderTravelAlertTemplate(templateData as any, unsubscribeUrl);
          break;
        case "visa-update":
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          html = renderVisaUpdateTemplate(templateData as any, unsubscribeUrl);
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

    // Send for real — run in background
    sendCampaign(campaignId).catch((err) => console.error("[Send Campaign Error]", err));

    return NextResponse.json({ success: true, message: "Campaign sending started" });
  } catch (error) {
    console.error("Send campaign error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
```

**Step 2: Cron API**

Create `src/app/api/email/cron/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendCampaign } from "@/lib/email-campaigns";

export async function GET(request: Request) {
  // Simple secret-based auth for cron
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== (process.env.CRON_SECRET || "cron-secret-change-me")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });

    // Find scheduled campaigns that are due
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

    // Trigger sends
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
```

**Step 3: Webhook API**

Create `src/app/api/email/webhook/route.ts`:

```typescript
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
    // Verify webhook secret via header (Resend sends svix-id, svix-timestamp, svix-signature)
    // For now, accept all — add svix verification in production hardening
    const event: ResendWebhookEvent = await request.json();
    const payload = await getPayload({ config });

    // Extract campaign ID from tags
    const campaignTag = event.data.tags?.find((t) => t.name === "campaign_id");
    if (!campaignTag) {
      return NextResponse.json({ received: true });
    }

    const campaignId = parseInt(campaignTag.value, 10);
    if (isNaN(campaignId)) {
      return NextResponse.json({ received: true });
    }

    // Get current stats
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

    // Update stats based on event type
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
        // Mark subscriber as bounced
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
        // Mark subscriber as unsubscribed
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

    // Save updated stats
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
```

**Step 4: Unsubscribe API**

Create `src/app/api/email/unsubscribe/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribe?status=invalid", request.url));
  }

  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "subscribers",
      where: { unsubscribeToken: { equals: token } },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return NextResponse.redirect(new URL("/unsubscribe?status=invalid", request.url));
    }

    const subscriber = result.docs[0];

    // Already unsubscribed
    if ((subscriber as unknown as { status: string }).status === "unsubscribed") {
      return NextResponse.redirect(new URL("/unsubscribe?status=already", request.url));
    }

    // Unsubscribe
    await payload.update({
      collection: "subscribers",
      id: subscriber.id,
      data: {
        status: "unsubscribed",
        unsubscribedAt: new Date().toISOString(),
      },
    });

    return NextResponse.redirect(new URL("/unsubscribe?status=success", request.url));
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.redirect(new URL("/unsubscribe?status=error", request.url));
  }
}
```

**Step 5: Commit**

```bash
git add src/app/api/email/
git commit -m "feat: add send-campaign, cron, webhook, and unsubscribe API routes"
```

---

## Task 6: Unsubscribe Confirmation Page

**Files:**
- Create: `src/app/(frontend)/unsubscribe/page.tsx`

**Step 1: Create the unsubscribe page**

Create `src/app/(frontend)/unsubscribe/page.tsx`:

```tsx
import type { Metadata } from "next";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsubscribe — Cloud Travel Solutions",
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  const messages: Record<string, { icon: React.ReactNode; title: string; text: string }> = {
    success: {
      icon: <CheckCircle2 className="h-16 w-16 text-[#009e7a]" />,
      title: "You've been unsubscribed",
      text: "You will no longer receive marketing emails from Cloud Travel Solutions. If this was a mistake, you can re-subscribe anytime from our website.",
    },
    already: {
      icon: <AlertCircle className="h-16 w-16 text-[#0c6cbc]" />,
      title: "Already unsubscribed",
      text: "This email address has already been unsubscribed from our mailing list.",
    },
    invalid: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      title: "Invalid link",
      text: "This unsubscribe link is invalid or has expired. Please contact us at info@cloudtravelsolution.com if you need help.",
    },
    error: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      title: "Something went wrong",
      text: "We couldn't process your unsubscribe request. Please try again or contact us at info@cloudtravelsolution.com.",
    },
  };

  const msg = messages[status || "invalid"] || messages.invalid;

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#e3ebf9]">
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <div className="flex justify-center mb-6">{msg.icon}</div>
        <h1 className="text-2xl font-bold text-[#0c6cbc] mb-3">{msg.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{msg.text}</p>
        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-[#0cfcbc] hover:bg-[#0adba5] text-[#094f8a] font-semibold rounded-lg transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add "src/app/(frontend)/unsubscribe/page.tsx"
git commit -m "feat: add unsubscribe confirmation page"
```

---

## Task 7: Subscriber Auto-Sync Hooks

**Files:**
- Create: `src/hooks/subscriberSync.ts`
- Modify: `src/collections/Leads.ts` (add afterChange hook)
- Modify: `src/collections/Inquiries.ts` (add afterChange hook)
- Modify: `src/collections/Customers.ts` (add afterChange hook)
- Modify: `src/collections/B2BInquiries.ts` (add afterChange hook)

**Step 1: Create the sync helper**

Create `src/hooks/subscriberSync.ts`:

```typescript
import type { CollectionAfterChangeHook } from "payload";

interface SyncOptions {
  source: string;
  getEmail: (doc: Record<string, unknown>) => string | undefined;
  getName: (doc: Record<string, unknown>) => string | undefined;
  getSegments: (doc: Record<string, unknown>) => string[];
}

export function createSubscriberSyncHook(options: SyncOptions): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (operation !== "create") return doc;

    const email = options.getEmail(doc);
    if (!email) return doc;

    try {
      // Check if subscriber already exists
      const existing = await req.payload.find({
        collection: "subscribers",
        where: { email: { equals: email } },
        limit: 1,
      });

      if (existing.docs.length > 0) return doc;

      // Create subscriber
      const segments = options.getSegments(doc).map((tag) => ({ tag }));

      await req.payload.create({
        collection: "subscribers",
        data: {
          email,
          name: options.getName(doc) || "",
          source: options.source,
          status: "active",
          segments,
        },
      });
    } catch (error) {
      // Don't fail the main operation if subscriber sync fails
      console.error(`[Subscriber Sync] Failed for ${email}:`, error);
    }

    return doc;
  };
}
```

**Step 2: Add hook to Leads collection**

In `src/collections/Leads.ts`, add import and hooks:

```typescript
import type { CollectionConfig } from "payload";
import { createSubscriberSyncHook } from "../hooks/subscriberSync";

export const Leads: CollectionConfig = {
  slug: "leads",
  // ... existing config ...
  hooks: {
    afterChange: [
      createSubscriberSyncHook({
        source: "lead-form",
        getEmail: (doc) => doc.email as string | undefined,
        getName: (doc) => doc.fullName as string | undefined,
        getSegments: (doc) => {
          const segments: string[] = ["lead"];
          if (doc.destination) segments.push(String(doc.destination));
          return segments;
        },
      }),
    ],
  },
  // ... rest of config ...
};
```

**Step 3: Add hook to Inquiries collection**

In `src/collections/Inquiries.ts`, add import and hooks:

```typescript
import { createSubscriberSyncHook } from "../hooks/subscriberSync";

// Add hooks property to the collection config:
hooks: {
  afterChange: [
    createSubscriberSyncHook({
      source: "inquiry-form",
      getEmail: (doc) => doc.email as string | undefined,
      getName: (doc) => doc.fullName as string | undefined,
      getSegments: (doc) => {
        const segments: string[] = ["inquiry"];
        if (doc.destinationCountry) segments.push(String(doc.destinationCountry).toLowerCase());
        if (doc.visaType) segments.push(String(doc.visaType));
        if (doc.city) segments.push(String(doc.city).toLowerCase());
        return segments;
      },
    }),
  ],
},
```

**Step 4: Add hook to Customers collection**

In `src/collections/Customers.ts`:

```typescript
import { createSubscriberSyncHook } from "../hooks/subscriberSync";

// Add hooks:
hooks: {
  afterChange: [
    createSubscriberSyncHook({
      source: "manual",
      getEmail: (doc) => doc.email as string | undefined,
      getName: (doc) => doc.fullName as string | undefined,
      getSegments: (doc) => {
        const segments: string[] = ["customer"];
        if (doc.city) segments.push(String(doc.city).toLowerCase());
        if (doc.status === "vip") segments.push("vip");
        return segments;
      },
    }),
  ],
},
```

**Step 5: Add hook to B2BInquiries collection**

In `src/collections/B2BInquiries.ts`:

```typescript
import { createSubscriberSyncHook } from "../hooks/subscriberSync";

// Add hooks:
hooks: {
  afterChange: [
    createSubscriberSyncHook({
      source: "b2b-form",
      getEmail: (doc) => doc.email as string | undefined,
      getName: (doc) => doc.contactPerson as string | undefined,
      getSegments: (doc) => {
        const segments: string[] = ["b2b"];
        if (doc.businessType) segments.push(String(doc.businessType));
        if (doc.city) segments.push(String(doc.city).toLowerCase());
        return segments;
      },
    }),
  ],
},
```

**Step 6: Commit**

```bash
git add src/hooks/subscriberSync.ts src/collections/Leads.ts src/collections/Inquiries.ts src/collections/Customers.ts src/collections/B2BInquiries.ts
git commit -m "feat: add subscriber auto-sync hooks on Leads, Inquiries, Customers, B2BInquiries"
```

---

## Task 8: Update Newsletter API Route

**Files:**
- Modify: `src/app/api/newsletter/route.ts`

**Step 1: Update to store subscribers**

Replace `src/app/api/newsletter/route.ts` with:

```typescript
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsletterSchema } from "@/lib/validations";
import { sendNewsletterWelcome } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = newsletterSchema.parse(body);

    const payload = await getPayload({ config });

    // Check if already subscribed
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: validated.email } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const subscriber = existing.docs[0] as unknown as { status: string; id: number };
      if (subscriber.status === "unsubscribed") {
        // Re-subscribe
        await payload.update({
          collection: "subscribers",
          id: subscriber.id,
          data: {
            status: "active",
            unsubscribedAt: null,
            subscribedAt: new Date().toISOString(),
          },
        });
      }
      // Already active — just return success
      return NextResponse.json({ success: true, message: "Subscribed successfully" });
    }

    // Create new subscriber
    await payload.create({
      collection: "subscribers",
      data: {
        email: validated.email,
        source: "newsletter-form",
        status: "active",
        segments: [{ tag: "newsletter" }],
      },
    });

    // Send welcome email
    sendNewsletterWelcome(validated.email);

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/newsletter/route.ts
git commit -m "feat: update newsletter API to store subscribers in Payload collection"
```

---

## Task 9: Production Database Setup & Deployment

**Step 1: Push all changes to GitHub**

```bash
git push origin main
```

**Step 2: SSH deploy**

```bash
ssh root@161.97.114.189
cd /www/wwwroot/cloudtravelsolution.com
git pull origin main
rm -rf .next
npm run build
pm2 restart cloudtravelsolution
```

**Step 3: Create production database tables**

Run these SQL commands on the production database:

```sql
-- Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id integer PRIMARY KEY AUTOINCREMENT,
  email text NOT NULL UNIQUE,
  name text,
  source text DEFAULT 'manual',
  status text DEFAULT 'active',
  subscribed_at text,
  unsubscribed_at text,
  unsubscribe_token text,
  updated_at text NOT NULL DEFAULT (datetime('now')),
  created_at text NOT NULL DEFAULT (datetime('now'))
);

-- Subscribers segments array
CREATE TABLE IF NOT EXISTS subscribers_segments (
  id integer PRIMARY KEY AUTOINCREMENT,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
  tag text NOT NULL
);

-- Email Campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL,
  subject text NOT NULL,
  template text DEFAULT 'custom',
  content text,
  audience text DEFAULT 'all-active',
  status text DEFAULT 'draft',
  scheduled_at text,
  sent_at text,
  template_data_headline text,
  template_data_body_text text,
  template_data_offer_percentage text,
  template_data_cta_text text,
  template_data_cta_url text,
  template_data_alert_type text,
  template_data_country_name text,
  template_data_featured_image_id integer,
  stats_total_sent integer DEFAULT 0,
  stats_delivered integer DEFAULT 0,
  stats_opened integer DEFAULT 0,
  stats_clicked integer DEFAULT 0,
  stats_bounced integer DEFAULT 0,
  stats_unsubscribed integer DEFAULT 0,
  updated_at text NOT NULL DEFAULT (datetime('now')),
  created_at text NOT NULL DEFAULT (datetime('now'))
);

-- Email Campaigns segment filter array
CREATE TABLE IF NOT EXISTS email_campaigns_segment_filter (
  id integer PRIMARY KEY AUTOINCREMENT,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
  tag text NOT NULL
);

-- Add relationship columns to payload_locked_documents_rels
ALTER TABLE payload_locked_documents_rels ADD COLUMN subscribers_id integer REFERENCES subscribers(id);
ALTER TABLE payload_locked_documents_rels ADD COLUMN email_campaigns_id integer REFERENCES email_campaigns(id);
```

**Step 4: Set up cron job**

Add a cron job on the server to call the cron endpoint every 5 minutes:

```bash
# Add CRON_SECRET to .env on server
echo 'CRON_SECRET=your-secure-random-secret-here' >> /www/wwwroot/cloudtravelsolution.com/.env

# Add crontab entry
(crontab -l 2>/dev/null; echo "*/5 * * * * curl -s https://cloudtravelsolution.com/api/email/cron?secret=your-secure-random-secret-here > /dev/null 2>&1") | crontab -

# Restart PM2 with updated env
pm2 restart cloudtravelsolution --update-env
```

**Step 5: Verify**

- Visit `/admin/collections/subscribers` — should see empty collection
- Visit `/admin/collections/email-campaigns` — should see empty collection
- Submit newsletter form on frontend — should create subscriber
- Create a test campaign in admin and send test email

**Step 6: Commit any hotfixes, then done**

---

## Summary

| Task | What it builds | Files |
|------|---------------|-------|
| 1 | Subscribers collection | `Subscribers.ts`, `payload.config.ts` |
| 2 | EmailCampaigns collection | `EmailCampaigns.ts`, `payload.config.ts` |
| 3 | Email templates (4 + custom) | `email-templates.ts`, `email.ts` |
| 4 | Campaign send engine | `email-campaigns.ts` |
| 5 | API routes (send, cron, webhook, unsubscribe) | 4 route files |
| 6 | Unsubscribe confirmation page | `unsubscribe/page.tsx` |
| 7 | Subscriber auto-sync hooks | `subscriberSync.ts`, 4 collection files |
| 8 | Newsletter API update | `newsletter/route.ts` |
| 9 | Production deploy + DB setup | SQL, cron, env |
