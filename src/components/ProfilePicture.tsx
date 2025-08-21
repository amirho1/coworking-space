import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface ProfilePictureProps {
  avatar: string;
  firstName: string;
  lastName: string;
}

export default function ProfilePicture({ avatar, firstName, lastName }: ProfilePictureProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Icon icon="mdi:camera" className="w-5 h-5" />
        تصویر پروفایل
      </h3>

      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <Avatar className="w-20 h-20 border-2 border-gray-200">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={`${firstName} ${lastName}`} />
          <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
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
  );
}
