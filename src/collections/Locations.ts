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
    {
      name: "isHeadquarters",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Flag this branch as the headquarters",
      },
    },
    {
      name: "managerName",
      type: "text",
      admin: {
        description: "Branch manager name",
      },
    },
    {
      name: "managerPhone",
      type: "text",
      admin: {
        description: "Branch manager contact number",
      },
    },
    {
      name: "services",
      type: "select",
      hasMany: true,
      options: [
        { label: "Visa Consulting", value: "visa-consulting" },
        { label: "Travel Insurance", value: "travel-insurance" },
        { label: "Passport Services", value: "passport-services" },
        { label: "Document Attestation", value: "document-attestation" },
        { label: "Corporate Travel", value: "corporate-travel" },
      ],
      admin: {
        description: "Services offered at this branch",
      },
    },
    {
      name: "googleMapsUrl",
      type: "text",
      admin: {
        description: "Google Maps embed or link URL",
      },
    },
    {
      name: "openingDate",
      type: "date",
      admin: {
        description: "Date the branch opened or will open",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first",
      },
    },
  ],
};
