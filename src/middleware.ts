import { routes } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // update user's auth session
  const { pathname, origin } = request.nextUrl;
  const regex = /^\/$/;
  if (regex.test(pathname)) return NextResponse.redirect(`${origin}${routes.dashboard}`);

  return NextResponse.next();
}



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
