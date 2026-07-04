import { describe, it, expect } from "vitest";
import {
  SERVICES_DATA,
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";

describe("services-data", () => {
  it("should have 6 services", () => {
    expect(SERVICES_DATA).toHaveLength(6);
  });

  it("should return service by valid slug", () => {
    const service = getServiceBySlug("visa-appointment");
    expect(service).toBeDefined();
    expect(service?.title).toBe("Visa Appointment Booking");
  });

  it("should return undefined for invalid slug", () => {
    expect(getServiceBySlug("nonexistent")).toBeUndefined();
  });

  it("should return all service slugs", () => {
    const slugs = getAllServiceSlugs();
    expect(slugs).toHaveLength(6);
    expect(slugs).toContain("visa-appointment");
    expect(slugs).toContain("visa-assistance");
    expect(slugs).toContain("travel-insurance");
    expect(slugs).toContain("flight-hotel-booking");
    expect(slugs).toContain("passport-services");
    expect(slugs).toContain("document-attestation");
  });

  it("every service should have required fields", () => {
    for (const service of SERVICES_DATA) {
      expect(service.title).toBeTruthy();
      expect(service.slug).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
      expect(service.process.length).toBeGreaterThan(0);
      expect(service.faqs.length).toBeGreaterThan(0);
    }
  });

  it("process steps should be numbered sequentially", () => {
    for (const service of SERVICES_DATA) {
      service.process.forEach((step, i) => {
        expect(step.step).toBe(i + 1);
      });
    }
  });
});
