"use client";
import { routes, validateEmail, validatePhone } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { otp } from "@/app/login/actions";
import { toast } from "sonner";
import Link from "next/link";

const schema = z.object({
  emailOrPhone: z
    .string()
    .refine(validateEmail, { message: "ایمیل معتبر نیست" })
    .or(z.string().refine(validatePhone, { message: "موبایل معتبر نیست" })),
});

export default function EmailPhone({
  setStep,
  onChange,
  value,
  setDatetime,
}: {
  setStep: (step: "emailPhone" | "otp") => void;
  onChange: (value: string) => void;
  setDatetime: (datetime: number | undefined) => void;
  value: string;
}) {
  const [{ datetime, success, error }, formAction, isPending] = useActionState(otp, {
    error: null,
    success: false,
    datetime: undefined,
  });
  const ref = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailOrPhone: value,
    },
    mode: "onSubmit",
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("emailOrPhone", data.emailOrPhone);
    startTransition(() => {
      formAction(formData);
      onChange(formData.get("emailOrPhone") as string);
    });
  };

  useEffect(() => {
    if (success && datetime) {
      setStep("otp");
      setDatetime(datetime);
      toast.success("کد ارسال شد");
    } else if (error) {
      toast.error("خطایی در ارسال کد رخ داده است");
    }
  }, [success, error]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center p-0 sm:h-fit sm:block ">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold">ثبت نام</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل یا موبایل</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register("emailOrPhone")}
                        placeholder="example@example.com  /  09034532987"
                        dir="ltr"
                        {...field}
                        ref={e => {
                          field.ref(e);
                          if (ref) ref.current = e;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4" disabled={isPending}>
                {isPending ? "در حال ارسال..." : "ادامه"}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-gray-500 mt-4">
            حساب کاربری دارید؟{" "}
            <Link href={routes.login} className="text-blue-500">
              ورود
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
