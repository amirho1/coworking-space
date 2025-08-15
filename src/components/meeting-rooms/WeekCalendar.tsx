"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, persianWeekDays } from "@/lib/utils";
import { getThisWeek } from "@/lib/week";
import { useMemo } from "react";
import ReservedCard from "./ReservedCard";
import { Reserve } from "@/types";

interface ObjectDate {
  [key: string]: Reserve[];
}

export default function WeekCalendar({
  currentDate,
  reserves,
}: {
  currentDate?: Date;
  reserves: Reserve[];
}) {
  const weekDayIndex = new Date().getDay() + 1;
  const hours = Array(24).fill(getThisWeek(currentDate, -1, "ymd").dates);

  const objectData: ObjectDate = useMemo(
    () =>
      reserves.reduce<ObjectDate>((obj, data) => {
        if (obj[data.bookingDate]) {
          obj[data.bookingDate].push(data);
        } else obj[data.bookingDate] = [data];
        return obj;
      }, {}),
    [reserves]
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {persianWeekDays.map((day, index) => (
            <TableHead
              className={cn(
                "text-start",
                weekDayIndex + 1 === index ? "bg-muted" : "bg-transparent"
              )}
              key={day}
            >
              {day}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {hours.map((hour, i) => (
          <TableRow key={i} className="p-0 relative">
            <TableCell className="w-[40px] border-l">{`${i < 10 ? `0${i}` : i}:00`}</TableCell>
            {hour.map((currentDate: string, index: number) => {
              return (
                <TableCell key={index} className="p-0">
                  <div
                    className={cn(
                      "h-[60px] p-[3px] flex flex-col justify-between border-l relative min-w-28",
                      weekDayIndex === index ? "bg-muted" : "bg-transparent"
                    )}
                  >
                    <ReservedCard currentDate={currentDate} hourIndex={i} objectData={objectData} />
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
