import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به حساب کاربری",
};

export default function Login() {
  return (
    <div className={cn("flex flex-col gap-6 items-center justify-center h-screen")}>
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">ورود</CardTitle>
          <CardDescription>
            ایمیل یا موبایل خود را وارد کنید تا وارد حساب کاربری خود شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل یا موبایل</Label>
                <Input
                  id="email"
                  placeholder="example@example.com  / 09034532987"
                  required
                  className="text-left"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">رمز عبور</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    رمز عبور خود را فراموش کرده‌اید؟
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                ورود
              </Button>
            </div>
            <div className="mt-4 text-center text-sm flex items-center justify-center gap-2">
              <p>حساب کاربری ندارید؟</p>
              <Link href="/register" className="text-blue-500 hover:underline">
                ثبت نام
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
