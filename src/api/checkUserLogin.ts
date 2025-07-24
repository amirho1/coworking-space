import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";

export default async function checkUserLogin() {
  const response = await axiosInstance.get(apiRoutes.profile);
  return response.data;
}
