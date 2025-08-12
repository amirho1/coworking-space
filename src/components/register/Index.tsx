"use client";
import { useState } from "react";
import Otp from "./Otp";
import EmailPhone from "./EmailPhone";
import RegisterForm from "./RegisterForm";

export type Step = "emailPhone" | "otp" | "form";

export default function Register() {
  const [step, setStep] = useState<Step>("emailPhone");
  const [emailPhone, setEmailPhone] = useState<string>("");
  const [datetime, setDatetime] = useState<number | undefined>(undefined);
  const isEmail = emailPhone.includes("@");
  const mobile = isEmail ? "" : emailPhone;
  const email = isEmail ? emailPhone : "";

  const components = {
    emailPhone: (
      <EmailPhone
        setStep={setStep}
        onChange={setEmailPhone}
        value={emailPhone}
        setDatetime={setDatetime}
      />
    ),
    otp: <Otp setStep={setStep} datetime={datetime ?? 0} email={email} mobile={mobile} />,
    form: <RegisterForm email={email} mobile={mobile} />,
  };

  return (
    <div className="sm:flex flex-col items-center justify-center h-screen">{components[step]}</div>
  );
}
