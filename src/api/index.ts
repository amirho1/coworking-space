"use server";

import { config } from "@/lib/config";
import { getToken } from "@/lib/token";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config?.backApiUrl,
});

axiosInstance.interceptors.request.use(async config => {
  const { token, refreshToken } = await getToken();
  config.headers.Authorization = token?.value;
  config.headers.refresh_token = refreshToken?.value;
  return config;
});

export default axiosInstance;
