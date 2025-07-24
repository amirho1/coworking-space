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
