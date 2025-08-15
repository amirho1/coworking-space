import { clsx, type ClassValue } from "clsx";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";
import { config } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  settings: "/settings",
  profile: "/dashboard/profile",
  invoices: "/dashboard/invoices",
  services: "/dashboard/services",
  forgotPassword: "/auth/forgot-password",
  meetingRooms: "/dashboard/meeting-rooms",
  users: "/dashboard/users",
  userDetails: (id: number) => `/dashboard/users/${id}`,
  userMeetingRooms: (id: number) => `/dashboard/users/meeting-rooms/${id}`,
  userServices: (id: number) => `/dashboard/users/services/${id}`,
};

export const frontAPIs = {
  otpConfirm: "/api/otp-confirm",
  register: "/api/register",
  login: "/api/login",
  logout: "/api/logout",
};

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string) {
  return /^09\d{9}$/.test(phone);
}

export function debounce(func: (...args: any[]) => any, delay: number = 1000) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export const authRoutes = [routes.login, routes.register];

export const persianWeekDays = [
  "ساعت",
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export function checkExpiration(timeSecond?: number) {
  return timeSecond !== undefined && Date.now() / 1000 < timeSecond;
}

interface SetAuthCookiesParams {
  res: NextResponse;
  token: string;
  refreshToken: string;
}

const secure = config.env === "production";

const cookieConfigs: Partial<ResponseCookie> = {
  httpOnly: true,
  secure,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  sameSite: "lax",
  domain: config.env === "production" ? (config.frontendUrl || "").split("://")[1] : undefined,
};

export function setAuthCookies({ res, token, refreshToken }: SetAuthCookiesParams) {
  res.cookies.set("Authorization", `Bearer ${token}` as string, cookieConfigs);
  res.cookies.set("refresh_token", `Bearer ${refreshToken}` as string, cookieConfigs);
}

export function deleteAuthCookies(res: NextResponse) {
  res.cookies.delete("Authorization");
  res.cookies.delete("refresh_token");
}

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
