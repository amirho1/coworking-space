import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "occupied":
      return "bg-red-100 text-red-800";
    case "maintenance":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "موجود";
    case "occupied":
      return "اشغال شده";
    case "maintenance":
      return "تعمیرات";
    default:
      return "نامشخص";
  }
};

export default function RoomCard({ room }: { room: any }) {
  return (
    <Card key={room.id} className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{room.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {room.location}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(room.status)} variant="secondary">
            {getStatusText(room.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">ظرفیت:</span>
          <span className="font-medium">{room.capacity} نفر</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">موجودی بعدی:</span>
          <span className="font-medium">{room.nextBooking}</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">امکانات:</p>
          <div className="flex flex-wrap gap-1">
            {room.features.map((feature: string) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1" disabled={room.status !== "available"}>
            رزرو
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
