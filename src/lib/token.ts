"use server";
import * as jose from "jose";
import { cookies } from "next/headers";
import { checkExpiration } from "./utils";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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
