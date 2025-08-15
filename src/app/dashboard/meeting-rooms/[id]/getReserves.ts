import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { getThisWeek } from "@/lib/week";
import { format } from "date-fns";

export async function getReserves(selectedDate: Date, id: string) {
  // Validate the date and get the week range
  const { dates } = getThisWeek(selectedDate);

  // Check if id is a valid number
  return !isNaN(+id)
    ? (
        await axiosInstance.get(apiRoutes.meetingRoom(id), {
          params: {
            startDate: format(dates[0], "yyyy-MM-dd"),
            endDate: format(dates[6], "yyyy-MM-dd"),
          },
        })
      ).data.data
    : [];
}
