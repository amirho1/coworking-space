"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Step } from "./Index";

import axiosFront from "@/api/front";
import { frontRoutes } from "@/lib/utils";
import useTimer from "@/hooks/useTimer";

interface OtpProps {
  setStep: (step: Step) => void;
  datetime: number;
  username: string;
}

export default function OTPForm({ setStep, datetime, username }: OtpProps) {
  const [otp, setOtp] = useState("");
  const { minutes, seconds, time } = useTimer({ datetime, waitTime: 120000 });
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);

    // Auto-submit when all 6 digits are entered
    if (value.length === 6 && time > 0) {
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
      // await new Promise(resolve => setTimeout(resolve, 2000));
      await axiosFront.post(frontRoutes.otpConfirm, { username, code: otpValue });

      toast.success("کد با موفقیت تایید شد");

      // Reset form after successful submission
      setOtp("");
      setStep("form");
    } catch (error) {
      console.log(error);
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
    <div className="flex items-center justify-center h-screen">
      <Card className="min-w-sm">
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
            <p className="mt-1">
              کد تا {minutes}:{seconds.toString().padStart(2, "0")} دقیقه معتبر است
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleSubmit()}
              className="w-full"
              disabled={otp.length !== 6 || isLoading || time <= 0}
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
              disabled={isLoading || !(time <= 0)}
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
