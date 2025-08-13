import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { routes } from "@/lib/utils";
import { MeetingRoom } from "@/app/dashboard/meeting-rooms/page";
import MeetingCarousel from "./meeting-rooms/Carousel";

export default function RoomCard({ room }: { room: MeetingRoom }) {
  const capacity = room.attributes.find(attr => /\d - \d/.test(attr));

  return (
    <Card key={room.id} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{room.name}</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-green-500 text-white">
            {room.isActive ? "فعال" : "غیرفعال"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <MeetingCarousel list={room.images} />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">ظرفیت:</span>
          <span className="font-medium">{capacity} نفر</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">امکانات:</p>
          <div className="flex flex-wrap gap-1">
            {room.attributes.map((feature: string) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full" disabled={!room.isActive}>
          <Link href={`${routes.meetingRooms}/${room.id}`} className="w-full">
            رزرو
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
