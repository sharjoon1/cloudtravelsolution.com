import { describe, it, expect } from "vitest";
import {
  SERVICES_DATA,
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";

describe("services-data", () => {
  it("should have 5 services", () => {
    expect(SERVICES_DATA).toHaveLength(5);
  });

  it("should return service by valid slug", () => {
    const service = getServiceBySlug("visa-consulting");
    expect(service).toBeDefined();
    expect(service?.title).toBe("Visa Consulting");
  });

  it("should return undefined for invalid slug", () => {
    expect(getServiceBySlug("nonexistent")).toBeUndefined();
  });

  it("should return all service slugs", () => {
    const slugs = getAllServiceSlugs();
    expect(slugs).toHaveLength(5);
    expect(slugs).toContain("visa-consulting");
    expect(slugs).toContain("travel-insurance");
    expect(slugs).toContain("passport-services");
    expect(slugs).toContain("document-attestation");
    expect(slugs).toContain("corporate-travel");
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
