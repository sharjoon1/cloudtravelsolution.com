import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /partner/* routes (except /partner/login)
  if (pathname.startsWith("/partner") && pathname !== "/partner/login") {
    const token = req.cookies.get("partner-token")?.value;

    if (!token) {
      const loginUrl = new URL("/partner/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/partner/:path*"],
};
