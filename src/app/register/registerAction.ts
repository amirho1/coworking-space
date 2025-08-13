"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import axios from "axios";

interface RegisterFormState {
  error: string | null;
  success: boolean;
}

export async function register(
  state: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const res = await axiosInstance.post(apiRoutes.register, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.errorCode) {
      return { error: res.data.errors, success: false };
    }

    return { error: null, success: true };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.errors || "خطا در ثبت نام", success: false };
    }
    return { error: "خطای ناشناخته", success: false };
  }
}
