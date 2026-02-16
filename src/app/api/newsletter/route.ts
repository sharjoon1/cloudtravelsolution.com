import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { sendNewsletterWelcome } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = newsletterSchema.parse(body);

    // TODO: Add to email marketing list (Resend audience or Mailchimp)

    // Fire-and-forget welcome email
    sendNewsletterWelcome(validated.email);

    return NextResponse.json(
      { success: true, message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
