"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { validateEmail } from "@/lib/utils";
import axios from "axios";

interface OtpState {
  error: string | null;
  success: boolean;
  datetime: number | undefined;
}

export async function otp(_: OtpState, formData: FormData) {
  try {
    const res = await axiosInstance.post(apiRoutes.otp, {
      email: formData.get("email"),
      mobile: formData.get("mobile"),
    });
    if (res.status === 200) {
      const datetime = new Date(res.data.data.validUntil).getTime();
      return { error: null, success: true, datetime };
    }

    return { error: "Failed to send OTP", success: false, datetime: undefined };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "خطا در ارسال کد";
      return { error: errorMessage, success: false, datetime: undefined };
    }
    return { error, success: false, datetime: undefined };
  }
}

export interface OtpConfirmState {
  success: boolean;
  error: null | string;
}

export async function otpConfirm(_: OtpConfirmState, formData: FormData) {
  const email = formData.get("email") as string;
  const mobile = formData.get("mobile") as string;
  const otpCode = formData.get("otpCode") as string;
  const isEmail = validateEmail(email);

  const ob = isEmail ? { email } : { mobile };

  try {
    const res = await axiosInstance.post(apiRoutes.otpConfirm, {
      ...ob,
      otpCode,
    });

    if (res.data.isSuccess) {
      return { error: null, success: true };
    }


    return { error: res.data.message, success: false };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "خطا در تایید کد";
      return { error: errorMessage as string, success: false };
    }
    return { error: "خطا در تایید کد", success: false };
  }
}
