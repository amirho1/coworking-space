import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authRoutes, routes } from "@/lib/utils";
import checkUserLogin from "@/api/checkUserLogin";
import { checkTokenExpiration, getToken, setAuthCookies } from "./lib/token";
import axiosInstance from "./api";
import apiRoutes from "./lib/apiRoutes";

function deleteAuthCookies(res: NextResponse) {
  res.cookies.delete("Authorization");
  res.cookies.delete("refresh_token");
}

export async function middleware(request: NextRequest) {
  const { validRefreshT, validToken } = await checkTokenExpiration();

  if (!validToken || !validRefreshT) {
    const res = NextResponse.redirect(new URL(routes.login, request.url));

    if (!validRefreshT) {
      deleteAuthCookies(res);
    }

    if (!validToken && validRefreshT) {
      const { refreshToken } = await getToken();
      try {
        const refreshTokenRes = await axiosInstance.post(apiRoutes.refreshToken, {
          refreshToken: refreshToken?.value,
        });

        const newRefresh = refreshTokenRes.data.data.refreshToken;
        const newToken = refreshTokenRes.data.data.refreshToken;

        setAuthCookies({
          res,
          token: newToken,
          refreshToken: newRefresh,
        });

        if (authRoutes.includes(request.nextUrl.pathname)) {
          return NextResponse.next();
        }

        return res;
      } catch {
        deleteAuthCookies(res);
        return NextResponse.redirect(new URL(routes.login, request.url));
      }
    }

    try {
      await checkUserLogin();
    } catch (error) {
      console.error(error);

      const res = NextResponse.redirect(new URL(routes.login, request.url));

      return res;
    }

    if (request.nextUrl.pathname === routes.home) {
      return NextResponse.redirect(new URL(routes.services, request.url));
    } else if (authRoutes.includes(request.nextUrl.pathname)) {
      //  If the user is logged in and tries to access the login or sign-up page, redirect to the home page
      return NextResponse.redirect(new URL(routes.services, request.url));
    }

    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|favicon.svg|auth/logout|/*?$).*)",
  ],
};
