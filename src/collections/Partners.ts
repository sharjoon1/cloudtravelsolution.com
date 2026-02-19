import type { CollectionConfig } from "payload";
import { autoNumber } from "../hooks/autoNumber";

export const Partners: CollectionConfig = {
  slug: "partners",
  auth: {
    tokenExpiration: 604800, // 7 days
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },
  admin: {
    useAsTitle: "companyName",
    group: "B2B Partners",
    defaultColumns: [
      "partnerCode",
      "companyName",
      "type",
      "contactPerson",
      "email",
      "status",
      "totalRequests",
      "createdAt",
    ],
  },
  access: {
    // Admins can do everything; partners can only read their own record
    read: ({ req }) => {
      if (req.user?.collection === "users") return true;
      if (req.user?.collection === "partners") return { id: { equals: req.user.id } };
      return false;
    },
    create: ({ req }) => req.user?.collection === "users",
    update: ({ req }) => {
      if (req.user?.collection === "users") return true;
      return false;
    },
    delete: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    beforeChange: [autoNumber("PTR", "partnerCode", "partners")],
  },
  fields: [
    {
      name: "partnerCode",
      type: "text",
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Educational Consultancy", value: "educational-consultancy" },
        { label: "Manpower Company", value: "manpower-company" },
        { label: "Travel Agency", value: "travel-agency" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "contactPerson",
      type: "text",
      required: true,
    },
    // email is auto-created by auth: true
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "textarea",
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
      name: "gstNumber",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      admin: { position: "sidebar" },
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
      ],
    },
    {
      name: "assignedManager",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "totalRequests",
      type: "number",
      defaultValue: 0,
      admin: { readOnly: true, position: "sidebar" },
    },
  ],
};
