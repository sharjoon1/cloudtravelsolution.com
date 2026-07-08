import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Website",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "group",
      name: "businessInfo",
      label: "Business Info",
      fields: [
        {
          name: "siteName",
          type: "text",
          defaultValue: "Cloud Travel Solutions",
        },
        {
          name: "tagline",
          type: "text",
          defaultValue: "Your Trusted Visa & Travel Partner Across India",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue:
            "India's leading visa consulting and travel agency. Expert visa services for all countries from Bangalore, Hyderabad, Delhi, and Chennai. Pan India presence.",
        },
        {
          name: "tollFreeNumber",
          type: "text",
          defaultValue: "+91 8095976543",
        },
        {
          name: "email",
          type: "email",
          defaultValue: "info@cloudtravelsolution.com",
        },
        {
          name: "whatsappNumber",
          type: "text",
        },
      ],
    },
    {
      type: "group",
      name: "branding",
      label: "Branding",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "favicon",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "Upload a square PNG (512×512px min) with transparent background",
          },
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      type: "group",
      name: "socialLinks",
      label: "Social Links",
      fields: [
        {
          name: "facebook",
          type: "text",
        },
        {
          name: "twitter",
          type: "text",
        },
        {
          name: "instagram",
          type: "text",
        },
        {
          name: "linkedin",
          type: "text",
        },
        {
          name: "youtube",
          type: "text",
        },
      ],
    },
    {
      type: "group",
      name: "businessHours",
      label: "Business Hours",
      fields: [
        {
          name: "weekdayHours",
          type: "text",
          defaultValue: "Mon - Fri: 9:00 AM - 6:00 PM",
        },
        {
          name: "saturdayHours",
          type: "text",
          defaultValue: "Sat: 10:00 AM - 4:00 PM",
        },
        {
          name: "sundayHours",
          type: "text",
          defaultValue: "Sun: Closed",
        },
      ],
    },
    {
      type: "group",
      name: "footer",
      label: "Footer",
      fields: [
        {
          name: "footerTagline",
          type: "text",
          defaultValue:
            "India's trusted visa consulting and travel partner. Expert services across Bangalore, Hyderabad, Delhi, and Chennai with Pan India expansion.",
        },
        {
          name: "copyrightText",
          type: "text",
          defaultValue: "Cloud Travel Solutions. All rights reserved.",
        },
      ],
    },
    {
      type: "group",
      name: "legal",
      label: "Legal & Compliance",
      fields: [
        {
          name: "gstin",
          type: "text",
          admin: {
            description:
              "GST Identification Number (e.g. 29ABCDE1234F1Z5). Shown on the Refund & Cancellation Policy page when set.",
          },
        },
        {
          name: "cin",
          type: "text",
          admin: {
            description:
              "Corporate Identity Number (e.g. U63040KA2020PTC123456). Shown on the Refund & Cancellation Policy page when set.",
          },
        },
        {
          name: "refundPolicy",
          type: "textarea",
          admin: {
            description:
              "Optional custom refund & cancellation policy override. Leave blank to use the default policy rendered on /refund-policy.",
          },
        },
        {
          name: "grievanceOfficerName",
          type: "text",
          admin: {
            description: "Grievance Redressal Officer name.",
          },
        },
        {
          name: "grievanceOfficerEmail",
          type: "email",
          admin: {
            description: "Grievance Redressal Officer contact email.",
          },
        },
        {
          name: "grievanceOfficerPhone",
          type: "text",
          admin: {
            description: "Grievance Redressal Officer contact phone.",
          },
        },
      ],
    },
  ],
};
