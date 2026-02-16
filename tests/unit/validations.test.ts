import { describe, it, expect } from "vitest";
import {
  visaInquirySchema,
  callbackSchema,
  contactSchema,
  newsletterSchema,
} from "@/lib/validations";

describe("visaInquirySchema", () => {
  const validData = {
    fullName: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+919876543210",
    city: "bangalore" as const,
    destinationCountry: "united-states",
    visaType: "tourist" as const,
    numberOfTravelers: 2,
    appliedBefore: false,
    preferredContactMethod: "call" as const,
    privacyConsent: true as const,
  };

  it("validates correct data", () => {
    const result = visaInquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = visaInquirySchema.safeParse({
      ...validData,
      email: "invalid",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid phone", () => {
    const result = visaInquirySchema.safeParse({
      ...validData,
      phone: "123",
    });
    expect(result.success).toBe(false);
  });

  it("requires privacy consent", () => {
    const result = visaInquirySchema.safeParse({
      ...validData,
      privacyConsent: false,
    });
    expect(result.success).toBe(false);
  });
});

describe("callbackSchema", () => {
  it("validates correct data", () => {
    const result = callbackSchema.safeParse({
      name: "Priya Sharma",
      phone: "9876543210",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = callbackSchema.safeParse({
      name: "A",
      phone: "9876543210",
    });
    expect(result.success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("validates correct data", () => {
    const result = contactSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      subject: "Visa inquiry",
      message: "I need help with my visa application",
    });
    expect(result.success).toBe(true);
  });
});

describe("newsletterSchema", () => {
  it("validates correct email", () => {
    const result = newsletterSchema.safeParse({
      email: "user@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = newsletterSchema.safeParse({
      email: "notanemail",
    });
    expect(result.success).toBe(false);
  });
});
