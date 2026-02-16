import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { heroLeadSchema } from "@/lib/validations";
import { sendLeadNotification, sendLeadConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = heroLeadSchema.parse(body);

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
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
