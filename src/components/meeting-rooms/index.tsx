"use client";
import { useState } from "react";
import { Calendar } from "../ui/Calendar";
import WeekCalendar from "./WeekCalendar";
import { Button } from "../ui/button";

const today = new Date();

export default function Index() {
  const [currentDate, setCurrentDate] = useState(today);
  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="flex">
      <div className="border-l w-[350px] p-4">
        <Calendar
          mode="single"
          selected={today}
          onDayClick={handleDateChange}
        />

        <Button className="w-full">رزرو اتاق جلسه</Button>
      </div>
      <WeekCalendar currentDate={currentDate} />
    </div>
  );
}
