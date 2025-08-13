import axiosInstance from "@/api";
import RoomCard from "@/components/RoomCard";
import apiRoutes from "@/lib/apiRoutes";

export interface MeetingRoom {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  attributes: string[];
  images: string[];
}

export default async function MeetingRoomsPage() {
  const rooms: MeetingRoom[] = (await axiosInstance.get(apiRoutes.meetingRooms)).data.data;

  return (
    <div className="space-y-6">
      {/* Room Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
