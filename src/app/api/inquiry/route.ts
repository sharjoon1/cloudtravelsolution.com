import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { visaInquirySchema } from "@/lib/validations";
import { sendInquiryNotification, sendInquiryConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = visaInquirySchema.parse(body);

    const payload = await getPayload({ config });
    await payload.create({
      collection: "inquiries",
      data: {
        type: "visa-inquiry",
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        city: validated.city,
        destinationCountry: validated.destinationCountry,
        visaType: validated.visaType,
        numberOfTravelers: validated.numberOfTravelers,
        preferredTravelDate: validated.preferredTravelDate,
        purposeOfVisit: validated.purposeOfVisit,
        preferredContactMethod: validated.preferredContactMethod,
        appliedBefore: validated.appliedBefore,
        preferredCallbackTime: validated.preferredCallbackTime,
        referralSource: validated.referralSource,
      },
    });

    // Fire-and-forget email notifications
    Promise.allSettled([
      sendInquiryNotification(validated),
      sendInquiryConfirmation(validated),
    ]);

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

    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
