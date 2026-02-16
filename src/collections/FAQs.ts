import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "richText",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "General", value: "general" },
        { label: "Visa", value: "visa" },
        { label: "Services", value: "services" },
        { label: "Booking", value: "booking" },
        { label: "Pricing", value: "pricing" },
      ],
    },
    {
      name: "relatedCountry",
      type: "relationship",
      relationTo: "countries",
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
