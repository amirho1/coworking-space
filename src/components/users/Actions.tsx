import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RejectDialog } from "./RejectDialog";
import Link from "next/link";
import { routes } from "@/lib/utils";

interface ActionsProps extends React.ComponentProps<typeof DropdownMenu> {
  id: number;
  name: string;
}

export default function Actions({ id, name, ...props }: ActionsProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Icon icon="mdi:dots-vertical" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <RejectDialog id={`${id}`} name={name} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={routes.userDetails(id)}>جزئیات</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={routes.userServices(id)}>سرویس ها</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={routes.userMeetingRooms(id)}>جزئیات اتاق میتینگ ها</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
