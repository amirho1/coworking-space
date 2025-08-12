import { HTMLAttributes } from "react";
import { Button } from "../ui/button";

interface ChangeEmailOrMobileProps extends HTMLAttributes<HTMLButtonElement> {
  mobile?: string;
  email?: string;
}

export default function ChangeEmailOrMobile({ mobile, email, ...props }: ChangeEmailOrMobileProps) {
  const text = mobile || email ? "تغییر ایمیل" : "تغییر شماره تلفن";

  return (
    <Button variant="link" className="text-sm text-gray-600 m-auto block" {...props}>
      {text}
    </Button>
  );
}
