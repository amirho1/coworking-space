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
import NavTree from "./NavTree";

interface Item {
  name: string;
  href: string;
  icon?: string;
}

export function MenuItem({ name, href, icon }: Item) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem key={name}>
      <Link
        key={name}
        href={href}
        className="flex items-center  text-sm font-medium rounded-md transition-colors gap-2 w-full h-full"
      >
        <SidebarMenuButton
          tooltip={name}
          className={cn(
            "transition-colors cursor-pointer",
            isActive
              ? "bg-sidebar-accent"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {icon && <Icon icon={icon} className="h-5 w-5" />}
          <span className="text-sm">{name}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export function NavMain({ items }: { items: Item[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu>
          {items.map(item => {
            return <NavTree {...item} key={item.name} />
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
