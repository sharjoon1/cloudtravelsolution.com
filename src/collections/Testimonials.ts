import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "clientName",
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "clientName",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "serviceUsed",
      type: "text",
      required: true,
    },
    {
      name: "reviewText",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
