import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { newsletterSchema } from "@/lib/validations";
import { sendNewsletterWelcome } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = newsletterSchema.parse(body);

    const payload = await getPayload({ config });

    // Check if already subscribed
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: validated.email } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const subscriber = existing.docs[0] as unknown as { status: string; id: number };
      if (subscriber.status === "unsubscribed") {
        // Re-subscribe
        await payload.update({
          collection: "subscribers",
          id: subscriber.id,
          data: {
            status: "active",
            unsubscribedAt: null,
            subscribedAt: new Date().toISOString(),
          },
        });
      }
      return NextResponse.json({ success: true, message: "Subscribed successfully" });
    }

    // Create new subscriber
    await payload.create({
      collection: "subscribers",
      data: {
        email: validated.email,
        source: "newsletter-form",
        status: "active",
        segments: [{ tag: "newsletter" }],
      },
    });

    // Send welcome email
    sendNewsletterWelcome(validated.email);

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
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
