import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/"]; // routes accessible by everyone
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify",
]; // routes only for guests
const protectedRoutes = [
  "/settings",
  "/profile",
  "/server",
  "/client",
  "/admin",
]; // routes only for logged-in users

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;
  // 1. If route is public, allow
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. If route is protected but user not logged in → redirect to login
  if (protectedRoutes.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. If route is auth-only (login/register) but user already logged in → redirect to settings
  if (authRoutes.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // 4. Default → allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
