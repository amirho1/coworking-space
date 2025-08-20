import Link from "next/link";
import { NavBarTree } from "./app-sidebar";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./ui/sidebar";
import { CollapsibleTrigger, Collapsible, CollapsibleContent } from "./ui/collapsible";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavTree({ items, name, href, icon }: NavBarTree) {
  const pathname = usePathname();
  const isActive = useMemo(() => items?.some(({ href }) => pathname === href), [pathname]);
  const [open, setOpenChange] = useState(isActive);

  if (!items?.length) {
    const isActive = href === pathname;

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

  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setOpenChange}>
        <CollapsibleTrigger
          className={cn(
            !isActive && "text-muted-foreground ",
            "flex items-center justify-between w-full pr-2"
          )}
        >
          <span className="flex items-center gap-2">
            {icon && <Icon icon={icon} className="text-xl" />}
            {name}
          </span>
          <Icon icon={open ? "mdi:menu-up" : "mdi:menu-down"} className="text-3xl" />
        </CollapsibleTrigger>

        <CollapsibleContent>
          {items.map(params => (
            <SidebarMenuSub key={params.name}>
              <NavTree {...params} />
            </SidebarMenuSub>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
