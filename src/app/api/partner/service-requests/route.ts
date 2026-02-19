import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { serviceRequestSchema } from "@/lib/validations";

async function getPartnerFromToken(req: NextRequest) {
  const token = req.cookies.get("partner-token")?.value;
  if (!token) return null;

  try {
    const meRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/partners/me`,
      { headers: { Authorization: `JWT ${token}` } }
    );
    if (!meRes.ok) return null;
    const data = await meRes.json();
    return data.user || null;
  } catch {
    return null;
  }
}

// GET /api/partner/service-requests — List partner's service requests
export async function GET(req: NextRequest) {
  const partner = await getPartnerFromToken(req);
  if (!partner) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "-createdAt";

  const payload = await getPayload({ config });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { partner: { equals: partner.id } };

  if (status && status !== "all") {
    where.status = { equals: status };
  }

  if (search) {
    where.or = [
      { applicantName: { like: search } },
      { passportNumber: { like: search } },
      { trackingCode: { like: search } },
    ];
  }

  const result = await payload.find({
    collection: "service-requests",
    where,
    page,
    limit,
    sort,
    depth: 1,
    overrideAccess: true,
  });

  return NextResponse.json({
    docs: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  });
}

// POST /api/partner/service-requests — Create new service request
export async function POST(req: NextRequest) {
  const partner = await getPartnerFromToken(req);
  if (!partner) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = serviceRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    const doc = await payload.create({
      collection: "service-requests",
      data: {
        ...parsed.data,
        partner: partner.id,
        status: "received",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ success: true, doc }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create service request";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
