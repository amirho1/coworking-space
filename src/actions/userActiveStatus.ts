"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { AxiosError } from "axios";

export interface DeactivateState {
  error: null | string | Error;
  success: boolean;
}

export async function userActiveStatus(state: DeactivateState, formDate: FormData) {
  const userId = formDate.get("id");
  const isActive = formDate.get("isActive");

  try {
    if (userId) {
      console.log(
        (
          await axiosInstance.patch(apiRoutes.activeStatus(+userId), {
            isActive: isActive === "1",
          })
        ).data
      );

      return { error: null, success: true };
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) return { error: "error", success: false };
  }

  return { error: null, success: true };
}
