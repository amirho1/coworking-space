import RoomCard from "@/components/RoomCard";

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

export default function MeetingRoomsPage() {
  return (
    <div className="space-y-6">
      {/* Room Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetingRooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
