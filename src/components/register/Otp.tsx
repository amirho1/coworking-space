"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Step } from "./Index";

export default function OTPForm({ setStep }: { setStep: (step: Step) => void }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);

    // Auto-submit when all 6 digits are entered
    if (value.length === 6) {
      handleSubmit(value);
    }
  };

  const handleSubmit = async (otpValue: string = otp) => {
    if (otpValue.length !== 6) {
      toast.error("Invalid OTP", {
        description: "لطفاً هر ۶ رقم کد را وارد کنید",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically verify the OTP with your backend
      console.log("Submitting OTP:", otpValue);

      toast.success("کد با موفقیت تایید شد");

      // Reset form after successful submission
      setOtp("");
      setStep("form");
    } catch (error) {
      toast.error("تایید کد ناموفق بود. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);

    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("کد ارسال شد", {
        description: "کد جدید به شماره شما ارسال شد",
      });

      // Clear current OTP
      setOtp("");
    } catch (error) {
      toast.error("ارسال مجدد کد ناموفق بود. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">ورود کد تایید</CardTitle>
          <CardDescription>
            ما یک کد ۶ رقمی به شماره تلفن شما ارسال کردیم. لطفاً آن را وارد کنید تا حساب شما تأیید
            شود.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center" dir="ltr">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={isLoading}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>کد ۶ رقمی ارسال شده به شماره خود را وارد کنید</p>
            <p className="mt-1">کد تا ۵ دقیقه معتبر است</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleSubmit()}
              className="w-full"
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال بررسی...
                </>
              ) : (
                "تایید کد"
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleResendOtp}
              className="w-full bg-transparent"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ارسال...
                </>
              ) : (
                "ارسال مجدد کد"
              )}
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              className="text-sm text-gray-600"
              onClick={() => setStep("emailPhone")}
            >
              تغییر شماره تلفن
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
