import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { validateEmail } from "@/lib/utils";

interface ChangeEmailOrMobileProps extends HTMLAttributes<HTMLButtonElement> {
  username: string;
}

export default function ChangeEmailOrMobile({ username, ...props }: ChangeEmailOrMobileProps) {
  const text = validateEmail(username) ? "تغییر ایمیل" : "تغییر شماره تلفن";

  return (
    <Button variant="link" className="text-sm text-gray-600 m-auto block" {...props}>
      {text}
    </Button>
  );
}
