import { describe, it, expect } from "vitest";
import { isHoneypotTripped, HONEYPOT_FIELD } from "@/lib/spam-check";

describe("isHoneypotTripped", () => {
  it("is false for a normal human submission (field absent or empty)", () => {
    expect(isHoneypotTripped({ name: "Jane", email: "j@x.com" })).toBe(false);
    expect(isHoneypotTripped({ name: "Jane", [HONEYPOT_FIELD]: "" })).toBe(false);
    expect(isHoneypotTripped({ name: "Jane", [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("is true when the hidden field is filled (bot)", () => {
    expect(isHoneypotTripped({ name: "Jane", [HONEYPOT_FIELD]: "spam" })).toBe(true);
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: "http://buy-cheap-shoes.example" })).toBe(true);
  });

  it("trips on non-string truthy values a bot might send", () => {
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: 1 })).toBe(true);
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: true })).toBe(true);
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: { url: "x" } })).toBe(true);
  });

  it("handles non-object bodies safely (never throws)", () => {
    expect(isHoneypotTripped(null)).toBe(false);
    expect(isHoneypotTripped(undefined)).toBe(false);
    expect(isHoneypotTripped("not-an-object")).toBe(false);
    expect(isHoneypotTripped(42)).toBe(false);
  });
});
