import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { setAuthCookies } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await axiosInstance.post(apiRoutes.login, body, {
      headers: { "Content-Type": "application/json" },
    });
    const { accessToken, refreshToken } = response.data.data;

    if (response) {
      const res = NextResponse.json({ success: true }, { status: 200 });

      setAuthCookies({
        res,
        token: accessToken,
        refreshToken,
      });

      return res;
    }

    return NextResponse.json({ error: "Invalid credentials", success: false }, { status: 401 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        stack: error.stack,
        case: error.cause,
        name: error.name,
      });
    } else {
      console.error("Unexpected error:", error);
    }

    return NextResponse.json(
      { error: (error as Error).message || "An error occurred", success: false },
      { status: 500 }
    );
  }
}
