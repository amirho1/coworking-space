import UserDetails, { UserDetailsProps } from "@/components/UserDetails";
// TODO when the API is ready, uncomment the following lines to fetch user details
// import axiosInstance from "@/api";
// import apiRoutes from "@/lib/apiRoutes";

const user: UserDetailsProps = {
  id: "USR-2024-001",
  firstName: "جان",
  lastName: "دو",
  email: "john.doe@example.com",
  role: "مدیر",
  nationalCode: "1234567890",
  status: "active",
  avatar: "/placeholder.svg?height=120&width=120",
  nationalCardImage: "/placeholder.svg?height=300&width=500",
};
export default async function page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  // TODO when the API is ready, uncomment the following lines to fetch user details
  // const { id } = await searchParams;

  // const user = await axiosInstance.get(`${apiRoutes.profile}/${id}`);

  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay

  return <UserDetails {...user} />;
}
