/**
 * Strip staff-only fields from a service-request doc before returning it to a
 * partner. The partner API routes query with `overrideAccess: true` (required so
 * they can read a doc by partner ownership), which bypasses the field-level
 * `read` policy on `internalNotes` — so the route has to strip it itself.
 *
 * Keep this in sync with the `internalNotes` field in src/collections/ServiceRequests.ts
 * (and extend the allowlist there if more staff-only fields are added).
 */
export function sanitizeServiceRequest<T extends Record<string, unknown>>(
  doc: T
): Omit<T, "internalNotes"> {
  if (!doc || typeof doc !== "object") return doc;
  const { internalNotes: _internalNotes, ...rest } = doc;
  void _internalNotes;
  return rest;
}
