import PasswordForm from "@/components/PasswordForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosInstance from "@/api";
import apiRoutes from "@/lib/apiRoutes";

export default async function Profile() {
  const { data } = await axiosInstance.get(apiRoutes.profile);
  return (
    <div>
      <Card className="mx-auto overflow-hidden rounded-xl shadow-none p-0 border-none">
        {/* Banner */}
        <div className="relative h-32 bg-gradient-to-r from-[#000] via-[#0008] to-[#0006]">
          {/* Profile Image */}
          <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
            <Avatar className="w-20 h-20 border-4 border-white shadow-md">
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-14 pb-6 text-center bg-white">
          <div className="flex items-center justify-center gap-2 font-semibold text-2xl">
            {data.data.firstName} {data.data.lastName}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password">تغییر رمز عبور</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
