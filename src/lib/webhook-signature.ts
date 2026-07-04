import crypto from "crypto";

/**
 * Verify a Resend webhook signature.
 *
 * Resend signs webhooks via Svix. The request carries three headers —
 * `svix-id`, `svix-timestamp` (seconds since epoch) and `svix-signature`
 * (space-delimited `v1,<base64>` HMAC values). The signed content is
 * `${svix-id}.${svix-timestamp}.${rawBody}`, HMAC-SHA256 keyed by the
 * base64-decoded signing secret (the part after the `whsec_` prefix).
 *
 * Reference: https://docs.svix.com/receiving/verifying-payloads/how-manual
 *
 * No `svix` dependency — manual verification is ~30 lines, keeps the bundle
 * small, and the official test vector is covered in tests/unit/webhook-signature.test.ts.
 */

export interface WebhookHeaders {
  "svix-id"?: string;
  "svix-timestamp"?: string;
  "svix-signature"?: string;
}

export interface VerifyOptions {
  /** The signing secret exactly as Resend shows it (`whsec_…` or the raw base64). */
  secret: string;
  /** The raw request body — must be the untouched bytes, not re-serialised JSON. */
  body: string;
  headers: WebhookHeaders;
  /** Override "now" for tests. Defaults to Date.now() in production. */
  nowMs?: number;
  /** Allowed clock skew. Defaults to 5 minutes either direction. */
  toleranceMs?: number;
}

export type VerifyResult =
  | { ok: true }
  | {
      ok: false;
      reason: "missing-headers" | "stale-timestamp" | "no-matching-signature";
    };

const DEFAULT_TOLERANCE_MS = 5 * 60 * 1000;

export function verifyWebhookSignature(opts: VerifyOptions): VerifyResult {
  const svixId = opts.headers["svix-id"];
  const svixTimestamp = opts.headers["svix-timestamp"];
  const svixSignature = opts.headers["svix-signature"];

  if (!svixId || !svixTimestamp || !svixSignature) {
    return { ok: false, reason: "missing-headers" };
  }

  // Replay protection: reject timestamps outside tolerance.
  const toleranceMs = opts.toleranceMs ?? DEFAULT_TOLERANCE_MS;
  const nowMs = opts.nowMs ?? Date.now();
  const tsMs = Number(svixTimestamp) * 1000;
  if (!Number.isFinite(tsMs) || Math.abs(nowMs - tsMs) > toleranceMs) {
    return { ok: false, reason: "stale-timestamp" };
  }

  // Key = base64-decoded secret, stripped of the optional `whsec_` prefix.
  const secretBytes = Buffer.from(opts.secret.replace(/^whsec_/, ""), "base64");

  const signedContent = `${svixId}.${svixTimestamp}.${opts.body}`;
  const expected = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  // `svix-signature` is a space-delimited list of `version,<base64>` values.
  // Strip the version prefix and constant-time compare each against `expected`.
  const candidates = svixSignature.split(" ").map((entry) => {
    const comma = entry.indexOf(",");
    return comma >= 0 ? entry.slice(comma + 1) : entry;
  });

  const matched = candidates.some((candidate) =>
    safeCompareBase64(candidate, expected)
  );

  return matched ? { ok: true } : { ok: false, reason: "no-matching-signature" };
}

/** Constant-time comparison of two base64 signature strings. Never throws. */
function safeCompareBase64(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}
