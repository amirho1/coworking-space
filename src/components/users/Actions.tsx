"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { routes } from "@/lib/utils";
import { Dialog, DialogContent } from "../ui/dialog";
import StatusActiveDialogForm from "./StatusActiveDialogForm";

interface ActionsProps extends React.ComponentProps<typeof DropdownMenu> {
  id: number;
  name: string;
  isUserActive: boolean;
}

export default function Actions({ id, name, isUserActive, ...props }: ActionsProps) {
  const [open, setOpen] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  return (
    <div>
      <Dialog open={open}>
        <DropdownMenu {...props}>
          <DropdownMenuTrigger asChild>
            <Icon icon="mdi:dots-vertical" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="[&>*]:p-0 [&>*>*]:p-2">
            {isUserActive ? (
              <DropdownMenuItem onClick={openDialog} className="text-white bg-red-500 justify-end">
                <div>غیر فعال کردن کاربر</div>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={openDialog}
                className="bg-green-500 text-white justify-end"
              >
                <div>فعال کردن کاربر</div>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Link className="w-full text-right" href={routes.userDetails(id)}>
                جزئیات
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full text-right" href={routes.userServices(id)}>
                سرویس ها
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full text-right" href={routes.userMeetingRooms(id)}>
                جزئیات اتاق میتینگ ها
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <StatusActiveDialogForm
            name={name}
            id={id}
            isActive={isUserActive}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
