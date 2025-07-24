"use server";
import { headers } from "next/headers";

export async function getToken() {
  const cookieStore = await headers();
  const token = cookieStore.get("Authorization");
  return token;
}
