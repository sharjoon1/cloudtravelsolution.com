import type {
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
} from "payload";

/**
 * beforeChange hook for ServiceRequests:
 * - Auto-calc totalFee from serviceFee + embassyFee
 * - Auto-set partner from authenticated partner user
 * - Initialize statusHistory on create
 * - Append to statusHistory on status change
 */
export const serviceRequestBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  // Auto-calculate totalFee
  const embassy = Number(data.embassyFee) || 0;
  const service = Number(data.serviceFee) || 0;
  data.totalFee = embassy + service;

  // Auto-set partner from authenticated partner user
  if (operation === "create" && req.user?.collection === "partners") {
    data.partner = req.user.id;
  }

  const now = new Date().toISOString();
  const updatedBy =
    req.user?.collection === "partners"
      ? (req.user as { companyName?: string }).companyName || "Partner"
      : (req.user as { email?: string })?.email || "System";

  if (operation === "create") {
    // Initialize statusHistory with "received"
    data.statusHistory = [
      {
        status: data.status || "received",
        timestamp: now,
        note: "Application received",
        updatedBy,
      },
    ];
  } else if (
    operation === "update" &&
    originalDoc &&
    data.status &&
    data.status !== originalDoc.status
  ) {
    // Append new status entry
    const history = Array.isArray(originalDoc.statusHistory)
      ? [...originalDoc.statusHistory]
      : [];
    history.push({
      status: data.status,
      timestamp: now,
      note:
        data.status === "rejected"
          ? data.rejectionReason || "Application rejected"
          : data.status === "on-hold"
            ? data.holdReason || "Application put on hold"
            : `Status changed to ${data.status.replace(/-/g, " ")}`,
      updatedBy,
    });
    data.statusHistory = history;
  }

  return data;
};

/**
 * afterChange hook for ServiceRequests:
 * - Send email on create (tracking code notification)
 * - Send email on status change
 * - WhatsApp/SMS stubs
 */
export const serviceRequestAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  // Lazy import to avoid circular dependencies
  const {
    sendServiceRequestCreatedEmail,
    sendStatusUpdateEmail,
  } = await import("../lib/tracking-emails");

  if (operation === "create") {
    // Get partner email for notification
    let partnerEmail: string | undefined;
    if (doc.partner && typeof doc.partner === "object" && doc.partner.email) {
      partnerEmail = doc.partner.email;
    } else if (doc.partner) {
      try {
        const partner = await req.payload.findByID({
          collection: "partners",
          id: typeof doc.partner === "object" ? doc.partner.id : doc.partner,
          depth: 0,
        });
        partnerEmail = partner?.email;
      } catch {
        // ignore
      }
    }

    if (partnerEmail) {
      await sendServiceRequestCreatedEmail({
        partnerEmail,
        trackingCode: doc.trackingCode,
        applicantName: doc.applicantName,
        serviceType: doc.serviceType,
        destinationCountry: doc.destinationCountry,
      });
    }

    // Update partner totalRequests
    if (doc.partner) {
      const partnerId =
        typeof doc.partner === "object" ? doc.partner.id : doc.partner;
      try {
        const partner = await req.payload.findByID({
          collection: "partners",
          id: partnerId,
          depth: 0,
        });
        await req.payload.update({
          collection: "partners",
          id: partnerId,
          data: { totalRequests: (partner.totalRequests || 0) + 1 },
        });
      } catch {
        // ignore
      }
    }

    // WhatsApp stub
    console.log(
      `[WhatsApp Stub] New service request ${doc.trackingCode} created for ${doc.applicantName}`
    );
  }

  if (
    operation === "update" &&
    previousDoc &&
    doc.status !== previousDoc.status
  ) {
    let partnerEmail: string | undefined;
    if (doc.partner && typeof doc.partner === "object" && doc.partner.email) {
      partnerEmail = doc.partner.email;
    } else if (doc.partner) {
      try {
        const partner = await req.payload.findByID({
          collection: "partners",
          id: typeof doc.partner === "object" ? doc.partner.id : doc.partner,
          depth: 0,
        });
        partnerEmail = partner?.email;
      } catch {
        // ignore
      }
    }

    if (partnerEmail) {
      await sendStatusUpdateEmail({
        partnerEmail,
        trackingCode: doc.trackingCode,
        applicantName: doc.applicantName,
        oldStatus: previousDoc.status,
        newStatus: doc.status,
      });
    }

    // SMS stub
    console.log(
      `[SMS Stub] Status update for ${doc.trackingCode}: ${previousDoc.status} → ${doc.status}`
    );
  }
};
