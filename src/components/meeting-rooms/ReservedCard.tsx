import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import randColor from "@/lib/randColor";
import { Reserve } from "@/types";
import { useEffect, useState } from "react";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Card, CardContent } from "../ui/card";

function calcDurationMinute(start: string, end: string) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  return (endHour - startHour) * 60 + (endMinute - startMinute);
}

export interface ReservedCard extends Reserve {
  userName: string;
  hourIndex: number;
  currentDate: string;
  objectData: Record<string, Reserve[]>;
}

export default function ReservedCard({
  hourIndex,
  currentDate,
  objectData,
  userName,
  endTime,
  startTime,
  avatarUrl,
}: ReservedCard) {
  const currentDayReserves = objectData[currentDate];
  const regex = new RegExp(`${hourIndex >= 10 ? "" : 0}${hourIndex}:`);
  const reserves = currentDayReserves?.filter(({ startTime }) => regex.test(startTime.toString()));
  const [bg, setBg] = useState<undefined | string>(undefined);

  useEffect(() => {
    setBg(randColor());
  }, []);

  if (!reserves?.length || !bg) return null;

  const durationMinute = calcDurationMinute(startTime.toString(), endTime.toString());

  const top = +startTime.toString().split(":")[1] >= 30 ? 30 : 0;

  return (
    <Tooltip delayDuration={500}>
      <TooltipContent
        side="right"
        align="center"
        className="bg-black z-20  p-1 rounded-xs text-white "
      >
        {userName}
      </TooltipContent>
      <TooltipTrigger asChild>
        <Card
          className="absolute border rounded w-full z-10 right-0 p-1 hover:bg-gray-100 cursor-pointer "
          style={{
            backgroundColor: bg,
            height: `${durationMinute}px`,
            top: `${top}px`,
          }}
        >
          <div className="absolute left-0 top-0 w-full h-full bg-gray-300 opacity-50 z-20 hover:opacity-0"></div>
          <CardContent className="w-full h-full p-0 overflow-hidden flex justify-center items-center">
            <Avatar className="w-8 h-8 m-auto block">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                <Icon icon="mdi:account" />
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>
      </TooltipTrigger>
    </Tooltip>
  );
}
