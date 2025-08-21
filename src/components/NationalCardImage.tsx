import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

interface NationalCardImageProps {
  firstName: string;
  lastName: string;
  nationalCode: string;
}

export default function NationalCardImage({
  firstName,
  lastName,
  nationalCode,
}: NationalCardImageProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Icon icon="mdi:card-account-details" className="w-5 h-5" />
        کارت ملی
      </h3>
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="relative group">
          <Image
            src="/placeholder.svg"
            // src={nationalCardImage || "/placeholder.svg"}
            alt="کارت ملی"
            className="w-full h-32 object-cover rounded-md border-2 border-gray-200 cursor-pointer transition-opacity group-hover:opacity-80"
            height={123}
            width={120}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="absolute inset-0 m-auto w-fit h-fit opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon icon="mdi:eye" className="w-4 h-4 mr-2" />
                مشاهده در اندازه کامل
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  کارت ملی - {firstName} {lastName}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Image
                  // src={nationalCardImage || "/placeholder.svg"}
                  src="/placeholder.svg"
                  alt="کارت ملی (اندازه کامل)"
                  className="w-full h-auto rounded-md border"
                />
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>کد ملی:</strong> {nationalCode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>وضعیت تایید:</strong> <span className="text-green-600">تایید شده</span>
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-xs text-gray-500 mt-2">برای مشاهده اندازه کامل کلیک کنید</p>
      </div>
    </div>
  );
}
