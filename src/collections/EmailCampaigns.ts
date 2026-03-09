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
          admin: { description: "E.g. 20% OFF (Promotion template)" },
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
          admin: { description: "Alert severity (Travel Alert template)" },
        },
        {
          name: "countryName",
          type: "text",
          admin: { description: "Country this alert/update is about" },
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
