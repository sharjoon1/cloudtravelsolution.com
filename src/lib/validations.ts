import { z } from "zod";

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

export const visaInquirySchema = z.object({
  // Step 1: Personal Information
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  city: z.enum(["bangalore", "hyderabad", "delhi", "chennai", "other"], {
    message: "Please select your city",
  }),

  // Step 2: Visa Requirements
  destinationCountry: z.string().min(1, "Please select a destination country"),
  visaType: z.enum(
    ["tourist", "business", "student", "work-permit", "transit", "medical", "conference"],
    { message: "Please select a visa type" }
  ),
  visaCategory: z.enum(
    ["tourist", "business", "student", "work-permit", "medical", "transit", "conference", "family"],
    { message: "Please select a category" }
  ).optional(),
  numberOfTravelers: z.number().min(1).max(50).default(1),
  preferredTravelDate: z.string().optional(),
  travelEndDate: z.string().optional(),
  employmentStatus: z.enum(
    ["salaried", "self-employed", "student", "retired", "unemployed"],
    { message: "Please select your employment status" }
  ).optional(),
  appliedBefore: z.boolean().default(false),

  // Step 3: Additional Details
  purposeOfVisit: z.string().max(500).optional(),
  preferredContactMethod: z.enum(["call", "email", "whatsapp"]).default("call"),
  preferredCallbackTime: z.string().optional(),
  referralSource: z.string().optional(),

  // Consent
  privacyConsent: z.literal(true, {
    message: "You must agree to the privacy policy",
  }),
});

export type VisaInquiryFormData = z.infer<typeof visaInquirySchema>;

export const callbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  preferredTime: z.string().optional(),
  service: z.string().optional(),
});

export type CallbackFormData = z.infer<typeof callbackSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number").optional(),
  city: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const heroLeadSchema = z.object({
  // Step 1: Travel Details
  destination: z.string().min(1, "Please select a destination"),
  travelMonth: z.string().min(1, "Please select a travel month"),
  duration: z.string().min(1, "Please select trip duration"),
  travelers: z.string().min(1, "Please select number of travelers"),
  // Step 2: Contact Info
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid Indian phone number"),
  email: z.string().email("Please enter a valid email address"),
});

export type HeroLeadFormData = z.infer<typeof heroLeadSchema>;
