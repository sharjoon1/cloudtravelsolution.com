import type { CollectionConfig } from "payload";
import { autoNumber } from "../hooks/autoNumber";
import {
  serviceRequestBeforeChange,
  serviceRequestAfterChange,
} from "../hooks/serviceRequestHooks";

export const ServiceRequests: CollectionConfig = {
  slug: "service-requests",
  admin: {
    useAsTitle: "trackingCode",
    group: "B2B Partners",
    defaultColumns: [
      "trackingCode",
      "applicantName",
      "partner",
      "serviceType",
      "status",
      "priority",
      "createdAt",
    ],
  },
  access: {
    read: ({ req }) => {
      if (req.user?.collection === "users") return true;
      if (req.user?.collection === "partners") {
        return { partner: { equals: req.user.id } };
      }
      return false;
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (req.user?.collection === "users") return true;
      if (req.user?.collection === "partners") {
        return { partner: { equals: req.user.id } };
      }
      return false;
    },
    delete: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    beforeChange: [
      autoNumber("TRK", "trackingCode", "service-requests"),
      serviceRequestBeforeChange,
    ],
    afterChange: [serviceRequestAfterChange],
  },
  fields: [
    // ── Tracking ──────────────────────────────────────────────
    {
      name: "trackingCode",
      type: "text",
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: "partner",
      type: "relationship",
      relationTo: "partners",
      required: true,
      admin: { readOnly: true },
    },

    // ── Applicant Info ────────────────────────────────────────
    {
      name: "applicantName",
      type: "text",
      required: true,
    },
    {
      name: "applicantEmail",
      type: "email",
    },
    {
      name: "applicantPhone",
      type: "text",
    },
    {
      name: "passportNumber",
      type: "text",
      index: true,
    },
    {
      name: "passportExpiry",
      type: "date",
    },
    {
      name: "dateOfBirth",
      type: "date",
    },
    {
      name: "nationality",
      type: "text",
      defaultValue: "Indian",
    },

    // ── Service Details ───────────────────────────────────────
    {
      name: "serviceType",
      type: "select",
      required: true,
      options: [
        { label: "Visa Appointment", value: "visa-appointment" },
        { label: "Visa Assistance", value: "visa-assistance" },
        { label: "Educational Visa Assistance", value: "educational-visa-assistance" },
        { label: "Manpower Visa Assistance", value: "manpower-visa-assistance" },
        { label: "Document Attestation", value: "document-attestation" },
      ],
    },
    {
      name: "destinationCountry",
      type: "text",
      required: true,
    },
    {
      name: "visaType",
      type: "select",
      options: [
        { label: "Tourist", value: "tourist" },
        { label: "Business", value: "business" },
        { label: "Student", value: "student" },
        { label: "Work Permit", value: "work-permit" },
        { label: "Transit", value: "transit" },
        { label: "Medical", value: "medical" },
        { label: "Conference", value: "conference" },
      ],
    },
    {
      name: "travelDate",
      type: "date",
    },
    {
      name: "numberOfApplicants",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "purposeOfVisit",
      type: "textarea",
    },
    {
      name: "specialInstructions",
      type: "textarea",
    },

    // ── Status ────────────────────────────────────────────────
    {
      name: "status",
      type: "select",
      defaultValue: "received",
      admin: { position: "sidebar" },
      options: [
        { label: "Received", value: "received" },
        { label: "Documents Verified", value: "documents-verified" },
        { label: "Submitted to Embassy", value: "submitted-to-embassy" },
        { label: "Under Processing", value: "under-processing" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "Delivered", value: "delivered" },
        { label: "On Hold", value: "on-hold" },
      ],
    },
    {
      name: "statusHistory",
      type: "array",
      admin: { readOnly: true },
      fields: [
        { name: "status", type: "text", required: true },
        { name: "timestamp", type: "date", required: true },
        { name: "note", type: "text" },
        { name: "updatedBy", type: "text" },
      ],
    },
    {
      name: "priority",
      type: "select",
      defaultValue: "normal",
      admin: { position: "sidebar" },
      options: [
        { label: "Normal", value: "normal" },
        { label: "Urgent", value: "urgent" },
        { label: "Tatkal", value: "tatkal" },
      ],
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },

    // ── Documents ─────────────────────────────────────────────
    {
      name: "uploadedDocuments",
      type: "relationship",
      relationTo: "documents",
      hasMany: true,
    },

    // ── Dates ─────────────────────────────────────────────────
    {
      name: "embassySubmissionDate",
      type: "date",
    },
    {
      name: "expectedCompletionDate",
      type: "date",
    },
    {
      name: "completionDate",
      type: "date",
    },

    // ── Embassy ───────────────────────────────────────────────
    {
      name: "embassyReferenceNumber",
      type: "text",
    },

    // ── Fees ──────────────────────────────────────────────────
    {
      name: "serviceFee",
      type: "number",
    },
    {
      name: "embassyFee",
      type: "number",
    },
    {
      name: "totalFee",
      type: "number",
      admin: { readOnly: true },
    },

    // ── Outcome ───────────────────────────────────────────────
    {
      name: "rejectionReason",
      type: "textarea",
      admin: {
        condition: (_, siblingData) => siblingData?.status === "rejected",
      },
    },
    {
      name: "holdReason",
      type: "textarea",
      admin: {
        condition: (_, siblingData) => siblingData?.status === "on-hold",
      },
    },

    // ── Internal ──────────────────────────────────────────────
    {
      name: "internalNotes",
      type: "textarea",
      access: {
        read: ({ req }) => req.user?.collection === "users",
        update: ({ req }) => req.user?.collection === "users",
      },
    },
    {
      name: "linkedVisaApplication",
      type: "relationship",
      relationTo: "visa-applications",
      admin: { position: "sidebar" },
    },
  ],
};
