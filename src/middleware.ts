import { NextResponse, NextRequest } from "next/server";
import { authRoutes, deleteAuthCookies, routes, setAuthCookies } from "@/lib/utils";
import checkUserLogin from "@/api/checkUserLogin";
import { checkTokenExpiration, getToken } from "./lib/token";
import axiosInstance from "./api";
import apiRoutes from "./lib/apiRoutes";

/* ------------------------------------------------------------------ */
/* Small helpers — keep main flow readable                            */
/* ------------------------------------------------------------------ */
const redirect = (to: string, req: NextRequest) => NextResponse.redirect(new URL(to, req.url));

async function rotateTokens(req: NextRequest) {
  const { refreshToken } = await getToken();
  const res = NextResponse.next(); // cookies will be mutated on success

  try {
    const {
      data: {
        data: { token: newToken, refreshToken: newRefresh },
      },
    } = await axiosInstance.post(apiRoutes.refreshToken, {
      refreshToken: refreshToken?.value,
    });

    setAuthCookies({ res, token: newToken, refreshToken: newRefresh });

    return res;
  } catch {
    deleteAuthCookies(res);
    return redirect(routes.login, req);
  }
}

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
    return redirect(routes.login, req);
  }

  /* --- 4. Route guards when logged-in ----------------------------- */
  if (path === routes.home || authRoutes.includes(path)) {
    return redirect(routes.services, req);
  }

  /* --- 5. All good ------------------------------------------------ */
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|favicon.svg|auth/logout|/*?$).*)",
  ],
};
