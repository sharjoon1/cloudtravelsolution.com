import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "fullName",
    group: "Business",
    defaultColumns: ["fullName", "destination", "phone", "status", "source", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "destination",
      type: "text",
      required: true,
    },
    {
      name: "travelMonth",
      type: "text",
    },
    {
      name: "duration",
      type: "text",
    },
    {
      name: "travelers",
      type: "text",
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Qualified", value: "qualified" },
        { label: "Converted", value: "converted" },
        { label: "Lost", value: "lost" },
      ],
    },
    {
      name: "source",
      type: "select",
      defaultValue: "hero-form",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Hero Form", value: "hero-form" },
        { label: "Landing Page", value: "landing-page" },
        { label: "Visa Page", value: "visa-page" },
        { label: "Exit Intent", value: "exit-intent" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Manual", value: "manual" },
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
      name: "convertedToInquiry",
      type: "relationship",
      relationTo: "inquiries",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
