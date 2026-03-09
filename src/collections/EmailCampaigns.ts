import type { CollectionConfig } from "payload";

export const EmailCampaigns: CollectionConfig = {
  slug: "email-campaigns",
  admin: {
    useAsTitle: "name",
    group: "Email Marketing",
    defaultColumns: ["name", "template", "status", "stats.totalSent", "sentAt"],
    listSearchableFields: ["name", "subject"],
    description: "Create and manage email campaigns with pre-built or custom templates",
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // ─── TABS LAYOUT ───
    {
      type: "tabs",
      tabs: [
        // ═══ TAB 1: CAMPAIGN SETUP ═══
        {
          label: "Campaign Setup",
          description: "Basic campaign information and email subject",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  admin: {
                    width: "50%",
                    placeholder: "e.g. March Newsletter, Visa Sale Q1",
                    description: "Internal name — not visible to recipients",
                  },
                },
                {
                  name: "template",
                  type: "select",
                  required: true,
                  defaultValue: "newsletter",
                  admin: { width: "50%" },
                  options: [
                    { label: "📰 Newsletter", value: "newsletter" },
                    { label: "🎉 Promotion / Offer", value: "promotion" },
                    { label: "🚨 Travel Alert", value: "travel-alert" },
                    { label: "📋 Visa Update", value: "visa-update" },
                    { label: "✏️ Custom (Rich Text)", value: "custom" },
                  ],
                },
              ],
            },
            {
              name: "subject",
              type: "text",
              required: true,
              admin: {
                placeholder: "e.g. New US Visa Slots Available — Book Now!",
                description: "Subject line your subscribers will see in their inbox",
              },
            },
          ],
        },

        // ═══ TAB 2: EMAIL CONTENT ═══
        {
          label: "Email Content",
          description: "Design your email using the selected template",
          fields: [
            // --- Custom template: Rich text editor ---
            {
              name: "content",
              type: "richText",
              label: "Email Body (Rich Text)",
              admin: {
                description: "Write your email content using the rich text editor. This will be wrapped in the branded email layout.",
                condition: (data) => data?.template === "custom",
              },
            },

            // --- Pre-built templates: Structured fields ---
            {
              name: "templateData",
              type: "group",
              label: " ",
              admin: {
                condition: (data) => !!data?.template && data?.template !== "custom",
              },
              fields: [
                // Headline — all pre-built templates
                {
                  name: "headline",
                  type: "text",
                  label: "Email Headline",
                  required: true,
                  admin: {
                    placeholder: "e.g. Your Weekly Travel Update",
                    description: "Main heading displayed at the top of the email",
                  },
                },

                // Body text — all pre-built templates
                {
                  name: "bodyText",
                  type: "textarea",
                  label: "Body Content",
                  admin: {
                    placeholder: "Write the main message of your email...",
                    description: "The main paragraph content of the email",
                  },
                },

                // Promotion-specific fields
                {
                  name: "offerPercentage",
                  type: "text",
                  label: "Offer / Discount Text",
                  admin: {
                    placeholder: "e.g. 20% OFF, FLAT ₹2000 OFF",
                    description: "Displayed as a prominent offer badge in the email",
                    condition: (data) => data?.template === "promotion",
                  },
                },

                // Travel Alert specific
                {
                  name: "alertType",
                  type: "select",
                  label: "Alert Severity",
                  defaultValue: "info",
                  options: [
                    { label: "ℹ️ Info — General update", value: "info" },
                    { label: "⚠️ Warning — Important change", value: "warning" },
                    { label: "🔴 Urgent — Immediate action needed", value: "urgent" },
                  ],
                  admin: {
                    description: "Controls the color and urgency of the alert banner",
                    condition: (data) => data?.template === "travel-alert",
                  },
                },

                // Country name — Travel Alert + Visa Update
                {
                  name: "countryName",
                  type: "text",
                  label: "Country Name",
                  admin: {
                    placeholder: "e.g. United States, Canada, UK",
                    description: "The country this alert or update is about",
                    condition: (data) =>
                      data?.template === "travel-alert" || data?.template === "visa-update",
                  },
                },

                // CTA Button — all pre-built templates
                {
                  type: "row",
                  fields: [
                    {
                      name: "ctaText",
                      type: "text",
                      label: "Button Text",
                      admin: {
                        width: "40%",
                        placeholder: "e.g. Learn More, Apply Now, Book Appointment",
                      },
                    },
                    {
                      name: "ctaUrl",
                      type: "text",
                      label: "Button Link (URL)",
                      admin: {
                        width: "60%",
                        placeholder: "https://cloudtravelsolution.com/...",
                      },
                    },
                  ],
                },

                // Featured image — optional
                {
                  name: "featuredImage",
                  type: "upload",
                  relationTo: "media",
                  label: "Featured Image (Optional)",
                  admin: {
                    description: "An optional banner image displayed in the email",
                  },
                },
              ],
            },
          ],
        },

        // ═══ TAB 3: AUDIENCE ═══
        {
          label: "Audience",
          description: "Choose who receives this campaign",
          fields: [
            {
              name: "audience",
              type: "select",
              required: true,
              defaultValue: "all-active",
              label: "Target Audience",
              options: [
                { label: "📬 All Active Subscribers", value: "all-active" },
                { label: "🎯 Filter by Segment Tags", value: "segment-filter" },
              ],
              admin: {
                description: "Choose whether to send to all subscribers or a targeted segment",
              },
            },
            {
              name: "segmentFilter",
              type: "array",
              label: "Segment Tags",
              labels: { singular: "Tag", plural: "Tags" },
              admin: {
                description: "Only subscribers with at least one of these tags will receive the email. Common tags: us-visa, uk-visa, student, bangalore, hyderabad, lead, inquiry, customer, b2b, vip",
                condition: (data) => data?.audience === "segment-filter",
              },
              fields: [
                {
                  name: "tag",
                  type: "text",
                  required: true,
                  admin: { placeholder: "e.g. us-visa, student, bangalore" },
                },
              ],
            },
          ],
        },

        // ═══ TAB 4: ANALYTICS ═══
        {
          label: "Analytics",
          description: "Campaign performance metrics (auto-updated via Resend webhooks)",
          fields: [
            {
              name: "stats",
              type: "group",
              label: " ",
              admin: { readOnly: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "totalSent",
                      type: "number",
                      label: "📤 Total Sent",
                      defaultValue: 0,
                      admin: { width: "33%", readOnly: true },
                    },
                    {
                      name: "delivered",
                      type: "number",
                      label: "✅ Delivered",
                      defaultValue: 0,
                      admin: { width: "33%", readOnly: true },
                    },
                    {
                      name: "opened",
                      type: "number",
                      label: "👁️ Opened",
                      defaultValue: 0,
                      admin: { width: "34%", readOnly: true },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "clicked",
                      type: "number",
                      label: "🔗 Clicked",
                      defaultValue: 0,
                      admin: { width: "33%", readOnly: true },
                    },
                    {
                      name: "bounced",
                      type: "number",
                      label: "↩️ Bounced",
                      defaultValue: 0,
                      admin: { width: "33%", readOnly: true },
                    },
                    {
                      name: "unsubscribed",
                      type: "number",
                      label: "🚫 Unsubscribed",
                      defaultValue: 0,
                      admin: { width: "34%", readOnly: true },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── SIDEBAR FIELDS ───
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      label: "Campaign Status",
      admin: { position: "sidebar" },
      options: [
        { label: "📝 Draft", value: "draft" },
        { label: "🕐 Scheduled", value: "scheduled" },
        { label: "📤 Sending...", value: "sending" },
        { label: "✅ Sent", value: "sent" },
        { label: "❌ Failed", value: "failed" },
      ],
    },
    {
      name: "scheduledAt",
      type: "date",
      label: "Scheduled Date & Time",
      admin: {
        position: "sidebar",
        description: "Campaign will be sent automatically at this time",
        date: { pickerAppearance: "dayAndTime" },
        condition: (data) => data?.status === "scheduled",
      },
    },
    {
      name: "sentAt",
      type: "date",
      label: "Sent At",
      admin: {
        position: "sidebar",
        readOnly: true,
        condition: (data) => !!data?.sentAt,
      },
    },
  ],
};
