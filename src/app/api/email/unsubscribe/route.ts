import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/unsubscribe?status=invalid", request.url));
  }

  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "subscribers",
      where: { unsubscribeToken: { equals: token } },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return NextResponse.redirect(new URL("/unsubscribe?status=invalid", request.url));
    }

    const subscriber = result.docs[0];

    if ((subscriber as unknown as { status: string }).status === "unsubscribed") {
      return NextResponse.redirect(new URL("/unsubscribe?status=already", request.url));
    }

    await payload.update({
      collection: "subscribers",
      id: subscriber.id,
      data: {
        status: "unsubscribed",
        unsubscribedAt: new Date().toISOString(),
      },
    });

    return NextResponse.redirect(new URL("/unsubscribe?status=success", request.url));
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.redirect(new URL("/unsubscribe?status=error", request.url));
  }
}
