"use client";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/Calendar";
import WeekCalendar from "./WeekCalendar";
import { Button } from "../ui/button";
import { Reserve } from "@/types";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/utils";
import { format } from "date-fns";

interface MeetingRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  reserves: Reserve[];
  selectedDate: Date;
}

export default function MeetingRoomPage({ reserves, selectedDate }: MeetingRoomProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const router = useRouter();

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  useEffect(() => {
    router.push(routes.meetingRoom(1, format(currentDate, "yyyy-MM-dd")));
  }, [currentDate]);

  return (
    <div className="flex">
      <div className="border-l w-[350px] p-4">
        <Calendar mode="single" selected={currentDate} onDayClick={handleDateChange} />

        <Button className="w-full">رزرو اتاق جلسه</Button>
      </div>
      <WeekCalendar currentDate={currentDate} reserves={reserves} />
    </div>
  );
}
