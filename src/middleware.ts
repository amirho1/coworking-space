import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, routes } from "@/lib/utils";
import checkUserLogin from "@/api/checkUserLogin";

export async function middleware(request: NextRequest) {
  const authCookie = request.headers.get("Authorization");
  if (!authCookie) {
    // If the user is not logged in, redirect to the login page

    if (authRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(routes.login, request.url));
  }

  try {
    await checkUserLogin();
  } catch (error) {
    // If the user is not logged in, redirect to the login page
    const res = NextResponse.redirect(new URL(routes.login, request.url));
    res.headers.delete("Authorization");
    return res;
  }

  if (request.nextUrl.pathname === routes.home) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }

  //  If the user is logged in and tries to access the login or sign-up page, redirect to the home page
  if (authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|favicon.svg|auth/logout|/*?$).*)",
  ],
};
