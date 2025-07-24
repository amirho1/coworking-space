import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "پنل رزرو اتاق جلیسات",
  description: "پنل رزرو اتاق جلیسات",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" side="right" />

      <SidebarInset>
        <SiteHeader />
        <div className="p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
