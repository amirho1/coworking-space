import { otp } from "@/app/register/otpConfirm";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";

interface ResendProps extends React.HTMLAttributes<HTMLButtonElement> {
  time: number;
  onSuccess?: (datetime: number) => void;
  mobile?: string;
  email?: string;
}

export default function Resend({ time, mobile, email, onSuccess, ...props }: ResendProps) {
  const [state, formAction, isLoading] = useActionState(otp, {
    error: null,
    success: false,
    datetime: undefined,
  });

  function handleSubmit() {
    const formData = new FormData();
    formData.append(email ? "email" : "mobile", (email || mobile) as string);

    formAction(formData);
  }

  useEffect(() => {
    if (state.success && state?.datetime) {
      toast.success("کد تایید مجدداً ارسال شد");
      onSuccess?.(new Date(state.datetime).getTime());
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state.error, state.success, state?.datetime]);

  return (
    <form action={handleSubmit}>
      <Button
        variant="outline"
        type="submit"
        className="w-full bg-transparent"
        disabled={isLoading || !(time <= 0)}
        {...props}
      >
        {isLoading ? (
          <>
            <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
            در حال ارسال...
          </>
        ) : (
          "ارسال مجدد کد"
        )}
      </Button>
    </form>
  );
}
