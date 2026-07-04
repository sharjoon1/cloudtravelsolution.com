/**
 * Lightweight, zero-dependency spam defence for the public form endpoints.
 *
 * The rate limiter (src/lib/rate-limit.ts) is per-IP and trusts x-forwarded-for,
 * so a proxy-rotating bot bypasses it entirely — and every successful submission
 * creates a CRM row + fires paid Resend emails. This honeypot catches bots that
 * blindly fill every field (including the hidden one) without imposing any UX cost
 * on real humans. It's a stopgap until Cloudflare Turnstile is layered on top.
 *
 * Field name is deliberately innocuous ("company_website") — it is NOT registered
 * with React Hook Form and is NOT in any Zod schema, so it rides along in the raw
 * request body only. Each API route checks it BEFORE schema.parse (Zod would
 * otherwise strip the unknown key).
 */
export const HONEYPOT_FIELD = "company_website";

/**
 * True if the honeypot field is present and non-empty → a bot filled the hidden
 * input. Call this on the raw parsed body before Zod validation.
 */
export function isHoneypotTripped(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  // Trip on any filled value — a string with content, or a non-string truthy
  // value a bot might send (number / boolean / object). Empty string / absent
  // means a human left the hidden field alone.
  if (typeof value === "string") return value.trim().length > 0;
  return value !== undefined && value !== null;
}
