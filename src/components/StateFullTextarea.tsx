import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { debounce } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function StateFullTextarea({
  onChange = () => {},
  value,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInternalValue(e.target.value);
    debounce(() => onChange(e), 1000);
  }

  return (
    <Textarea
      value={internalValue}
      {...props}
      onChange={handleChange}
      className={cn(
        className,
        /^[a-zA-Z]/.test(internalValue as string) ? "text-left" : "text-right"
      )}
    />
  );
}
