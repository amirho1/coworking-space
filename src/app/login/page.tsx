import { Metadata } from "next";

import LoginForm from "@/components/loginForm";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود به حساب کاربری",
};

export default function Login() {
  return <LoginForm />;
}
