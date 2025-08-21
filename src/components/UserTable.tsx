import { User } from "@/app/dashboard/users/page";
import AutomateTable, { RenderItemProps } from "./AutomateTable";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Actions from "./users/Actions";
import { Badge } from "./ui/badge";

const roles = {
  Admin: "ادمین",
  User: "کاربر معمولی",
};

const heads = [
  "شناسه",
  "اسم",
  "نام خانوادگی",
  "ایمیل",
  "دسترسی",
  "شماره تماس",
  "کد ملی",
  "وضعیت",
  "اقدامات",
];

type columns =
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "roles"
  | "phoneNumber"
  | "nationalCode"
  | "isActive"
  | "actions";

const sort: columns[] = [
  "id",
  "firstName",
  "lastName",
  "email",
  "roles",
  "phoneNumber",
  "nationalCode",
  "isActive",
  "actions",
];

function renderItem({ key, item }: RenderItemProps<User, columns>) {
  switch (key) {
    case "firstName":
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={item.avatar} alt={`${item.firstName} ${item.lastName}`} />
            <AvatarFallback>
              {item.displayName.charAt(0)}
              {item.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {item.firstName}
        </div>
      );
    case "isActive":
      return (
        <Badge
          className={item.isActive ? "bg-green-500" : item.isActive ? "bg-red-600" : "bg-gray-300"}
        >
          {item.isActive ? "تایید شده" : item.isActive ? "رد شده" : "در انتظار تایید"}
        </Badge>
      );
    case "roles":
      const adminRole: "Admin" | "User" = item[key][0].name as any;

      return roles[adminRole];
    case "actions":
      return <Actions id={item.id} name={item.firstName} />;
    default:
      return item[key];
  }
}

export default function UserTable({ users, ...props }: { users?: User[] }) {
  return (
    <AutomateTable<User, columns>
      heads={heads}
      data={users || []}
      sort={sort}
      renderItem={renderItem}
      {...props}
    />
  );
}
