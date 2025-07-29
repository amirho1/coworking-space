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
import { format } from "date-fns-jalali";
import { useMemo } from "react";
import ReservedCard from "./ReservedCard";

interface Data {
  name: string;
  start_time: number | string;
  end_time: number | string;
  date: string;
}

const mockData = [
  {
    name: "امیری حسین",
    start_time: "14:00",
    end_time: "20:00",
    date: format(new Date(), "yyyy-MM-dd"),
  },
  {
    name: "امیری حسین",
    start_time: "08:00",
    end_time: "08:30",
    date: format(new Date(), "yyyy-MM-dd"),
  },
  {
    name: "امیری حسین",
    start_time: "08:30",
    end_time: "09:30",
    date: format(new Date(), "yyyy-MM-dd"),
  },
  { name: "امیری حسین", start_time: "09:00", end_time: "9:30", date: "1404-05-08" },
];

interface ObjectDate {
  [key: string]: Data[];
}

export default function WeekCalendar({ currentDate }: { currentDate?: Date }) {
  const weekDayIndex = new Date().getDay() + 1;
  const hours = Array(24).fill(getThisWeek(currentDate, -1, "ymd").dates);

  const objectData: ObjectDate = useMemo(
    () =>
      mockData.reduce((obj, data) => {
        if (obj[data.date]) {
          obj[data.date].push(data);
        } else obj[data.date] = [data];
        return obj;
      }, {}),
    [mockData]
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
