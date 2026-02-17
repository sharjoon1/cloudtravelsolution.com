import type { CollectionConfig } from "payload";
import { autoNumber } from "../hooks/autoNumber";

export const Payments: CollectionConfig = {
  slug: "payments",
  admin: {
    useAsTitle: "receiptNumber",
    group: "CRM",
    defaultColumns: [
      "receiptNumber",
      "customer",
      "amount",
      "paymentType",
      "paymentMethod",
      "status",
      "paymentDate",
    ],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "admin",
  },
  hooks: {
    beforeChange: [autoNumber("PAY", "receiptNumber", "payments")],
  },
  fields: [
    {
      name: "receiptNumber",
      type: "text",
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      required: true,
    },
    {
      name: "visaApplication",
      type: "relationship",
      relationTo: "visa-applications",
    },
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "paymentType",
      type: "select",
      options: [
        { label: "Embassy Fee", value: "embassy-fee" },
        { label: "Service Fee", value: "service-fee" },
        { label: "Consultation Fee", value: "consultation-fee" },
        { label: "Courier", value: "courier" },
        { label: "Insurance", value: "insurance" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "paymentMethod",
      type: "select",
      options: [
        { label: "Cash", value: "cash" },
        { label: "UPI", value: "upi" },
        { label: "Bank Transfer", value: "bank-transfer" },
        { label: "Card", value: "card" },
        { label: "Razorpay", value: "razorpay" },
        { label: "Cheque", value: "cheque" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Pending", value: "pending" },
        { label: "Received", value: "received" },
        { label: "Partial", value: "partial" },
        { label: "Refunded", value: "refunded" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    {
      name: "paymentDate",
      type: "date",
    },
    {
      name: "razorpayPaymentId",
      type: "text",
    },
    {
      name: "razorpayOrderId",
      type: "text",
    },
    {
      name: "notes",
      type: "textarea",
    },
    {
      name: "receivedBy",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
