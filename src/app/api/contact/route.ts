import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

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
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: error },
        { status: 400 }
      );
    }

    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
