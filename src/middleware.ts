import { NextRequest, NextResponse } from "next/server";

const SESSION_TOKEN = process.env.SESSION_TOKEN || "auth-ok-91f3c2";
const COOKIE_NAME = "site-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the password page, the auth API, static/_next assets, and any public file (images, fonts, etc.)
  const isPublicFile = /\.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|otf|mp4|webm|pdf)$/i.test(pathname);
  if (
    pathname === "/password" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    isPublicFile
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === SESSION_TOKEN) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to password page
  const url = request.nextUrl.clone();
  url.pathname = "/password";
  return NextResponse.redirect(url);
}

export const config = {
  // Run middleware on all paths EXCEPT all Next.js internals (including HMR/turbopack websocket).
  // The previous matcher only excluded _next/static and _next/image, which caused middleware to
  // intercept the HMR socket and redirect it to /password — killing hot reload until a full restart.
  matcher: ["/((?!_next|api/auth).*)"],
};
