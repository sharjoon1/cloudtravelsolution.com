import { NextResponse } from "next/server";
import { heroLeadSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = heroLeadSchema.parse(body);

    // TODO: In production, this would:
    // 1. Save to Payload CMS (Leads collection)
    // 2. Send notification email to CTS team
    // 3. Trigger WhatsApp/SMS follow-up

    console.log("New hero lead:", validated);

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully" },
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
