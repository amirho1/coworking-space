"use server";

import { config } from "@/lib/config";
import { getToken } from "@/lib/getToken";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config?.backApiUrl,
});

axiosInstance.interceptors.request.use(async config => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
