import { NextRequest, NextResponse } from "next/server";

const SITE_PASSWORD = "boomerang2026";
const COOKIE_NAME = "site-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip password check for the password page itself, static assets, and API routes
  if (
    pathname === "/password" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === SITE_PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = "/password";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
