"use server";

import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";

interface State {
  error: string | null;
  success: boolean;
}

interface Data {
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
}

export async function reserve(state: State, data: Data) {
  try {
    await axiosInstance.post(apiRoutes.meetingRoomBook, data);

    return { error: null, success: true };
  } catch {
    return { error: "Server Error", success: false };
  }
}
