import type { CollectionConfig } from "payload";
import { autoNumber } from "../hooks/autoNumber";

export const VisaApplications: CollectionConfig = {
  slug: "visa-applications",
  admin: {
    useAsTitle: "applicationNumber",
    group: "CRM",
    defaultColumns: [
      "applicationNumber",
      "customer",
      "destinationCountry",
      "visaType",
      "status",
      "priority",
      "createdAt",
    ],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    beforeChange: [
      autoNumber("CTS", "applicationNumber", "visa-applications"),
      async ({ data }) => {
        // Auto-calculate totalFee
        const embassy = Number(data.embassyFee) || 0;
        const service = Number(data.serviceFee) || 0;
        data.totalFee = embassy + service;
        return data;
      },
    ],
  },
  fields: [
    {
      name: "applicationNumber",
      type: "text",
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      required: true,
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
      name: "numberOfTravelers",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "travelDate",
      type: "date",
    },
    {
      name: "returnDate",
      type: "date",
    },
    {
      name: "purposeOfVisit",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "documents-pending",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Documents Pending", value: "documents-pending" },
        { label: "Documents Received", value: "documents-received" },
        { label: "Under Review", value: "under-review" },
        { label: "Submitted to Embassy", value: "submitted-to-embassy" },
        { label: "Interview Scheduled", value: "interview-scheduled" },
        { label: "Processing", value: "processing" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
        { label: "On Hold", value: "on-hold" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "priority",
      type: "select",
      defaultValue: "normal",
      admin: {
        position: "sidebar",
      },
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
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "documents",
      type: "array",
      fields: [
        {
          name: "documentName",
          type: "text",
          required: true,
        },
        {
          name: "status",
          type: "select",
          defaultValue: "pending",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Received", value: "received" },
            { label: "Verified", value: "verified" },
            { label: "Rejected", value: "rejected" },
          ],
        },
        {
          name: "notes",
          type: "text",
        },
        {
          name: "receivedDate",
          type: "date",
        },
      ],
    },
    {
      name: "embassySubmissionDate",
      type: "date",
    },
    {
      name: "embassyReferenceNumber",
      type: "text",
    },
    {
      name: "interviewDate",
      type: "date",
    },
    {
      name: "expectedDecisionDate",
      type: "date",
    },
    {
      name: "decisionDate",
      type: "date",
    },
    {
      name: "visaNumber",
      type: "text",
    },
    {
      name: "visaValidFrom",
      type: "date",
    },
    {
      name: "visaValidUntil",
      type: "date",
    },
    {
      name: "rejectionReason",
      type: "textarea",
      admin: {
        condition: (_, siblingData) => siblingData?.status === "rejected",
      },
    },
    {
      name: "embassyFee",
      type: "number",
    },
    {
      name: "serviceFee",
      type: "number",
    },
    {
      name: "totalFee",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "sourceInquiry",
      type: "relationship",
      relationTo: "inquiries",
    },
    {
      name: "sourceLead",
      type: "relationship",
      relationTo: "leads",
    },
    {
      name: "internalNotes",
      type: "textarea",
    },
  ],
};
