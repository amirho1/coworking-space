"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

export function NavMain({
  items,
}: {
  items: {
    name: string;
    href: string;
    icon?: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu>
          {items.map(item => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center  text-sm font-medium rounded-md transition-colors gap-2 w-full h-full"
                >
                  <SidebarMenuButton
                    tooltip={item.name}
                    className={cn(
                      "transition-colors cursor-pointer",
                      isActive
                        ? "bg-sidebar-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.icon && <Icon icon={item.icon} className="h-5 w-5" />}
                    <span className="text-sm">{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
