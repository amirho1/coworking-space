import axiosInstance from "@/api";

export default async function checkUserLogin() {
  const response = await axiosInstance.get("/account/profile");
  return response.data;
}
