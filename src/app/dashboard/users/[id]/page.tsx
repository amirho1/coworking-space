import axiosInstance from "@/api";
import UserDetails from "@/components/UserDetails";
import apiRoutes from "@/lib/apiRoutes";
import { User } from "../page";
import { AxiosError } from "axios";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let user: undefined | User;

  if (!isNaN(+id)) {
    try {
      const res = await axiosInstance.get(apiRoutes.user(id));
      user = res.data.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) console.log(error.response?.data);
    }
  }

  if (user) return <UserDetails {...user} />;
  return "Not Found";
}
