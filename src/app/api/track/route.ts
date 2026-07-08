import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify a Cloudflare Turnstile token when TURNSTILE_SECRET_KEY is configured.
 * When the secret is unset, returns `null` so the endpoint falls back to
 * rate-limit-only behavior (the always-on applicantName removal is the baseline mitigation).
 *
 * @returns `null` when verification passes (or is disabled), otherwise an error message.
 */
async function verifyTurnstile(
  token: string | null,
  remoteip: string
): Promise<string | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return null; // Turnstile not configured — rate-limit-only mode.

  if (!token) {
    return "Bot verification is required. Please complete the challenge and try again.";
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip }),
    });
    const data = (await res.json()) as { success?: boolean };
    if (!data.success) {
      return "Bot verification failed. Please complete the challenge and try again.";
    }
    return null;
  } catch {
    return "Bot verification could not be completed. Please try again.";
  }
}

// GET /api/track?passport=X or ?code=TRK-X — Public tracking lookup
export async function GET(req: NextRequest) {
  // Throttle lookups to blunt passport-number enumeration (passport numbers are not secret).
  const ip = getClientIp(req);
  if (rateLimit(`track:${ip}`, { intervalMs: 60_000, maxRequests: 10 })) {
    return NextResponse.json(
      { error: "Too many lookups. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(req.url);

  // Cloudflare Turnstile bot protection — gated on env (no-op until keys are provided).
  const turnstileToken =
    req.headers.get("cf-turnstile-response") ||
    searchParams.get("cf-turnstile-response");
  const turnstileError = await verifyTurnstile(turnstileToken, ip);
  if (turnstileError) {
    return NextResponse.json({ error: turnstileError }, { status: 403 });
  }

  const passport = searchParams.get("passport");
  const code = searchParams.get("code");

  if (!passport && !code) {
    return NextResponse.json(
      { error: "Please provide a passport number or tracking code" },
      { status: 400 }
    );
  }

  const payload = await getPayload({ config });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (code) {
      where.trackingCode = { equals: code.toUpperCase() };
    } else if (passport) {
      where.passportNumber = { equals: passport.toUpperCase() };
    }

    const result = await payload.find({
      collection: "service-requests",
      where,
      limit: 10,
      sort: "-createdAt",
      depth: 0,
      overrideAccess: true,
    });

    if (result.docs.length === 0) {
      return NextResponse.json(
        { error: "No applications found" },
        { status: 404 }
      );
    }

    // Return sanitized data only — no PII (applicant name), internal notes, partner info, or fees.
    const sanitized = result.docs.map((doc) => ({
      trackingCode: doc.trackingCode,
      serviceType: doc.serviceType,
      destinationCountry: doc.destinationCountry,
      status: doc.status,
      statusHistory: (doc.statusHistory || []).map(
        (entry: { status: string; timestamp: string }) => ({
          status: entry.status,
          timestamp: entry.timestamp,
          // NOTE: `note` intentionally omitted — it may contain internal staff notes.
        })
      ),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    return NextResponse.json({
      results: sanitized,
      total: result.totalDocs,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
