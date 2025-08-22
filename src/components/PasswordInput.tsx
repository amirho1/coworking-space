import { useState } from "react";
import { Input } from "./ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

export default function PasswordInput({ type: _, ...props }: PasswordInputProps) {
  const [type, setType] = useState<"text" | "password">("password");
  const icons = {
    password: "mdi:eye-off",
    text: "mdi:eye",
  };

  function handleClick() {
    setType(prev => (prev === "text" ? "password" : "text"));
  }

  return (
    <div className="flex justify-between p-2 relative">
      <Input type={type} {...props} />
      <Button type="button" variant="icon" onClick={handleClick} className="absolute left-2">
        <Icon icon={icons[type]} />
      </Button>
    </div>
  );
}
