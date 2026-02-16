import { NextResponse } from "next/server";
import { visaInquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = visaInquirySchema.parse(body);

    // In production, this would:
    // 1. Save to Payload CMS (Inquiries collection)
    // 2. Send confirmation email via Resend
    // 3. Send notification to CTS team
    // 4. Push to Zoho CRM (Phase 2)
    // 5. Send WhatsApp notification (Phase 2)

    console.log("New visa inquiry:", validated);

    return NextResponse.json(
      { success: true, message: "Inquiry submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
