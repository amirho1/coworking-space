"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
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
  try {
    const data = Object.fromEntries(formData.entries());
    const res = await axiosInstance.post(apiRoutes.otpConfirm, data);

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
