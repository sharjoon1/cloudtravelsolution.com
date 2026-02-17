import { Resend } from "resend";
import type { HeroLeadFormData, VisaInquiryFormData, CallbackFormData, ContactFormData } from "./validations";
import { POPULAR_COUNTRIES } from "./constants";

const countryNameMap = Object.fromEntries(
  POPULAR_COUNTRIES.map((c) => [c.slug, c.name])
);

function countryName(slug: string): string {
  return countryNameMap[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Lazy-init Resend client
let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_placeholder")) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const fromEmail = () => process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const teamEmail = () => process.env.TEAM_NOTIFICATION_EMAIL || "info@cloudtravelsolution.com";

type EmailResult = { success: boolean; error?: string };

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<EmailResult> {
  const resend = getResend();
  if (!resend) {
    console.log(`[Email - Dev Mode] To: ${opts.to} | Subject: ${opts.subject}`);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: `Cloud Travel Solution <${fromEmail()}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error(`[Email Error] ${message}`);
    return { success: false, error: message };
  }
}

// ── HTML Template Helpers ──────────────────────────────────────────────

function emailLayout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
  <tr><td style="background:#1B4D7A;padding:24px 32px;">
    <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Cloud Travel Solution</h1>
  </td></tr>
  <tr><td style="padding:32px;">
    <h2 style="margin:0 0 16px;color:#1B4D7A;font-size:18px;">${title}</h2>
    ${body}
  </td></tr>
  <tr><td style="background:#f8f9fa;padding:20px 32px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;color:#6b7280;font-size:13px;">Cloud Travel Solution | Visa & Travel Services</p>
    <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Bangalore | Hyderabad | Delhi | Chennai</p>
    <p style="margin:4px 0 0;color:#6b7280;font-size:12px;">cloudtravelsolution.com</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function dataRow(label: string, value: string | number | undefined | null): string {
  if (value === undefined || value === null || value === "") return "";
  return `<tr>
    <td style="padding:8px 12px;color:#6b7280;font-size:14px;border-bottom:1px solid #f3f4f6;white-space:nowrap;">${label}</td>
    <td style="padding:8px 12px;color:#111827;font-size:14px;border-bottom:1px solid #f3f4f6;">${value}</td>
  </tr>`;
}

function dataTable(rows: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">${rows}</table>`;
}

// ── Lead Emails ────────────────────────────────────────────────────────

export async function sendLeadNotification(data: HeroLeadFormData): Promise<EmailResult> {
  const dest = countryName(data.destination);
  const html = emailLayout(
    "New Travel Lead",
    `<p style="color:#374151;font-size:15px;margin:0 0 16px;">A new lead just submitted the hero form.</p>` +
    dataTable(
      dataRow("Name", data.fullName) +
      dataRow("Phone", data.phone) +
      dataRow("Email", data.email) +
      dataRow("Destination", dest) +
      dataRow("Travel Month", data.travelMonth) +
      dataRow("Duration", data.duration) +
      dataRow("Travelers", data.travelers)
    ) +
    `<p style="margin:16px 0 0;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/collections/leads" style="display:inline-block;padding:10px 20px;background:#E8963E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">View in Admin</a></p>`
  );

  return sendEmail({
    to: teamEmail(),
    subject: `New Lead: ${data.fullName} — ${dest}`,
    html,
  });
}

export async function sendLeadConfirmation(data: HeroLeadFormData): Promise<EmailResult> {
  const dest = countryName(data.destination);
  const html = emailLayout(
    `Thanks, ${data.fullName}!`,
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
      We received your travel inquiry for <strong>${dest}</strong>. Our team will contact you within <strong style="color:#E8963E;">2 hours</strong> to discuss your trip.
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">Here's a summary of your request:</p>` +
    dataTable(
      dataRow("Destination", dest) +
      dataRow("Travel Month", data.travelMonth) +
      dataRow("Duration", data.duration) +
      dataRow("Travelers", data.travelers)
    ) +
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:16px 0 0;">
      In the meantime, feel free to reach us at <a href="tel:+919876543210" style="color:#1B4D7A;">+91 98765 43210</a> or reply to this email.
    </p>`
  );

  return sendEmail({
    to: data.email,
    subject: `Your ${dest} travel inquiry — Cloud Travel Solution`,
    html,
  });
}

// ── Inquiry Emails ─────────────────────────────────────────────────────

export async function sendInquiryNotification(data: VisaInquiryFormData): Promise<EmailResult> {
  const html = emailLayout(
    "New Visa Inquiry",
    `<p style="color:#374151;font-size:15px;margin:0 0 16px;">A new visa inquiry was submitted.</p>` +
    dataTable(
      dataRow("Name", data.fullName) +
      dataRow("Email", data.email) +
      dataRow("Phone", data.phone) +
      dataRow("City", data.city) +
      dataRow("Destination", data.destinationCountry) +
      dataRow("Visa Type", data.visaType) +
      dataRow("Travelers", data.numberOfTravelers) +
      dataRow("Travel Date", data.preferredTravelDate) +
      dataRow("Applied Before", data.appliedBefore ? "Yes" : "No") +
      dataRow("Purpose", data.purposeOfVisit) +
      dataRow("Contact Method", data.preferredContactMethod) +
      dataRow("Callback Time", data.preferredCallbackTime)
    ) +
    `<p style="margin:16px 0 0;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/collections/inquiries" style="display:inline-block;padding:10px 20px;background:#E8963E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">View in Admin</a></p>`
  );

  return sendEmail({
    to: teamEmail(),
    subject: `Visa Inquiry: ${data.fullName} — ${data.destinationCountry} (${data.visaType})`,
    html,
  });
}

export async function sendInquiryConfirmation(data: VisaInquiryFormData): Promise<EmailResult> {
  const html = emailLayout(
    `Thanks for your inquiry, ${data.fullName}!`,
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
      We received your visa inquiry for <strong>${data.destinationCountry}</strong> (${data.visaType} visa). Our visa specialists will review your application and get back to you shortly.
    </p>` +
    dataTable(
      dataRow("Destination", data.destinationCountry) +
      dataRow("Visa Type", data.visaType) +
      dataRow("Travelers", data.numberOfTravelers) +
      dataRow("Travel Date", data.preferredTravelDate)
    ) +
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:16px 0 0;">
      We'll reach out via your preferred method: <strong>${data.preferredContactMethod}</strong>. For urgent queries, call us at <a href="tel:+919876543210" style="color:#1B4D7A;">+91 98765 43210</a>.
    </p>`
  );

  return sendEmail({
    to: data.email,
    subject: `Your ${data.destinationCountry} visa inquiry — Cloud Travel Solution`,
    html,
  });
}

// ── Callback Emails ────────────────────────────────────────────────────

export async function sendCallbackNotification(data: CallbackFormData): Promise<EmailResult> {
  const html = emailLayout(
    "Callback Request",
    `<p style="color:#374151;font-size:15px;margin:0 0 16px;">A customer has requested a callback.</p>` +
    dataTable(
      dataRow("Name", data.name) +
      dataRow("Phone", data.phone) +
      dataRow("Preferred Time", data.preferredTime) +
      dataRow("Service", data.service)
    ) +
    `<p style="color:#E8963E;font-size:14px;font-weight:600;margin:16px 0 0;">Please call them as soon as possible.</p>`
  );

  return sendEmail({
    to: teamEmail(),
    subject: `Callback Request: ${data.name} — ${data.phone}`,
    html,
  });
}

// ── Contact Emails ─────────────────────────────────────────────────────

export async function sendContactNotification(data: ContactFormData): Promise<EmailResult> {
  const html = emailLayout(
    "New Contact Message",
    `<p style="color:#374151;font-size:15px;margin:0 0 16px;">A new contact form message was received.</p>` +
    dataTable(
      dataRow("Name", data.name) +
      dataRow("Email", data.email) +
      dataRow("Phone", data.phone) +
      dataRow("City", data.city) +
      dataRow("Subject", data.subject)
    ) +
    `<div style="margin:16px 0;padding:16px;background:#f9fafb;border-left:4px solid #1B4D7A;border-radius:4px;">
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>`
  );

  return sendEmail({
    to: teamEmail(),
    subject: `Contact: ${data.subject} — ${data.name}`,
    html,
  });
}

export async function sendContactConfirmation(data: ContactFormData): Promise<EmailResult> {
  const html = emailLayout(
    `Thanks for reaching out, ${data.name}!`,
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
      We received your message and will respond within <strong style="color:#E8963E;">24 hours</strong>.
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">Here's what you sent us:</p>
    <div style="margin:16px 0;padding:16px;background:#f9fafb;border-left:4px solid #1B4D7A;border-radius:4px;">
      <p style="margin:0 0 4px;color:#6b7280;font-size:13px;font-weight:600;">${data.subject}</p>
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
    <p style="color:#374151;font-size:15px;line-height:1.6;margin:0;">
      For urgent matters, call us at <a href="tel:+919876543210" style="color:#1B4D7A;">+91 98765 43210</a>.
    </p>`
  );

  return sendEmail({
    to: data.email,
    subject: `We received your message — Cloud Travel Solution`,
    html,
  });
}

// ── Newsletter Emails ──────────────────────────────────────────────────

export async function sendNewsletterWelcome(email: string): Promise<EmailResult> {
  const html = emailLayout(
    "Welcome to Cloud Travel Solution!",
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">
      You're now subscribed to travel tips, visa updates, and exclusive deals from Cloud Travel Solution.
    </p>
    <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 16px;">Here's what you can expect:</p>
    <ul style="color:#374151;font-size:15px;line-height:1.8;margin:0 0 16px;padding-left:20px;">
      <li>Latest visa requirements and processing updates</li>
      <li>Exclusive travel deals and early-bird offers</li>
      <li>Travel tips and destination guides</li>
      <li>Important policy changes that affect Indian travelers</li>
    </ul>
    <p style="color:#374151;font-size:15px;line-height:1.6;margin:0;">
      Planning a trip? <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}" style="color:#1B4D7A;font-weight:600;">Visit our website</a> to get started.
    </p>`
  );

  return sendEmail({
    to: email,
    subject: `Welcome to Cloud Travel Solution updates!`,
    html,
  });
}
