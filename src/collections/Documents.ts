import type { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
  upload: {
    staticDir: "documents",
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/webp",
    ],
  },
  admin: {
    useAsTitle: "filename",
    group: "B2B Partners",
    defaultColumns: ["filename", "documentType", "uploadedBy", "serviceRequest", "createdAt"],
  },
  access: {
    read: ({ req }) => {
      if (req.user?.collection === "users") return true;
      if (req.user?.collection === "partners") {
        return { uploadedBy: { equals: req.user.id } };
      }
      return false;
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => req.user?.collection === "users",
    delete: ({ req }) => req.user?.collection === "users",
  },
  fields: [
    {
      name: "documentType",
      type: "select",
      required: true,
      options: [
        { label: "Passport Copy", value: "passport" },
        { label: "Photo", value: "photo" },
        { label: "Bank Statement", value: "bank-statement" },
        { label: "Employment Letter", value: "employment-letter" },
        { label: "Invitation Letter", value: "invitation-letter" },
        { label: "Travel Itinerary", value: "travel-itinerary" },
        { label: "Hotel Booking", value: "hotel-booking" },
        { label: "Flight Booking", value: "flight-booking" },
        { label: "Insurance", value: "insurance" },
        { label: "Educational Certificate", value: "educational-certificate" },
        { label: "Offer Letter", value: "offer-letter" },
        { label: "NOC", value: "noc" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "partners",
      admin: { readOnly: true },
    },
    {
      name: "serviceRequest",
      type: "relationship",
      relationTo: "service-requests",
    },
  ],
};
