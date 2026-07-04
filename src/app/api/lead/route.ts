import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { heroLeadSchema } from "@/lib/validations";
import { sendLeadNotification, sendLeadConfirmation } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isHoneypotTripped } from "@/lib/spam-check";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (rateLimit(`lead:${ip}`, { intervalMs: 60_000, maxRequests: 5 })) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot: a hidden field bots fill — silently drop it (return success so the
    // bot can't tell, but create no CRM row and send no paid email).
    if (isHoneypotTripped(body)) {
      return NextResponse.json(
        { success: true, message: "Lead submitted successfully" },
        { status: 201 }
      );
    }

    const parsed = heroLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const validated = parsed.data;

    const payload = await getPayload({ config });
    const lead = await payload.create({
      collection: "leads",
      data: {
        ...validated,
        source: "hero-form",
      },
    });

    // Fire-and-forget email notifications
    Promise.allSettled([
      sendLeadNotification(validated),
      sendLeadConfirmation(validated),
    ]);

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully", id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
