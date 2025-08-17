import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";
import { convertJalaliISOToGregory, parseYmdWithZeroMonth } from "@/lib/utils";
import { getThisWeek } from "@/lib/week";

export type ISOArray = [number, number, number];

export async function getReserves(selectedDate: Date, id: string) {
  // Validate the date and get the week range
  const { dates } = getThisWeek(selectedDate, -1, "ymd");

  const ISOStartAsArray = parseYmdWithZeroMonth(dates[0]);
  const ISOEndAsArray = parseYmdWithZeroMonth(dates[6]);

  async function fetchData(start: ISOArray, end: ISOArray) {
    const startDate = convertJalaliISOToGregory(start);
    const endDate = convertJalaliISOToGregory(end);
    
    try {
      return (
        await axiosInstance.get(apiRoutes.meetingRoom(id), {
          params: {
            startDate,
            endDate,
          },
        })
      ).data?.data;
    } catch {
      return [];
    }
  }

  // Check if id is a valid number
  return !isNaN(+id) && ISOStartAsArray.length && ISOEndAsArray.length
    ? fetchData(ISOStartAsArray, ISOEndAsArray)
    : [];
}
