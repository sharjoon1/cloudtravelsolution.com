import type { CollectionConfig } from "payload";

export const VisaTypes: CollectionConfig = {
  slug: "visa-types",
  admin: {
    useAsTitle: "name",
    group: "Visa Services",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Tourist", value: "tourist" },
        { label: "Business", value: "business" },
        { label: "Student", value: "student" },
        { label: "Work Permit", value: "work-permit" },
        { label: "Transit", value: "transit" },
        { label: "Medical", value: "medical" },
        { label: "Conference", value: "conference" },
      ],
    },
    {
      name: "country",
      type: "relationship",
      relationTo: "countries",
      required: true,
    },
    {
      name: "requirements",
      type: "array",
      fields: [
        {
          name: "requirement",
          type: "text",
        },
      ],
    },
    {
      name: "embassyFee",
      type: "number",
    },
    {
      name: "serviceFee",
      type: "number",
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "INR",
    },
    {
      name: "processingTime",
      type: "text",
    },
    {
      name: "validity",
      type: "text",
    },
    {
      name: "documentsNeeded",
      type: "array",
      fields: [
        {
          name: "document",
          type: "text",
        },
      ],
    },
    {
      name: "applicationSteps",
      type: "array",
      fields: [
        {
          name: "step",
          type: "text",
        },
      ],
    },
    {
      name: "notes",
      type: "textarea",
    },
  ],
};
