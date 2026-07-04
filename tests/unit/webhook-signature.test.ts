import { describe, it, expect } from "vitest";
import { verifyWebhookSignature } from "@/lib/webhook-signature";

// Official Svix test vector — proves our manual HMAC matches the reference.
// Source: https://docs.svix.com/receiving/verifying-payloads/how-manual
const VECTOR = {
  secret: "whsec_plJ3nmyCDGBKInavdOK15jsl",
  body: '{"event_type":"ping","data":{"success":true}}',
  msgId: "msg_loFOjxBNrRLzqYUf",
  timestamp: "1731705121",
  signature: "v1,rAvfW3dJ/X/qxhsaXPOyyCGmRKsaKWcsNccKXlIktD0=",
  tsMs: 1731705121 * 1000,
};

const headers = (overrides: Partial<Record<string, string>> = {}) => ({
  "svix-id": VECTOR.msgId,
  "svix-timestamp": VECTOR.timestamp,
  "svix-signature": VECTOR.signature,
  ...overrides,
});

describe("verifyWebhookSignature — golden vector", () => {
  it("matches the official Svix reference signature", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret,
      body: VECTOR.body,
      headers: headers(),
      nowMs: VECTOR.tsMs,
    });
    expect(result).toEqual({ ok: true });
  });

  it("accepts the secret without the whsec_ prefix too", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret.replace(/^whsec_/, ""),
      body: VECTOR.body,
      headers: headers(),
      nowMs: VECTOR.tsMs,
    });
    expect(result.ok).toBe(true);
  });
});

describe("verifyWebhookSignature — rejection cases", () => {
  it("rejects a tampered body", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret,
      body: '{"event_type":"ping","data":{"success":false}}', // flipped
      headers: headers(),
      nowMs: VECTOR.tsMs,
    });
    expect(result).toEqual({ ok: false, reason: "no-matching-signature" });
  });

  it("rejects the wrong secret", () => {
    const result = verifyWebhookSignature({
      secret: "whsec_wrongSecretHere1234567890abcdefghij",
      body: VECTOR.body,
      headers: headers(),
      nowMs: VECTOR.tsMs,
    });
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.reason).toBe("no-matching-signature");
  });

  it("rejects when a header is missing", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret,
      body: VECTOR.body,
      headers: { "svix-id": VECTOR.msgId, "svix-timestamp": VECTOR.timestamp }, // no signature
      nowMs: VECTOR.tsMs,
    });
    expect(result).toEqual({ ok: false, reason: "missing-headers" });
  });

  it("rejects a stale timestamp (replay protection)", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret,
      body: VECTOR.body,
      headers: headers(),
      nowMs: VECTOR.tsMs + 10 * 60 * 1000, // 10 min later, default tol is 5 min
    });
    expect(result).toEqual({ ok: false, reason: "stale-timestamp" });
  });

  it("rejects a future timestamp beyond tolerance", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret,
      body: VECTOR.body,
      headers: headers(),
      nowMs: VECTOR.tsMs - 10 * 60 * 1000,
    });
    expect(result).toEqual({ ok: false, reason: "stale-timestamp" });
  });
});

describe("verifyWebhookSignature — multi-signature header", () => {
  it("accepts when any space-delimited signature matches", () => {
    const result = verifyWebhookSignature({
      secret: VECTOR.secret,
      body: VECTOR.body,
      headers: headers({
        "svix-signature": `v1,invalidBase64SignatureHere= ${VECTOR.signature}`,
      }),
      nowMs: VECTOR.tsMs,
    });
    expect(result.ok).toBe(true);
  });
});
