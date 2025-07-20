import { Metadata } from "next";
import RegisterPage from "@/components/register/Index";

export const metadata: Metadata = {
  title: "ثبت نام",
  description: "ثبت نام در سایت",
};

export default function Register() {
  return <RegisterPage />;
}
