/**
 * Simple in-memory, per-key sliding-window rate limiter.
 *
 * NOTE: This is process-local. Under PM2 (single process) it is effective.
 * If the app ever scales to multiple instances, swap this for Redis-backed limiting.
 */

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

export interface RateLimitOptions {
  /** Sliding window length in ms. */
  intervalMs: number;
  /** Max requests allowed within the window per key. */
  maxRequests: number;
}

/**
 * @returns `true` if the key has exceeded the limit (i.e. the request should be rejected).
 */
export function rateLimit(key: string, { intervalMs, maxRequests }: RateLimitOptions): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  const recent = bucket ? bucket.hits.filter((t) => now - t < intervalMs) : [];

  if (recent.length >= maxRequests) {
    if (bucket) bucket.hits = recent;
    gc(now, intervalMs);
    return true;
  }

  recent.push(now);
  buckets.set(key, { hits: recent });
  gc(now, intervalMs);
  return false;
}

/** Best-effort client IP extraction from common proxy headers. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

let lastGc = 0;
function gc(now: number, intervalMs: number) {
  // Run cleanup at most once per second to avoid overhead on every call.
  if (now - lastGc < 1000) return;
  lastGc = now;
  if (buckets.size < 2000) return;
  for (const [key, bucket] of buckets) {
    bucket.hits = bucket.hits.filter((t) => now - t < intervalMs);
    if (bucket.hits.length === 0) buckets.delete(key);
  }
}
