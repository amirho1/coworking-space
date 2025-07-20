"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, routes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, Building2, Home } from "lucide-react";

interface SidebarProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

const navigation = [
  {
    name: "داشبورد",
    href: "/dashboard",
    icon: Home,
    current: true,
  },
  {
    name: "اتاق‌های جلسه",
    href: "/dashboard/meeting-rooms",
    icon: Building2,
    current: false,
  },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const isAccountPage = pathname.startsWith(routes.account);

  return (
    <div className="flex h-full w-64 flex-col bg-background border-l">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-xl font-bold">مرکز جلسات</h1>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "کاربر"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || "کاربر"}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors gap-2",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link
            href={routes.account}
            className={isAccountPage ? "bg-primary text-primary-foreground" : undefined}
          >
            <User className="h-4 w-4" />
            حساب کاربری
          </Link>
        </Button>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className={"w-full justify-start text-destructive hover:text-destructive"}
          asChild
        >
          <Link href="/auth/signout">
            <LogOut className="h-4 w-4" />
            خروج
          </Link>
        </Button>
      </div>
    </div>
  );
}
