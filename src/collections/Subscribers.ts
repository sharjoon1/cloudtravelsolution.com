import type { CollectionConfig } from "payload";
import crypto from "crypto";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
    group: "Email Marketing",
    defaultColumns: ["email", "name", "source", "status", "segments", "subscribedAt"],
    listSearchableFields: ["email", "name"],
    description: "Manage email subscribers — auto-synced from leads, inquiries & forms",
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
    // ─── MAIN FIELDS ───
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          unique: true,
          admin: {
            width: "50%",
            placeholder: "subscriber@example.com",
          },
        },
        {
          name: "name",
          type: "text",
          admin: {
            width: "50%",
            placeholder: "Subscriber name (optional)",
          },
        },
      ],
    },
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "manual",
      label: "Subscription Source",
      options: [
        { label: "📋 Newsletter Form", value: "newsletter-form" },
        { label: "📞 Lead Form", value: "lead-form" },
        { label: "📝 Inquiry Form", value: "inquiry-form" },
        { label: "🏢 B2B Form", value: "b2b-form" },
        { label: "✋ Manual Entry", value: "manual" },
        { label: "📥 CSV Import", value: "import" },
      ],
      admin: {
        description: "How this subscriber was added to the list",
      },
    },
    {
      name: "segments",
      type: "array",
      label: "Segment Tags",
      labels: { singular: "Tag", plural: "Tags" },
      admin: {
        description: "Tags for campaign targeting — e.g. us-visa, bangalore, student, vip. Subscribers can be targeted by these tags when sending campaigns.",
        initCollapsed: false,
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
          admin: { placeholder: "e.g. us-visa, student, bangalore, vip" },
        },
      ],
    },

    // ─── SIDEBAR FIELDS ───
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      label: "Subscriber Status",
      admin: { position: "sidebar" },
      options: [
        { label: "✅ Active", value: "active" },
        { label: "🚫 Unsubscribed", value: "unsubscribed" },
        { label: "↩️ Bounced", value: "bounced" },
      ],
    },
    {
      name: "subscribedAt",
      type: "date",
      label: "Subscribed Date",
      admin: {
        readOnly: true,
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "unsubscribedAt",
      type: "date",
      label: "Unsubscribed Date",
      admin: {
        readOnly: true,
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        condition: (data) => data?.status === "unsubscribed",
      },
    },
    {
      name: "unsubscribeToken",
      type: "text",
      admin: { hidden: true },
    },
  ],
};
