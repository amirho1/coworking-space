"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";

interface RegisterFormState {
  error: string | null;
  success: boolean;
}

export async function register(
  state: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const res = await axiosInstance.post(apiRoutes.register, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { error: null, success: res.data.success };
}
