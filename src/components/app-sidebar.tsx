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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export interface NavBarTree {
  name: string;
  href: string;
  icon?: string;
  items?: NavBarTree[];
}

export async function AppSidebar({ user, ...props }: AppSidebarProps) {
  const data: { navMain: NavBarTree[] } = {
    navMain: [
      {
        name: "سرویس ها",
        href: routes.services,
        icon: "mdi:seat",
      },
      {
        name: "جلسات",
        href: routes.meetingRooms,
        icon: "mdi:virtual-meeting",
        items: [
          {
            name: "اتاق ها",
            href: routes.meetingRooms,
          },
          {
            name: "رزرو های من",
            href: routes.bookedMeetingRooms,
          },
        ],
      },

      {
        name: "صورتحساب ها",
        href: routes.invoices,
        icon: "mdi:invoice",
      },
    ],
  };

  const adminNavMainRoutes = [
    {
      name: "لیست کاربران",
      href: routes.users,
      icon: "mdi:users",
    },
  ];

  if (user?.jwtClaim?.role && user?.jwtClaim?.role === "Admin") {
    adminNavMainRoutes.forEach(route => data.navMain.push(route));
  }

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
