import { describe, it, expect } from "vitest";
import { sanitizeServiceRequest } from "@/lib/partner-utils";

describe("sanitizeServiceRequest", () => {
  it("strips internalNotes and keeps everything else", () => {
    const doc = {
      id: 1,
      trackingCode: "TRK-202607-0001",
      applicantName: "Jane",
      internalNotes: "staff-only context the partner must never see",
      status: "received",
    };
    const safe = sanitizeServiceRequest(doc);
    expect(safe).toEqual({
      id: 1,
      trackingCode: "TRK-202607-0001",
      applicantName: "Jane",
      status: "received",
    });
    expect("internalNotes" in safe).toBe(false);
  });

  it("is a no-op when internalNotes is absent", () => {
    const doc = { id: 2, applicantName: "Jane" };
    expect(sanitizeServiceRequest(doc)).toEqual({ id: 2, applicantName: "Jane" });
  });

  it("works on an array of docs (for the LIST route)", () => {
    const docs = [
      { id: 1, internalNotes: "a" },
      { id: 2, internalNotes: "b" },
    ];
    const safe = docs.map(sanitizeServiceRequest);
    expect(safe).toEqual([{ id: 1 }, { id: 2 }]);
    expect("internalNotes" in safe[0]).toBe(false);
  });
});
