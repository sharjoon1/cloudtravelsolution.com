import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { callbackSchema } from "@/lib/validations";
import { sendCallbackNotification } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isHoneypotTripped } from "@/lib/spam-check";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (rateLimit(`callback:${ip}`, { intervalMs: 60_000, maxRequests: 5 })) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (isHoneypotTripped(body)) {
      return NextResponse.json(
        { success: true, message: "Callback request submitted successfully" },
        { status: 200 }
      );
    }

    const validated = callbackSchema.parse(body);

    const payload = await getPayload({ config });
    await payload.create({
      collection: "inquiries",
      data: {
        type: "callback",
        fullName: validated.name,
        phone: validated.phone,
        notes: [
          validated.preferredTime && `Preferred time: ${validated.preferredTime}`,
          validated.service && `Service: ${validated.service}`,
        ].filter(Boolean).join("\n"),
      },
    });

    // Fire-and-forget email notification (team only — no user email)
    sendCallbackNotification(validated);

    return NextResponse.json(
      { success: true, message: "Callback request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("Callback submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
