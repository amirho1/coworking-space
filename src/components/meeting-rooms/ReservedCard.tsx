import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import randColor from "@/lib/randColor";

interface Data {
  name: string;
  start_time: number | string;
  end_time: number | string;
  date: string;
}
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
  objectData: Record<string, Data[]>;
}) {
  const currentDayReserves = objectData[currentDate];
  const regex = new RegExp(`${hourIndex >= 10 ? "" : 0}${hourIndex}:`);
  const reserves = currentDayReserves?.filter(({ start_time }) =>
    regex.test(start_time.toString())
  );
  if (!reserves?.length) return null;

  return reserves.map((reserve, index) => {
    const durationMinute = calcDurationMinute(
      reserve.start_time.toString(),
      reserve.end_time.toString()
    );

    const top = +reserve.start_time.toString().split(":")[1] >= 30 ? 30 : 0;

    return (
      reserve && (
        <div
          className={`flex absolute gap-4 border rounded   w-full z-10 right-0`}
          key={index}
          style={{ backgroundColor: randColor(), height: `${durationMinute}px`, top: `${top}px` }}
        >
          <Avatar className="w-4 h-4">
            <AvatarImage src="https://placehold.in/50x50@2x.png/white" />
            <AvatarFallback>
              <Icon icon="mdi:account" />
            </AvatarFallback>
          </Avatar>

          <span className="text-white">{reserve.name}</span>
        </div>
      )
    );
  });
}
