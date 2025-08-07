"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Step } from "./Index";

import useTimer from "@/hooks/useTimer";
import { Icon } from "@iconify/react/dist/iconify.js";
import Resend from "./Resend";
import { otpConfirm } from "@/app/register/actions";
import ChangeEmailOrMobile from "./ChangeEmailOrMobile";

interface OtpProps {
  setStep: (step: Step) => void;
  datetime: number;
  username: string;
}

export default function OTPForm({ setStep, datetime, username }: OtpProps) {
  const [internalDatetime, setInternalDatetime] = useState(datetime);
  const [state, formAction, isLoading] = useActionState(otpConfirm, {
    error: null,
    success: false,
  });

  const { minutes, seconds, time } = useTimer({ datetime: internalDatetime, waitTime: 0 });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    if (state.success) {
      toast.success("کد با موفقیت تایید شد");
      setStep("form");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function handleOtpChange(string: string) {
    if (string.length === 6) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }

  function handleSubmit(formData: FormData) {
    formData.append("email", username);
    formData.append("mobile", username);
    formAction(formData);
  }

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
          <form action={handleSubmit}>
            <div className="flex justify-center" dir="ltr">
              <InputOTP
                maxLength={6}
                disabled={isLoading}
                autoFocus
                name="otpCode"
                onChange={handleOtpChange}
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

            <div className="text-center text-sm text-gray-600 mt-4">
              <p>کد ۶ رقمی ارسال شده به شماره خود را وارد کنید</p>
              <p className="mt-1">
                کد تا {minutes}:{seconds.toString().padStart(2, "0")} دقیقه معتبر است
              </p>
            </div>

            <Button
              className="w-full mt-4"
              type="submit"
              disabled={isLoading || time <= 0 || isSubmitButtonDisabled}
            >
              {isLoading ? (
                <>
                  <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
                  در حال بررسی...
                </>
              ) : (
                "تایید کد"
              )}
            </Button>
          </form>

          <Resend time={time} username={username} onSuccess={setInternalDatetime} />

          <ChangeEmailOrMobile username={username} onClick={() => setStep("emailPhone")} />
        </CardContent>
      </Card>
    </div>
  );
}
