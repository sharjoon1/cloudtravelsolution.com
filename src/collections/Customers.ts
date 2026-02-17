import type { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: {
    useAsTitle: "fullName",
    group: "CRM",
    defaultColumns: ["fullName", "email", "phone", "city", "status", "source", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "alternatePhone",
      type: "text",
    },
    {
      name: "dateOfBirth",
      type: "date",
    },
    {
      name: "passportNumber",
      type: "text",
    },
    {
      name: "passportExpiry",
      type: "date",
    },
    {
      name: "city",
      type: "select",
      options: [
        { label: "Bangalore", value: "bangalore" },
        { label: "Hyderabad", value: "hyderabad" },
        { label: "Delhi", value: "delhi" },
        { label: "Chennai", value: "chennai" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "VIP", value: "vip" },
      ],
    },
    {
      name: "source",
      type: "select",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Lead Form", value: "lead-form" },
        { label: "Inquiry Form", value: "inquiry-form" },
        { label: "Walk-in", value: "walk-in" },
        { label: "Referral", value: "referral" },
        { label: "Manual", value: "manual" },
      ],
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "branch",
      type: "relationship",
      relationTo: "locations",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "totalApplications",
      type: "number",
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
};
