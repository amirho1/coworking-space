import { User } from "@/app/dashboard/users/page";
import AutomateTable, { RenderItemProps } from "./AutomateTable";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Actions from "./users/Actions";
import { Badge } from "./ui/badge";

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
const sort: (keyof User | "actions")[] = [
  "id",
  "name",
  "lastname",
  "email",
  "role",
  "phoneNumber",
  "nationalID",
  "status",
  "actions",
];

function renderItem({ key, item }: RenderItemProps<User>) {
  switch (key) {
    case "name":
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={item.avatar} alt={`${item.name} ${item.lastname}`} />
            <AvatarFallback>
              {item.name.charAt(0)}
              {item.lastname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {item.name}
        </div>
      );
    case "status":
      return (
        <Badge
          className={
            item.status === "confirmed"
              ? "bg-green-500"
              : item.status === "rejected"
              ? "bg-red-600"
              : "bg-gray-300"
          }
        >
          {item.status === "confirmed"
            ? "تایید شده"
            : item.status === "rejected"
            ? "رد شده"
            : "در انتظار تایید"}
        </Badge>
      );
    case "actions":
      return <Actions id={item.id} name={item.name} />;
    default:
      return item[key];
  }
}

export default function UserTable({ users, ...props }: { users?: User[] }) {
  return (
    <AutomateTable<User>
      heads={heads}
      data={users || []}
      sort={sort}
      renderItem={renderItem}
      {...props}
    />
  );
}
