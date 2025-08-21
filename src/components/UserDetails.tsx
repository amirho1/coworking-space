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
import { User } from "@/app/dashboard/users/page";
import Image from "next/image";
import UserDetailFields, { UserDetailFieldsProps } from "./users/UserDetailFields";
import ProfilePicture from "./ProfilePicture";
import NationalCardImage from "./NationalCardImage";

export default function UserDetails({
  id,
  firstName,
  lastName,
  email,
  roles,
  nationalCode,
  isActive,
  avatar,
  phoneNumber,
}: // nationalCardImage,
User) {
  const handleStatusToggle = () => {
    // Handle status toggle logic here
    console.log(`تغییر وضعیت کاربر از ${isActive} به ${isActive ? "active" : "inactive"}`);
  };

  const getStatusBadge = (status: boolean) => {
    return status ? (
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

  const getRoleBadge = (roles: User["roles"]) => {
    const isAdmin = roles.some(role => role.name === "Admin");
    const role = isAdmin ? "Admin" : "User";
    const roleColors = {
      Admin: "bg-purple-100 text-purple-800",
      User: "bg-gray-100 text-gray-800",
    };

    const roleLabels: Record<string, string> = {
      Admin: "مدیر کل",
      User: "کاربر",
    };

    return (
      <Badge variant="outline" className={roleColors[role] || "bg-gray-100 text-gray-800"}>
        <Icon icon="mdi:shield-account" className="w-3 h-3 mr-1" />
        {roleLabels[role] || role}
      </Badge>
    );
  };

  const rightFields: UserDetailFieldsProps[] = [
    {
      icon: "mdi:account",
      color: "blue",
      name: "نام",
      value: firstName,
    },
    {
      icon: "mdi:account",
      color: "green",
      name: "نام خانوادگی",
      value: lastName,
    },
    {
      icon: "mdi:email",
      color: "purple",
      name: "ایمیل",
      value: email,
    },
    {
      icon: "mdi:phone",
      color: "indigo",
      name: "تلفن",
      value: phoneNumber,
    },
  ];

  const leftFields: UserDetailFieldsProps[] = [
    {
      icon: "mdi:card-account-details",
      color: "orange",
      name: "کد ملی",
      value: nationalCode,
    },
    {
      icon: "mdi:pound",
      color: "default",
      name: "شناسه کاربری",
      value: id,
    },
    {
      icon: "mdi:pulse",
      color: "indigo",
      name: "وضعیت فعلی",
      value: isActive ? "فعال" : "غیرفعال",
    },
  ];

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-gray-500 mt-1">جزئیات کاربر</p>
        </div>

        <div className="flex gap-2">
          {getStatusBadge(isActive)}
          {getRoleBadge(roles)}
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          {rightFields.map((params, index) => (
            <UserDetailFields key={index} {...params} />
          ))}
        </div>

        <div className="space-y-4">
          {leftFields.map((params, index) => (
            <UserDetailFields {...params} key={index} />
          ))}
        </div>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ProfilePicture avatar={avatar} firstName={firstName} lastName={lastName} />

        <NationalCardImage firstName={firstName} lastName={lastName} nationalCode={nationalCode} />
      </div>

      <Separator className="mt-6" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={handleStatusToggle}
          variant={isActive ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isActive ? (
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
