import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function PasswordForm() {
  return (
    <form className="flex flex-col gap-4 mt-4">
      <Label>رمز عبور قدیمی</Label>
      <Input placeholder="رمز عبور قدیمی خود را وارد کنید" type="password" />
      <Label>رمز عبور جدید</Label>
      <Input placeholder="رمز عبور جدید خود را وارد کنید" type="password" />
      <Label>تایید رمز عبور</Label>
      <Input placeholder="رمز عبور خود را دوباره وارد کنید" type="password" />
      <Button type="submit">تغییر رمز عبور</Button>
    </form>
  );
}
