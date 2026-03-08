import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { b2bInquirySchema } from "@/lib/validations";
import { sendB2BInquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = b2bInquirySchema.parse(body);

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
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("B2B inquiry submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
