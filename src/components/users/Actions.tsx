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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ActionsProps extends React.ComponentProps<typeof DropdownMenu> {
  id: number;
  name: string;
  isUserActive: boolean;
}

export default function Actions({ id, name, isUserActive, ...props }: ActionsProps) {
  return (
    <div>
      <Dialog>
        <DropdownMenu {...props}>
          <DropdownMenuTrigger asChild>
            <Icon icon="mdi:dots-vertical" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start">
            {isUserActive || (
              <DropdownMenuItem>
                <DialogTrigger className="cursor-pointer">ردکردن عضویت کاربر</DialogTrigger>
              </DropdownMenuItem>
            )}
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

        <DialogContent>
          <form>
            <DialogHeader>
              <DialogTitle className="text-center">
                ردکردن عضویت کاربر {name} با شناسه کابری {id}
              </DialogTitle>
              <DialogDescription>
                آیا مطمئن هستید که می‌خواهید عضویت این کاربر را رد کنید؟ این عمل قابل بازگشت نیست.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose>
                <Button variant="outline">لفو</Button>
              </DialogClose>
              <Button type="submit" variant="destructive">
                ردکردن
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
