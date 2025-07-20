import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Building2,
  Plus,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Mock data - replace with real data from your backend
const stats = [
  {
    title: "کل جلسات",
    value: "24",
    description: "این ماه",
    icon: Calendar,
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "ساعت‌های رزرو شده",
    value: "156",
    description: "این ماه",
    icon: Clock,
    trend: "+8%",
    trendUp: true,
  },
  {
    title: "اعضای تیم",
    value: "12",
    description: "کاربران فعال",
    icon: Users,
    trend: "+2",
    trendUp: true,
  },
  {
    title: "اتاق‌های موجود",
    value: "8",
    description: "آماده رزرو",
    icon: Building2,
    trend: "100%",
    trendUp: true,
  },
];

const upcomingMeetings = [
  {
    id: 1,
    title: "جلسه بررسی محصول",
    time: "10:00 - 11:00",
    room: "اتاق کنفرانس الف",
    attendees: 6,
    status: "confirmed",
  },
  {
    id: 2,
    title: "ارائه به مشتری",
    time: "14:00 - 15:30",
    room: "اتاق جلسه ب",
    attendees: 4,
    status: "pending",
  },
  {
    id: 3,
    title: "جلسه روزانه تیم",
    time: "09:00 - 09:30",
    room: "فضای باز",
    attendees: 8,
    status: "confirmed",
  },
];

export default function DashboardPage() {
  // Mock user data - replace with real user data from your auth system
  const user = {
    name: "علی احمدی",
    email: "ali.ahmadi@company.com",
    avatar: "",
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">داشبورد</h1>
            <p className="text-muted-foreground">
              خوش آمدید! اینجا آنچه امروز با جلسات شما اتفاق می‌افتد را می‌بینید.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            جلسه جدید
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center mt-2">
                  {stat.trendUp ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {stat.trend} نسبت به ماه گذشته
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>جلسات آینده</CardTitle>
            <CardDescription>3 جلسه برنامه‌ریزی شده بعدی شما</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings.map(meeting => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {meeting.status === "confirmed" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      <Badge variant={meeting.status === "confirmed" ? "default" : "secondary"}>
                        {meeting.status === "confirmed" ? "تأیید شده" : "در انتظار"}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium">{meeting.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {meeting.time} • {meeting.room} • {meeting.attendees} شرکت‌کننده
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    پیوستن
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
