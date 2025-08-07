"use server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { checkExpiration } from "./utils";
import { RequestCookie, ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { config } from "./config";
import { NextResponse } from "next/server";

export async function getToken() {
  const cookieStore = await cookies();

  const token = cookieStore.get("Authorization");
  const refreshToken = cookieStore.get("refresh_token");

  return { token, refreshToken };
}

interface Return {
  validRefreshT: boolean;
  validToken: boolean;
}

export async function checkTokenExpiration(): Promise<Return> {
  const { token, refreshToken } = await getToken();

  const decodeExp = (jwt?: RequestCookie) => {
    if (!jwt) return false;
    try {
      const { exp } = jose.decodeJwt(jwt.value.includes(" ") ? jwt.value.split(" ")[1] : jwt.value);
      return checkExpiration(exp);
    } catch {
      return false;
    }
  };

  const validRefreshT = decodeExp(refreshToken);
  const validToken = decodeExp(token);

  return { validRefreshT, validToken };
}

const secure = config.env === "production";

const cookieConfigs: Partial<ResponseCookie> = {
  httpOnly: true,
  secure,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  sameSite: "lax",
  domain: config.env === "production" ? (config.frontendUrl || "").split("://")[1] : undefined,
};

interface SetAuthCookiesParams {
  res: NextResponse;
  token: string;
  refreshToken: string;
}

export function setAuthCookies({ res, token, refreshToken }: SetAuthCookiesParams) {
  res.cookies.set("Authorization", `Bearer ${token}` as string, cookieConfigs);
  res.cookies.set("refresh_token", `Bearer ${refreshToken}` as string, cookieConfigs);
}
