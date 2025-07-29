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
  forgotPassword: "/auth/forgot-password",
  meetingRooms: "/dashboard/meeting-rooms",
};

export const frontRoutes = {
  otpConfirm: "/api/otp-confirm",
  register: "/api/register",
  login: "/api/login",
};

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string) {
  return /^09\d{9}$/.test(phone);
}

export function debounce(func: (...args: unknown[]) => unknown, delay: number = 1000) {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: unknown[]) => {
    clearTimeout(timeoutId as NodeJS.Timeout);
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

