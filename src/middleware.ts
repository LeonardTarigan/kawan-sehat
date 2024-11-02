import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get("token"));
  const isAuthRoute = /^\/auth(\/|$)/.test(pathname);

  if (!hasToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (hasToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
