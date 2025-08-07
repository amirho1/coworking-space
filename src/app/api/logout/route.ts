"use server";

import { deleteAuthCookies } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  deleteAuthCookies(response);

  return response;
}
