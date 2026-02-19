import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

// GET /api/track?passport=X or ?code=TRK-X — Public tracking lookup
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const passport = searchParams.get("passport");
  const code = searchParams.get("code");

  if (!passport && !code) {
    return NextResponse.json(
      { error: "Please provide a passport number or tracking code" },
      { status: 400 }
    );
  }

  const payload = await getPayload({ config });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (code) {
      where.trackingCode = { equals: code.toUpperCase() };
    } else if (passport) {
      where.passportNumber = { equals: passport.toUpperCase() };
    }

    const result = await payload.find({
      collection: "service-requests",
      where,
      limit: 10,
      sort: "-createdAt",
      depth: 0,
      overrideAccess: true,
    });

    if (result.docs.length === 0) {
      return NextResponse.json(
        { error: "No applications found" },
        { status: 404 }
      );
    }

    // Return sanitized data only — no internal notes, partner info, or fees
    const sanitized = result.docs.map((doc) => ({
      trackingCode: doc.trackingCode,
      applicantName: doc.applicantName,
      serviceType: doc.serviceType,
      destinationCountry: doc.destinationCountry,
      status: doc.status,
      statusHistory: (doc.statusHistory || []).map(
        (entry: { status: string; timestamp: string; note?: string }) => ({
          status: entry.status,
          timestamp: entry.timestamp,
          note: entry.note,
        })
      ),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    return NextResponse.json({
      results: sanitized,
      total: result.totalDocs,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
