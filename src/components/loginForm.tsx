"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import axiosFront from "@/api/front";
import { frontRoutes, routes, validatePhone } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    username: z
      .email({ message: "ایمیل معتبر نیست" })
      .or(z.string().refine(validatePhone, { message: "موبایل معتبر نیست" })),
    password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    setLoading(true);
    axiosFront
      .post(frontRoutes.login, data)
      .then(() => {
        router.push(routes.services);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">ورود</CardTitle>
          <CardDescription>
            ایمیل یا موبایل خود را وارد کنید تا وارد حساب کاربری خود شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ایمیل یا موبایل</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com  / 09034532987" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رمز عبور</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Link
                  href={routes.forgotPassword}
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-500"
                >
                  رمز عبور خود را فراموش کرده‌اید؟
                </Link>

                <Button type="submit" className="w-full" disabled={loading}>
                  ورود
                  {loading && <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm flex items-center justify-center gap-2">
                <p>حساب کاربری ندارید؟</p>
                <Link href={routes.register} className="text-blue-500 hover:underline">
                  ثبت نام
                </Link>
                کن
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
