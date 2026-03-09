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
