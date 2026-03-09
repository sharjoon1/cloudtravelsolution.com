import type { CollectionConfig } from "payload";
import crypto from "crypto";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  admin: {
    useAsTitle: "email",
    group: "Email Marketing",
    defaultColumns: ["email", "name", "source", "status", "subscribedAt"],
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
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "manual",
      options: [
        { label: "Newsletter Form", value: "newsletter-form" },
        { label: "Lead Form", value: "lead-form" },
        { label: "Inquiry Form", value: "inquiry-form" },
        { label: "B2B Form", value: "b2b-form" },
        { label: "Manual", value: "manual" },
        { label: "Import", value: "import" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      admin: { position: "sidebar" },
      options: [
        { label: "Active", value: "active" },
        { label: "Unsubscribed", value: "unsubscribed" },
        { label: "Bounced", value: "bounced" },
      ],
    },
    {
      name: "segments",
      type: "array",
      admin: {
        description: "Tags for targeting (e.g. us-visa, bangalore, student)",
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
      name: "subscribedAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "unsubscribedAt",
      type: "date",
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "unsubscribeToken",
      type: "text",
      admin: { hidden: true },
    },
  ],
};
