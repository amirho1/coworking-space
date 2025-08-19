import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { getToken } from "@/lib/token";
import { deleteAuthCookies, routes, setAuthCookies } from "@/lib/utils";
import { redirect } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function rotateTokens(req: NextRequest) {
  const { refreshToken } = await getToken();

  try {
    const res = NextResponse.next();
    const {
      data: {
        data: { accessToken: newToken, refreshToken: newRefresh },
      },
    } = await axiosInstance.post(apiRoutes.refreshToken, {
      refreshToken: refreshToken?.value,
    });

    setAuthCookies({ res, token: newToken, refreshToken: newRefresh });

    return res;
  } catch {
    const res = redirect(routes.login, req); // cookies will be mutated on success

    deleteAuthCookies(res);
    return res;
  }
}
