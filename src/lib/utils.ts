import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
