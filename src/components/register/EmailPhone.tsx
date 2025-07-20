"use client";
import { debounce, validateEmail, validatePhone } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

export default function EmailPhone({
  setStep,
  onChange,
  value,
}: {
  setStep: (step: "emailPhone" | "otp") => void;
  onChange: (value: string) => void;
  value: string;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    if (validateEmail(email)) {
      setStep("otp");
    } else if (validatePhone(email)) {
      setStep("otp");
    } else {
      toast.error("ایمیل یا موبایل معتبر نیست");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      onChange(e.target.value);
      console.log(e.target.value);
    }, 1000);
  };

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-center">
          <h1 className="text-2xl font-bold">ثبت نام</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">ایمیل یا موبایل</Label>
            <Input
              id="email"
              placeholder="example@example.com  /  09034532987"
              dir="ltr"
              name="email"
              defaultValue={value}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full">
            ادامه
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
