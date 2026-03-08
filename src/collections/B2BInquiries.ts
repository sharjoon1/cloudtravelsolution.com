import type { CollectionConfig } from "payload";

export const B2BInquiries: CollectionConfig = {
  slug: "b2b-inquiries",
  admin: {
    useAsTitle: "companyName",
    group: "Lead Management",
    defaultColumns: ["companyName", "contactPerson", "businessType", "city", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "companyName", type: "text", required: true },
    { name: "contactPerson", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    {
      name: "businessType",
      type: "select",
      required: true,
      options: [
        { label: "Education Consultancy", value: "education-consultancy" },
        { label: "Manpower Agency", value: "manpower-agency" },
      ],
    },
    { name: "city", type: "text", required: true },
    {
      name: "expectedVolume",
      type: "select",
      required: true,
      options: [
        { label: "1-10 per month", value: "1-10" },
        { label: "10-50 per month", value: "10-50" },
        { label: "50-100 per month", value: "50-100" },
        { label: "100+ per month", value: "100+" },
      ],
    },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Converted", value: "converted" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
  ],
};
