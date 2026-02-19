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

// POST /api/partner/documents — Upload document
export async function POST(req: NextRequest) {
  const partner = await getPartnerFromToken(req);
  if (!partner) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const documentType = formData.get("documentType") as string;
    const description = formData.get("description") as string | null;
    const serviceRequestId = formData.get("serviceRequestId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!documentType) {
      return NextResponse.json(
        { error: "Document type is required" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be under 10MB" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // If linking to a service request, verify ownership
    if (serviceRequestId) {
      try {
        const sr = await payload.findByID({
          collection: "service-requests",
          id: serviceRequestId,
          depth: 0,
          overrideAccess: true,
        });
        const srPartnerId =
          typeof sr.partner === "object" && sr.partner !== null
            ? (sr.partner as { id: string }).id
            : sr.partner;
        if (srPartnerId !== partner.id) {
          return NextResponse.json({ error: "Not authorized" }, { status: 403 });
        }
      } catch {
        return NextResponse.json(
          { error: "Service request not found" },
          { status: 404 }
        );
      }
    }

    // Create document via Payload upload API
    const payloadFormData = new FormData();
    payloadFormData.append("file", file);
    payloadFormData.append("documentType", documentType);
    if (description) payloadFormData.append("description", description);
    payloadFormData.append("uploadedBy", partner.id);
    if (serviceRequestId) {
      payloadFormData.append("serviceRequest", serviceRequestId);
    }

    const token = req.cookies.get("partner-token")?.value;
    const uploadRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/documents`,
      {
        method: "POST",
        headers: { Authorization: `JWT ${token}` },
        body: payloadFormData,
      }
    );

    if (!uploadRes.ok) {
      const errData = await uploadRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: (errData as { message?: string }).message || "Upload failed" },
        { status: 500 }
      );
    }

    const doc = await uploadRes.json();

    // If linked to service request, add to its uploadedDocuments
    if (serviceRequestId && doc.doc?.id) {
      try {
        const sr = await payload.findByID({
          collection: "service-requests",
          id: serviceRequestId,
          depth: 0,
          overrideAccess: true,
        });
        const existingDocs = Array.isArray(sr.uploadedDocuments)
          ? sr.uploadedDocuments.map((d: string | { id: string }) =>
              typeof d === "object" ? d.id : d
            )
          : [];
        existingDocs.push(doc.doc.id);
        await payload.update({
          collection: "service-requests",
          id: serviceRequestId,
          data: { uploadedDocuments: existingDocs },
          overrideAccess: true,
        });
      } catch {
        // Non-critical, document is still created
      }
    }

    return NextResponse.json({ success: true, doc: doc.doc }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
