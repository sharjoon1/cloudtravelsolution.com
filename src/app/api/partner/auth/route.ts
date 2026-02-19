import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

const COOKIE_NAME = "partner-token";

// POST /api/partner/auth — Partner login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    const result = await payload.login({
      collection: "partners",
      data: { email, password },
    });

    if (!result.token || !result.user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check partner status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const partner = result.user as any;
    if (partner.status !== "active") {
      return NextResponse.json(
        { error: "Your account is not active. Please contact support." },
        { status: 403 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: partner.id,
        companyName: partner.companyName,
        contactPerson: partner.contactPerson,
        email: partner.email,
        partnerCode: partner.partnerCode,
        type: partner.type,
      },
    });

    // Set httpOnly cookie
    response.cookies.set(COOKIE_NAME, result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication failed";
    // Payload throws on invalid credentials
    if (message.includes("locked") || message.includes("attempts")) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
}

// GET /api/partner/auth — Validate session / get current partner
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await getPayload({ config });

    // Verify token by finding partner with headers
    const { docs } = await payload.find({
      collection: "partners",
      limit: 1,
      depth: 0,
      overrideAccess: false,
      user: undefined,
    });

    // Instead, use the JWT to verify
    const headers = new Headers();
    headers.set("Authorization", `JWT ${token}`);

    // Use payload's built-in auth verification
    const meReq = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/partners/me`,
      { headers }
    );

    if (!meReq.ok) {
      const response = NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      );
      response.cookies.delete(COOKIE_NAME);
      return response;
    }

    const meData = await meReq.json();
    void docs; // consumed above for type safety

    return NextResponse.json({
      success: true,
      user: {
        id: meData.user?.id,
        companyName: meData.user?.companyName,
        contactPerson: meData.user?.contactPerson,
        email: meData.user?.email,
        partnerCode: meData.user?.partnerCode,
        type: meData.user?.type,
      },
    });
  } catch {
    return NextResponse.json({ error: "Session invalid" }, { status: 401 });
  }
}

// DELETE /api/partner/auth — Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
