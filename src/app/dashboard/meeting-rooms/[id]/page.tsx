import MeetingRoomsPage from "@/components/meeting-rooms";
import { Reserve } from "@/types";
import { Metadata } from "next";
import { getReserves } from "./getReserves";
import { validDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "تقویم اتاق جلسات",
};

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] };
}) {
  const id = (await params).id;
  const searchParamDate = (await searchParams).date;

  const date = validDate(
    Array.isArray(searchParamDate) ? "" : searchParamDate ? searchParamDate : ""
  );

  if (!isNaN(+id)) metadata.title = `تقویم اتاق جلسات  ${id}`;

  const reserves: Reserve[] = await getReserves(date, id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">تقویم اتاق جلسه {id} </h1>
      <MeetingRoomsPage reserves={reserves} selectedDate={date} />
    </div>
  );
}
