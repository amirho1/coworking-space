import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import randColor from "@/lib/randColor";
import { Reserve } from "@/types";
import { useEffect, useState } from "react";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

function calcDurationMinute(start: string, end: string) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  return (endHour - startHour) * 60 + (endMinute - startMinute);
}

export default function ReservedCard({
  hourIndex,
  currentDate,
  objectData,
}: {
  hourIndex: number;
  currentDate: string;
  objectData: Record<string, Reserve[]>;
}) {
  const currentDayReserves = objectData[currentDate];
  const regex = new RegExp(`${hourIndex >= 10 ? "" : 0}${hourIndex}:`);
  const reserves = currentDayReserves?.filter(({ startTime }) => regex.test(startTime.toString()));
  const [bg, setBg] = useState<undefined | string>(undefined);

  useEffect(() => {
    setBg(randColor());
  }, []);

  if (!reserves?.length || !bg) return null;

  return reserves?.map((reserve, index) => {
    const durationMinute = calcDurationMinute(
      reserve.startTime.toString(),
      reserve.endTime.toString()
    );

    const top = +reserve.startTime.toString().split(":")[1] >= 30 ? 30 : 0;

    return (
      reserve && (
        <div
          className="flex items-center absolute gap-2 border rounded w-full z-10 right-0 p-2"
          key={index}
          style={{
            backgroundColor: bg,
            height: `${durationMinute}px`,
            top: `${top}px`,
          }}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://placehold.in/50x50@2x.png/white" />
            <AvatarFallback>
              <Icon icon="mdi:account" />
            </AvatarFallback>
          </Avatar>

          <Tooltip delayDuration={500}>
            <TooltipContent
              side="right"
              align="center"
              className="bg-black  p-1 rounded-lg text-white "
            >
              {reserve.userName}
            </TooltipContent>
            <TooltipTrigger asChild>
              <span className="text-white text-ellipsis h-fit  overflow-hidden text-left ">
                {reserve.userName}
              </span>
            </TooltipTrigger>
          </Tooltip>
        </div>
      )
    );
  });
}
