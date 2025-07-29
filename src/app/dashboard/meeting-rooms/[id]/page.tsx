import MeetingRoomsPage from "@/components/meeting-rooms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تقویم اتاق جلسات",
};

export default async function page({ params }: { params: { id: string } }) {
  const id = await params.id;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">تقویم اتاق جلسه {id}</h1>
      <MeetingRoomsPage />
    </div>
  );
}
