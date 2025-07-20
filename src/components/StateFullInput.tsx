import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { debounce } from "@/lib/utils";

export default function StateFullInput({
  onChange = () => {},
  value,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { disableAutoDirChange?: boolean }) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInternalValue(e.target.value);
    debounce(() => onChange(e), 600);
  }

  return <Input value={internalValue} {...props} onChange={handleChange} />;
}
