import { Sidebar } from "@/components/dashboard/sidebar";

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

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
