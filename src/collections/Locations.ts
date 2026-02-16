import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "city",
    group: "Business",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "state",
      type: "text",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Coming Soon", value: "coming-soon" },
        { label: "Planned", value: "planned" },
      ],
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "mapLat",
      type: "number",
    },
    {
      name: "mapLng",
      type: "number",
    },
    {
      name: "operatingHours",
      type: "text",
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
  ],
};
