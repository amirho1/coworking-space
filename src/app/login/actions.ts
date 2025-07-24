"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";

export async function otp(
  state: { error: string | null; success: boolean; datetime: string | undefined },
  formData: FormData
) {
  const data = formData.entries();

  // TODO: remove bellow two line for integration
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { error: null, success: true, datetime: Date.now() };

  const res = await axiosInstance.post(apiRoutes.otp, data);

  if (res.status === 200) {
    return { error: null, success: true, datetime: res.data.datetime };
  }

  return { error: "Failed to send OTP", success: false, datetime: undefined };
}
