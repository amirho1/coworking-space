import axiosInstance from "@/api";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import apiRoutes from "@/lib/apiRoutes";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export const metadata = {
  title: "پنل رزرو اتاق جلیسات",
  description: "پنل رزرو اتاق جلیسات",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data } = await axiosInstance.get(apiRoutes.profile);
  // Add JWT claim to the user for checking admin role
  const cookieObj = await cookies();
  const authorization = cookieObj.get("Authorization")?.value;
  const jwtClaim = authorization && decodeJwt(authorization);
  data.data.jwtClaim = jwtClaim;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" user={data.data} side="right" />

      <SidebarInset>
        <SiteHeader />
        <div className="p-5 pb-0 h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
