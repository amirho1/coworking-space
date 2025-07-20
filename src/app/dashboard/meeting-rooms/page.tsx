import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Clock, Plus, Calendar, MapPin } from "lucide-react";

// Mock data - replace with real data from your backend
const meetingRooms = [
  {
    id: 1,
    name: "اتاق کنفرانس الف",
    capacity: 12,
    location: "طبقه 1",
    features: ["پروژکتور", "تخته سفید", "ویدیو کنفرانس"],
    status: "available",
    nextBooking: "14:00",
    image: "",
  },
  {
    id: 2,
    name: "اتاق جلسه ب",
    capacity: 6,
    location: "طبقه 1",
    features: ["تلویزیون", "تخته سفید"],
    status: "occupied",
    nextBooking: "همین حالا موجود",
    image: "",
  },
  {
    id: 3,
    name: "اتاق هیئت مدیره",
    capacity: 20,
    location: "طبقه 2",
    features: ["پروژکتور", "ویدیو کنفرانس", "سرویس پذیرایی"],
    status: "available",
    nextBooking: "16:00",
    image: "",
  },
  {
    id: 4,
    name: "اتاق کوچک 1",
    capacity: 4,
    location: "طبقه 1",
    features: ["تلویزیون"],
    status: "available",
    nextBooking: "همین حالا موجود",
    image: "",
  },
  {
    id: 5,
    name: "اتاق آموزش",
    capacity: 15,
    location: "طبقه 2",
    features: ["پروژکتور", "تخته سفید", "سیستم صوتی"],
    status: "maintenance",
    nextBooking: "فردا",
    image: "",
  },
  {
    id: 6,
    name: "کابین تلفن 1",
    capacity: 1,
    location: "طبقه 1",
    features: ["فضای آرام"],
    status: "available",
    nextBooking: "همین حالا موجود",
    image: "",
  },
];

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

export default function MeetingRoomsPage() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">اتاق‌های جلسه</h1>
          <p className="text-muted-foreground">مشاهده و رزرو فضاهای جلسه موجود</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            مشاهده تقویم
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            رزرو اتاق
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل اتاق‌ها</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meetingRooms.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">موجود هم‌اکنون</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {meetingRooms.filter(room => room.status === "available").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ظرفیت کل</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {meetingRooms.reduce((sum, room) => sum + room.capacity, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetingRooms.map(room => (
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
                  {room.features.map(feature => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={room.status !== "available"}
                >
                  جزئیات
                </Button>
                <Button size="sm" className="flex-1" disabled={room.status !== "available"}>
                  رزرو
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
