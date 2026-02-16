import type { CollectionConfig } from "payload";

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  admin: {
    useAsTitle: "fullName",
    group: "Business",
    defaultColumns: ["fullName", "type", "destinationCountry", "visaType", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "visa-inquiry",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Visa Inquiry", value: "visa-inquiry" },
        { label: "Callback", value: "callback" },
        { label: "Contact", value: "contact" },
      ],
    },
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "destinationCountry",
      type: "text",
    },
    {
      name: "visaType",
      type: "text",
    },
    {
      name: "numberOfTravelers",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "preferredTravelDate",
      type: "text",
    },
    {
      name: "purposeOfVisit",
      type: "textarea",
    },
    {
      name: "preferredContactMethod",
      type: "select",
      options: [
        { label: "Call", value: "call" },
        { label: "Email", value: "email" },
        { label: "WhatsApp", value: "whatsapp" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Proposal Sent", value: "proposal-sent" },
        { label: "Follow Up", value: "follow-up" },
        { label: "Converted", value: "converted" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "assignedTo",
      type: "relationship",
      relationTo: "users",
    },
  ],
};
