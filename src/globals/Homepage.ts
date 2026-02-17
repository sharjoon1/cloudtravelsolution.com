import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    group: "Website",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "group",
      name: "hero",
      label: "Hero Section",
      fields: [
        {
          name: "badgeText",
          type: "text",
          defaultValue: "Now expanding to Delhi & Chennai",
        },
        {
          name: "headline",
          type: "text",
          defaultValue: "Your Trusted",
        },
        {
          name: "highlightText",
          type: "text",
          defaultValue: "Visa & Travel",
          admin: {
            description: "This text appears highlighted in the secondary color",
          },
        },
        {
          name: "headlineAfter",
          type: "text",
          defaultValue: "Partner Across India",
          admin: {
            description: "Text after the highlighted portion",
          },
        },
        {
          name: "subheadline",
          type: "textarea",
          defaultValue:
            "Expert visa consulting for 190+ countries. From application to approval, we handle everything — so you can focus on your journey.",
        },
      ],
    },
    {
      name: "trustBadges",
      type: "array",
      label: "Trust Badges",
      maxRows: 6,
      fields: [
        {
          name: "icon",
          type: "select",
          options: [
            { label: "Shield", value: "Shield" },
            { label: "Award", value: "Award" },
            { label: "MapPin", value: "MapPin" },
            { label: "Clock", value: "Clock" },
            { label: "Star", value: "Star" },
            { label: "CheckCircle", value: "CheckCircle" },
            { label: "Users", value: "Users" },
            { label: "Globe", value: "Globe" },
          ],
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "stats",
      label: "Stats Section",
      fields: [
        {
          name: "heading",
          type: "text",
          defaultValue: "Why Choose CloudTravelSolution?",
        },
        {
          name: "subheading",
          type: "text",
          defaultValue:
            "Trusted by thousands of travelers across India for reliable, transparent, and expert visa services.",
        },
      ],
    },
    {
      name: "statsItems",
      type: "array",
      label: "Stats Items",
      maxRows: 8,
      fields: [
        {
          name: "value",
          type: "number",
          required: true,
        },
        {
          name: "suffix",
          type: "text",
          admin: {
            description: "e.g. +, %, etc.",
          },
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "cta",
      label: "CTA Section",
      fields: [
        {
          name: "heading",
          type: "text",
          defaultValue: "Ready to Start Your Journey?",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue:
            "Get expert visa guidance from India's trusted travel consultants. Book a free consultation today and let us handle the paperwork.",
        },
        {
          name: "buttonText",
          type: "text",
          defaultValue: "Book Free Consultation",
        },
        {
          name: "buttonLink",
          type: "text",
          defaultValue: "/inquiry/visa",
        },
      ],
    },
    {
      type: "group",
      name: "sectionHeadings",
      label: "Section Headings",
      admin: {
        description: "Headings and subheadings for each homepage section",
      },
      fields: [
        {
          name: "countriesHeading",
          type: "text",
          defaultValue: "Popular Visa Destinations",
        },
        {
          name: "countriesSubheading",
          type: "text",
          defaultValue:
            "Expert visa assistance for the most sought-after destinations. Choose your country to get started.",
        },
        {
          name: "servicesHeading",
          type: "text",
          defaultValue: "Our Services",
        },
        {
          name: "servicesSubheading",
          type: "text",
          defaultValue:
            "Comprehensive travel and visa services to make your international travel hassle-free.",
        },
        {
          name: "locationsHeading",
          type: "text",
          defaultValue: "Our Presence Across India",
        },
        {
          name: "locationsSubheading",
          type: "text",
          defaultValue:
            "Visit us at our offices or reach out for a free consultation. We are expanding rapidly to serve you better.",
        },
        {
          name: "testimonialsHeading",
          type: "text",
          defaultValue: "What Our Clients Say",
        },
        {
          name: "testimonialsSubheading",
          type: "text",
          defaultValue:
            "Trusted by thousands of happy travelers and businesses across India.",
        },
      ],
    },
  ],
};
