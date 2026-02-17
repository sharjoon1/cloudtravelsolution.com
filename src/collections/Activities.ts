import type { CollectionConfig } from "payload";

export const Activities: CollectionConfig = {
  slug: "activities",
  admin: {
    useAsTitle: "subject",
    group: "CRM",
    defaultColumns: ["type", "subject", "customer", "status", "dueDate", "assignedTo", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Call", value: "call" },
        { label: "Email", value: "email" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Meeting", value: "meeting" },
        { label: "Follow-up", value: "follow-up" },
        { label: "Document Received", value: "document-received" },
        { label: "Status Update", value: "status-update" },
        { label: "Note", value: "note" },
      ],
    },
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      required: true,
    },
    {
      name: "visaApplication",
      type: "relationship",
      relationTo: "visa-applications",
    },
    {
      name: "inquiry",
      type: "relationship",
      relationTo: "inquiries",
    },
    {
      name: "dueDate",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
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
      name: "completedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
