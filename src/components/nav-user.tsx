"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { frontAPIs, routes } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import axiosFront from "@/api/front";
import { useRouter } from "next/navigation";
import { User } from "@/types";

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  function logout() {
    document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axiosFront.post(frontAPIs.logout).then(async () => {
      router.replace(routes.login);
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user?.avatar} alt={user?.userName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-sm leading-tight text-right">
                <span className="truncate font-medium">{user?.userName}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <Icon icon="mdi:dots-vertical" className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "left"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5   text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.userName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1   text-sm leading-tight">
                  <span className="truncate font-medium">{user?.userName}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={routes.profile} className="flex items-center gap-2">
                  <Icon icon="mdi:user" />
                  حساب کاربری
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={routes.invoices} className="flex items-center gap-2">
                  <Icon icon="mdi:credit-card" />
                  صورتحساب
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-500 hover:text-red-500">
              <Icon icon="mdi:logout" />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
