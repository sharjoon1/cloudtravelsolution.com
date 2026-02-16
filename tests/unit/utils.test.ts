import { describe, it, expect } from "vitest";
import { cn, slugify, truncate, formatCurrency } from "@/lib/utils";

describe("cn (className merge)", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("United States")).toBe("united-states");
  });

  it("handles special characters", () => {
    expect(slugify("Côte d'Ivoire")).toBe("cte-divoire");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify(" Hello World ")).toBe("hello-world");
  });
});

describe("truncate", () => {
  it("truncates long text", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
  });

  it("returns short text unchanged", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });
});

describe("formatCurrency", () => {
  it("formats INR correctly", () => {
    const result = formatCurrency(15000);
    expect(result).toContain("15,000");
  });

  it("formats with different currency", () => {
    const result = formatCurrency(1000, "USD");
    expect(result).toContain("1,000");
  });
});
