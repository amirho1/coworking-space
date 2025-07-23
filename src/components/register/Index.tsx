"use client";
import { useState } from "react";
import Otp from "./Otp";
import EmailPhone from "./EmailPhone";
import RegisterForm from "./RegisterForm";

export type Step = "emailPhone" | "otp" | "form";

export default function Register() {
  const [step, setStep] = useState<Step>("emailPhone");
  const [emailPhone, setEmailPhone] = useState<string>("");

  const components = {
    emailPhone: <EmailPhone setStep={setStep} onChange={setEmailPhone} value={emailPhone} />,
    otp: <Otp setStep={setStep} />,
    form: <RegisterForm />,
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">{components[step]}</div>
  );
}
 