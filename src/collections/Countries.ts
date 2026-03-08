import type { CollectionConfig } from "payload";

export const Countries: CollectionConfig = {
  slug: "countries",
  admin: {
    useAsTitle: "name",
    group: "Visa Services",
    defaultColumns: ["name", "code", "showOnHomepage", "processingTime", "visaFee"],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "code",
      type: "text",
      maxLength: 2,
      admin: {
        description: "2-character country code (e.g. IN, US, GB)",
      },
    },
    {
      name: "flag",
      type: "text",
      admin: {
        description: "Country flag emoji",
      },
    },
    {
      name: "showOnHomepage",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show this country in the Popular Visa Destinations grid on homepage",
        position: "sidebar",
      },
    },
    {
      name: "processingTime",
      type: "text",
      admin: {
        description: "E.g. 3-5 weeks, 15 working days",
      },
    },
    {
      name: "visaFee",
      type: "text",
      admin: {
        description: "Approximate visa fee e.g. ₹14,000",
      },
    },
    {
      name: "region",
      type: "select",
      options: [
        { label: "Asia", value: "asia" },
        { label: "Europe", value: "europe" },
        { label: "Americas", value: "americas" },
        { label: "Africa", value: "africa" },
        { label: "Oceania", value: "oceania" },
        { label: "Middle East", value: "middle-east" },
      ],
    },
    {
      name: "travelAdvisory",
      type: "select",
      defaultValue: "green",
      options: [
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
        { label: "Red", value: "red" },
      ],
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "embassyName",
      type: "text",
    },
    {
      name: "embassyLocation",
      type: "text",
    },
    {
      name: "appointmentRequired",
      type: "checkbox",
    },
    {
      name: "processingCentres",
      type: "array",
      fields: [
        {
          name: "centre",
          type: "text",
        },
      ],
    },
    {
      name: "website",
      type: "text",
    },
  ],
};
