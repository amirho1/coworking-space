import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";

export async function login(_: { error: string | null; success: boolean }, formData: FormData) {
  const data = formData.entries();

  // TODO: remove bellow two line for integration
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { error: null, success: true, datetime: Date.now() };

  const res = await axiosInstance.post(apiRoutes.login, data);

  if (res.status === 200) {
    return { error: null, success: true };
  }
}
