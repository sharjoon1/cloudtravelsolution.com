import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isHoneypotTripped } from "@/lib/spam-check";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (rateLimit(`contact:${ip}`, { intervalMs: 60_000, maxRequests: 5 })) {
      return NextResponse.json(
        { success: false, message: "Too many messages. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (isHoneypotTripped(body)) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 201 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const validated = parsed.data;

    const payload = await getPayload({ config });
    await payload.create({
      collection: "inquiries",
      data: {
        type: "contact",
        fullName: validated.name,
        email: validated.email,
        phone: validated.phone,
        city: validated.city,
        purposeOfVisit: `Subject: ${validated.subject}\n\n${validated.message}`,
      },
    });

    // Fire-and-forget email notifications
    Promise.allSettled([
      sendContactNotification(validated),
      sendContactConfirmation(validated),
    ]);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
