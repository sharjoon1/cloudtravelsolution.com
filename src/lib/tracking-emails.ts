import { sendEmail, emailLayout, dataRow, dataTable } from "./email";

const STATUS_LABELS: Record<string, string> = {
  received: "Received",
  "documents-verified": "Documents Verified",
  "submitted-to-embassy": "Submitted to Embassy",
  "under-processing": "Under Processing",
  approved: "Approved",
  rejected: "Rejected",
  delivered: "Delivered",
  "on-hold": "On Hold",
};

function statusLabel(status: string): string {
  return STATUS_LABELS[status] || status.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function sendServiceRequestCreatedEmail(params: {
  partnerEmail: string;
  trackingCode: string;
  applicantName: string;
  serviceType: string;
  destinationCountry: string;
}) {
  const { partnerEmail, trackingCode, applicantName, serviceType, destinationCountry } = params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const html = emailLayout(
    "New Service Request Created",
    `<p style="color:#374151;font-size:15px;margin:0 0 16px;">
      A new service request has been successfully submitted.
    </p>` +
    dataTable(
      dataRow("Tracking Code", `<strong style="color:#1B4D7A;font-size:16px;">${trackingCode}</strong>`) +
      dataRow("Applicant", applicantName) +
      dataRow("Service", serviceType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())) +
      dataRow("Destination", destinationCountry)
    ) +
    `<p style="color:#374151;font-size:15px;line-height:1.6;margin:16px 0 0;">
      You can track the status of this application using the tracking code above at:
      <a href="${siteUrl}/track" style="color:#1B4D7A;font-weight:600;">${siteUrl}/track</a>
    </p>
    <p style="margin:16px 0 0;">
      <a href="${siteUrl}/partner/dashboard" style="display:inline-block;padding:10px 20px;background:#E8963E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">View in Partner Portal</a>
    </p>`
  );

  return sendEmail({
    to: partnerEmail,
    subject: `Service Request Created: ${trackingCode} — ${applicantName}`,
    html,
  });
}

export async function sendStatusUpdateEmail(params: {
  partnerEmail: string;
  trackingCode: string;
  applicantName: string;
  oldStatus: string;
  newStatus: string;
}) {
  const { partnerEmail, trackingCode, applicantName, oldStatus, newStatus } = params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const statusColor =
    newStatus === "approved" || newStatus === "delivered"
      ? "#2A9D6E"
      : newStatus === "rejected"
        ? "#DC2626"
        : newStatus === "on-hold"
          ? "#F59E0B"
          : "#1B4D7A";

  const html = emailLayout(
    "Application Status Update",
    `<p style="color:#374151;font-size:15px;margin:0 0 16px;">
      The status of a service request has been updated.
    </p>` +
    dataTable(
      dataRow("Tracking Code", `<strong>${trackingCode}</strong>`) +
      dataRow("Applicant", applicantName) +
      dataRow("Previous Status", statusLabel(oldStatus)) +
      dataRow("New Status", `<strong style="color:${statusColor};">${statusLabel(newStatus)}</strong>`)
    ) +
    `<p style="margin:16px 0 0;">
      <a href="${siteUrl}/partner/dashboard" style="display:inline-block;padding:10px 20px;background:#E8963E;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">View Details</a>
    </p>`
  );

  return sendEmail({
    to: partnerEmail,
    subject: `Status Update: ${trackingCode} — ${statusLabel(newStatus)}`,
    html,
  });
}
