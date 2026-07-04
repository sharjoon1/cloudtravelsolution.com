import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { b2bInquirySchema } from "@/lib/validations";
import { sendB2BInquiryNotification } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isHoneypotTripped } from "@/lib/spam-check";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (rateLimit(`b2b:${ip}`, { intervalMs: 60_000, maxRequests: 5 })) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (isHoneypotTripped(body)) {
      return NextResponse.json(
        { success: true, message: "B2B inquiry submitted successfully" },
        { status: 201 }
      );
    }

    const parsed = b2bInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const validated = parsed.data;

    const payload = await getPayload({ config });
    const inquiry = await payload.create({
      collection: "b2b-inquiries",
      data: validated,
    });

    // Fire-and-forget email notification
    Promise.allSettled([
      sendB2BInquiryNotification(validated),
    ]);

    return NextResponse.json(
      { success: true, message: "B2B inquiry submitted successfully", id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("B2B inquiry submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
