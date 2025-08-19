import { NextResponse, NextRequest } from "next/server";
import { authRoutes, deleteAuthCookies, routes } from "@/lib/utils";
import checkUserLogin from "@/api/checkUserLogin";
import { checkTokenExpiration } from "./lib/token";
import rotateTokens from "./middleware/refreshTokens";
import authorization from "./middleware/authorization";

/* ------------------------------------------------------------------ */
/* Small helpers — keep main flow readable                            */
/* ------------------------------------------------------------------ */
export const redirect = (to: string, req: NextRequest) =>
  NextResponse.redirect(new URL(to, req.url));
/* ------------------------------------------------------------------ */
/* Main middleware                                                    */
/* ------------------------------------------------------------------ */
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const { validRefreshT, validToken } = await checkTokenExpiration();

  /* --- 1. Refresh token gone: force logout ------------------------ */
  if (!validRefreshT) {
    const res = redirect(routes.login, req);
    deleteAuthCookies(res);
    return authRoutes.includes(path) ? NextResponse.next() : res;
  }

  /* --- 2. Access token expired: try to rotate --------------------- */
  if (!validToken) return rotateTokens(req);

  /* --- 3. Server-side sanity check ------------------------------- */
  try {
    await checkUserLogin();
  } catch {
    const res = redirect(routes.login, req);

    deleteAuthCookies(res);

    return res;
  }
  /* --- 4. Route guards when logged-in ----------------------------- */
  if (path === routes.home || authRoutes.includes(path)) {
    return redirect(routes.services, req);
  }
  /** --- 5. check user access */
  return authorization(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|favicon.svg|auth/logout|/*?$).*)",
  ],
};
