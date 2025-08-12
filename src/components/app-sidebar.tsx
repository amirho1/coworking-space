import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/utils";
import { User } from "@/types";

const data = {
  navMain: [
    {
      name: "سرویس ها",
      href: routes.services,
      icon: "mdi:seat",
    },
    {
      name: "اتاق‌های جلسه",
      href: routes.meetingRooms,
      icon: "mdi:virtual-meeting",
    },

    {
      name: "صورتحساب ها",
      href: routes.invoices,
      icon: "mdi:invoice",
    },

    {
      name: "لیست کاربران",
      href: routes.users,
      icon: "mdi:users",
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export async function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 className="text-lg font-bold">پنل کاربری</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
