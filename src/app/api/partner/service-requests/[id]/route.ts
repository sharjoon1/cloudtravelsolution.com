import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

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

// GET /api/partner/service-requests/[id] — Get single service request detail
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const partner = await getPartnerFromToken(req);
  if (!partner) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const payload = await getPayload({ config });

  try {
    const doc = await payload.findByID({
      collection: "service-requests",
      id,
      depth: 2,
      overrideAccess: true,
    });

    // Verify partner ownership
    const docPartnerId =
      typeof doc.partner === "object" && doc.partner !== null
        ? (doc.partner as { id: string }).id
        : doc.partner;

    if (docPartnerId !== partner.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Strip internal fields
    const { internalNotes, ...safeDoc } = doc;
    void internalNotes;

    return NextResponse.json(safeDoc);
  } catch {
    return NextResponse.json({ error: "Service request not found" }, { status: 404 });
  }
}

// PATCH /api/partner/service-requests/[id] — Partner can add docs/notes
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const partner = await getPartnerFromToken(req);
  if (!partner) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const payload = await getPayload({ config });

  try {
    // Verify ownership first
    const existing = await payload.findByID({
      collection: "service-requests",
      id,
      depth: 0,
      overrideAccess: true,
    });

    const existingPartnerId =
      typeof existing.partner === "object" && existing.partner !== null
        ? (existing.partner as { id: string }).id
        : existing.partner;

    if (existingPartnerId !== partner.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await req.json();

    // Partners can only update specific fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allowedUpdates: Record<string, any> = {};

    if (body.uploadedDocuments) {
      allowedUpdates.uploadedDocuments = body.uploadedDocuments;
    }
    if (body.specialInstructions !== undefined) {
      allowedUpdates.specialInstructions = body.specialInstructions;
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const doc = await payload.update({
      collection: "service-requests",
      id,
      data: allowedUpdates,
      overrideAccess: true,
    });

    return NextResponse.json({ success: true, doc });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
