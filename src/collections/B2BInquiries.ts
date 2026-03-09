import type { CollectionConfig } from "payload";
import { createSubscriberSyncHook } from "../hooks/subscriberSync";

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
  hooks: {
    afterChange: [
      createSubscriberSyncHook({
        source: "b2b-form",
        getEmail: (doc) => doc.email as string | undefined,
        getName: (doc) => doc.contactPerson as string | undefined,
        getSegments: (doc) => {
          const segments: string[] = ["b2b"];
          if (doc.businessType) segments.push(String(doc.businessType));
          if (doc.city) segments.push(String(doc.city).toLowerCase());
          return segments;
        },
      }),
    ],
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
        { label: "Travel Agency", value: "travel-agency" },
        { label: "Holidays Service Provider", value: "holidays-service-provider" },
      ],
    },
    { name: "city", type: "text", required: true },
    { name: "companyAddress", type: "textarea", required: true },
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
