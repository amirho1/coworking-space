"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  revalidatePath("/", "layout");
  redirect("/account");
}
