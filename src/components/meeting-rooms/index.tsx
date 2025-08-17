"use client";
import { useEffect, useState } from "react";
import WeekCalendar from "./WeekCalendar";
import { Reserve } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { routes } from "@/lib/utils";
import { format } from "date-fns-jalali";
import ReserveForm from "./ReserveForm";

interface MeetingRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  reserves: Reserve[];
  selectedDate: Date;
}

export default function MeetingRoomPage({ reserves, selectedDate }: MeetingRoomProps) {
  const { id } = useParams();
  const router = useRouter();
  const [date, setDate] = useState(selectedDate);

  useEffect(() => {
    if (id && !Array.isArray(id)) router.push(routes.meetingRoom(id, format(date, "yyyy-MM-dd")));
  }, [date, id]);

  return (
    <div className="flex">
      <ReserveForm initialValue={selectedDate} onDateChange={setDate} />
      <WeekCalendar currentDate={date} reserves={reserves} />
    </div>
  );
}
