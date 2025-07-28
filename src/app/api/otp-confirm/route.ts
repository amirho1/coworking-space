// import axiosInstance from "@/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_: NextRequest) {
  // const { username, code } = await request.json();

  // const response = await axiosInstance.post("/otp-confirm", { username, code });
  const response = {
    data: {
      success: true,
    },
  };

  return NextResponse.json(response.data);
}