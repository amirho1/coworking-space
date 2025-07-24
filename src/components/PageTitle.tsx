"use client";
import { usePathname } from "next/navigation";
import React from "react";

const titles = {
  dashboard: "داشبورد",
  "meeting-rooms": "اتاق جلسات",
  services: "سرویس ها",
  invoices: "صورتحساب ها",
};

export default function PageTitle() {
  const pathname = usePathname();
  return (
    <h1 className="text-base font-medium">
      {titles[pathname.split("/").pop() as keyof typeof titles]}
    </h1>
  );
}
