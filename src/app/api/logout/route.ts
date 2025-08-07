"use server";

import { config } from "@/lib/config";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set({
    name: "Authorization",
    value: "",
    path: "/",
    expires: new Date(0), // Forces immediate expiry
    httpOnly: true,
    domain: config.env === "production" ? (config.frontendUrl || "").split("://")[1] : undefined,
  });

  return response;
}
