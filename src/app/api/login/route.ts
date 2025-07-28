import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  await new Promise(resolve => setTimeout(resolve, 1000));
  return NextResponse.json({
    message: "Login successful",
  });

  const response = await axiosInstance.post(apiRoutes.login, {
    username,
    password,
  });

  return NextResponse.json(response.data);
}
