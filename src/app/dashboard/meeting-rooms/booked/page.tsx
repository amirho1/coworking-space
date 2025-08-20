import axiosInstance from "@/api";
import AutomateTable, { RenderItemProps } from "@/components/AutomateTable";
import { PaginationComponent } from "@/components/pagination";
import apiRoutes from "@/lib/apiRoutes";
import { routes } from "@/lib/utils";

export interface MeetingRoomReserve {
  id: number;
  roomName: string;
  bookingDate: string;
  persianDate: string;
  startTime: string;
  endTime: string;
  bookingStatus: number;
  bookingStatusTitle: string;
}

type column =
  | "id"
  | "roomName"
  | "bookingDate"
  | "persianDate"
  | "startTime"
  | "endTime"
  | "bookingStatusTitle";

const sort: column[] = [
  "id",
  "roomName",
  "bookingDate",
  "persianDate",
  "startTime",
  "endTime",
  "bookingStatusTitle",
];

const heads = [
  "شناسه",
  "نام اتاق",
  "تاریخ رزرو",
  "تاریخ شمسی",
  "زمان شروع",
  "زمان پایان",
  "عنوان وضعیت رزرو",
];

export default async function Personal({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const pageSize = 10;

  let res: {
    data: MeetingRoomReserve[];
    count: number;
    isSuccess: boolean;
    message: string;
  } = { data: [], count: 0, isSuccess: false, message: "" };
  try {
    res = (
      await axiosInstance.get(apiRoutes.personalBookings, {
        params: { pageNumber: page, size: pageSize },
      })
    ).data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <AutomateTable sort={sort} heads={heads} data={res.data} />
      <PaginationComponent
        count={res?.count}
        pageSize={pageSize}
        url={routes.bookedMeetingRooms}
        currentPage={+page || 1}
      />
    </div>
  );
}
