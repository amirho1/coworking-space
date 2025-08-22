"use client";

import React from "react";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const message = { message: "رمز عبور باید حداقل 8 کاراکتر باشد" };

const schema = z.object({
  oldPassword: z.string().min(8, message),
  newPassword: z.string().min(8, message),
  newPasswordConfirm: z.string().min(8, message),
});

export default function PasswordForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 mt-4">
        <FormField
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور قدیمی</FormLabel>
              <FormControl>
                <PasswordInput placeholder="رمز عبور قدیمی خود را وارد کنید" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رمز عبور جدید</FormLabel>
              <FormControl>
                <PasswordInput placeholder="رمز عبور جدید خود را وارد کنید" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="newPasswordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تایید رمز عبور جدید</FormLabel>
              <FormControl>
                <PasswordInput placeholder="رمز عبور خود را دوباره وارد کنید" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">تغییر رمز عبور</Button>
      </form>
    </Form>
  );
}
