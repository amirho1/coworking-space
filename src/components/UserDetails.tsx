"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";

export interface UserDetailsProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  nationalCode: string;
  status: "active" | "inactive";
  avatar?: string;
  nationalCardImage?: string;
}

export default function UserDetails({
  id,
  firstName,
  lastName,
  email,
  role,
  nationalCode,
  status,
  avatar,
  nationalCardImage,
}: UserDetailsProps) {
  const handleStatusToggle = () => {
    // Handle status toggle logic here
    console.log(`تغییر وضعیت کاربر از ${status} به ${status === "active" ? "inactive" : "active"}`);
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
        <Icon icon="mdi:pulse" className="w-3 h-3 mr-1" />
        فعال
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
        <Icon icon="mdi:account-off" className="w-3 h-3 mr-1" />
        غیرفعال
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      Admin: "bg-purple-100 text-purple-800",
      Manager: "bg-blue-100 text-blue-800",
      User: "bg-gray-100 text-gray-800",
      Editor: "bg-orange-100 text-orange-800",
    };

    const roleLabels: Record<string, string> = {
      Admin: "مدیر کل",
      Manager: "مدیر",
      User: "کاربر",
      Editor: "ویرایشگر",
    };

    return (
      <Badge
        variant="outline"
        className={roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800"}
      >
        <Icon icon="mdi:shield-account" className="w-3 h-3 mr-1" />
        {roleLabels[role] || role}
      </Badge>
    );
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-gray-200">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={`${firstName} ${lastName}`} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <span>
              {firstName} {lastName}
            </span>
            <p className="text-gray-500 mt-1">جزئیات کاربر</p>
          </div>
        </div>
        <div className="flex gap-2">
          {getStatusBadge(status)}
          {getRoleBadge(role)}
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Icon icon="mdi:account" className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">نام</p>
              <p className="text-lg font-semibold text-gray-900">{firstName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
              <Icon icon="mdi:account" className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">نام خانوادگی</p>
              <p className="text-lg font-semibold text-gray-900">{lastName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
              <Icon icon="mdi:email" className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">ایمیل</p>
              <p className="text-lg font-semibold text-gray-900">{email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
              <Icon icon="mdi:card-account-details" className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">کد ملی</p>
              <p className="text-lg font-semibold text-gray-900">{nationalCode}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
              <Icon icon="mdi:pound" className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">شناسه کاربر</p>
              <p className="text-lg font-semibold text-gray-900">{id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
              <Icon icon="mdi:pulse" className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">وضعیت فعلی</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {status === "active" ? "فعال" : "غیرفعال"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Icon icon="mdi:camera" className="w-5 h-5" />
            تصویر پروفایل
          </h3>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-20 h-20 border-2 border-gray-200">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={`${firstName} ${lastName}`} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-700">آواتار فعلی</p>
              <p className="text-xs text-gray-500">آخرین بروزرسانی: ۲ روز پیش</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                تغییر تصویر پروفایل
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Icon icon="mdi:card-account-details" className="w-5 h-5" />
            کارت ملی
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="relative group">
              <img
                src={nationalCardImage || "/placeholder.svg"}
                alt="کارت ملی"
                className="w-full h-32 object-cover rounded-md border-2 border-gray-200 cursor-pointer transition-opacity group-hover:opacity-80"
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
                    <img
                      src={nationalCardImage || "/placeholder.svg"}
                      alt="کارت ملی (اندازه کامل)"
                      className="w-full h-auto rounded-md border"
                    />
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        <strong>کد ملی:</strong> {nationalCode}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>وضعیت تایید:</strong>{" "}
                        <span className="text-green-600">تایید شده</span>
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-xs text-gray-500 mt-2">برای مشاهده اندازه کامل کلیک کنید</p>
          </div>
        </div>
      </div>

      <Separator className="mt-6" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleStatusToggle}
          variant={status === "active" ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {status === "active" ? (
            <>
              <Icon icon="mdi:account-off" className="w-4 h-4" />
              غیرفعال کردن کاربر
            </>
          ) : (
            <>
              <Icon icon="mdi:account-check" className="w-4 h-4" />
              فعال کردن کاربر
            </>
          )}
        </Button>

        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Icon icon="mdi:account" className="w-4 h-4" />
          ویرایش پروفایل
        </Button>
      </div>
    </div>
  );
}
