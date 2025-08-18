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
import { format } from "date-fns-jalali";

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
      reserves?.reduce<ObjectDate>((obj, data) => {
        const persianISO = format(data.bookingDate, "yyyy-MM-dd");
        if (obj[persianISO]) {
          obj[persianISO].push(data);
        } else obj[persianISO] = [data];
        return obj;
      }, {}),
    [reserves]
  );

  return (
    <Table containerProps={{ className: "h-full overflow-auto w-full relative" }}>
      <TableHeader className="sticky bg-gray-100 z-30">
        <TableRow>
          {persianWeekDays.map((day, index) => (
            <TableHead
              className={cn(
                "text-start pl-1 sticky top-0 bg-gray-100 z-30",
                index === 0 ? "min-w-[50px]" : "min-w-28"
              )}
              key={day}
            >
              {day}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {hours.map((hour, hourIndex) => (
          <TableRow key={hourIndex} className="p-0 relative">
            <TableCell className="w-[40px] border-l">{`${
              hourIndex < 10 ? `0${hourIndex}` : hourIndex
            }:00`}</TableCell>
            {hour.map((currentDate: string, index: number) => {
              const currentDayReserves = objectData[currentDate];
              const regex = new RegExp(`${hourIndex >= 10 ? "" : 0}${hourIndex}:`);
              const reserves = currentDayReserves?.filter(({ startTime }) =>
                regex.test(startTime.toString())
              );

              return (
                <TableCell key={index} className="p-0">
                  <div
                    className={cn(
                      "h-[60px] p-[3px] flex flex-col justify-between border-l relative min-w-28",
                      weekDayIndex === index ? "bg-muted" : "bg-transparent"
                    )}
                  >
                    {reserves?.map(reserve => (
                      <ReservedCard
                        currentDate={currentDate}
                        hourIndex={hourIndex}
                        objectData={objectData}
                        key={reserve.id}
                        {...reserve}
                      />
                    ))}
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
