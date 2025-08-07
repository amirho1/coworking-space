import axiosInstance from "@/api";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import apiRoutes from "@/lib/apiRoutes";

export const metadata = {
  title: "پنل رزرو اتاق جلیسات",
  description: "پنل رزرو اتاق جلیسات",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data } = await axiosInstance.get(apiRoutes.profile);
  console.log(data, "data in dashboard layout");
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={data.data} side="right" />

      <SidebarInset>
        <SiteHeader />
        <div className="p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
