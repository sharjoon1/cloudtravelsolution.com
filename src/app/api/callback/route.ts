import { NextResponse } from "next/server";
import { callbackSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = callbackSchema.parse(body);

    // TODO: Save to Payload CMS Inquiries collection
    // TODO: Send notification email via Resend
    // TODO: Push to Zoho CRM
    console.log("Callback request received:", validated);

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

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
