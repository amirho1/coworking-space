import { otp } from "@/app/register/actions";
import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { validateEmail } from "@/lib/utils";
import { toast } from "sonner";

interface ResendProps extends React.HTMLAttributes<HTMLButtonElement> {
  time: number;
  username: string;
  onSuccess?: (datetime: number) => void;
}

export default function Resend({ time, username, onSuccess, ...props }: ResendProps) {
  const [state, formAction, isLoading] = useActionState(otp, {
    error: null,
    success: false,
    datetime: undefined,
  });

  function handleSubmit() {
    const isEmail = validateEmail(username);
    const formData = new FormData();
    formData.append(isEmail ? "email" : "mobile", username);

    formAction(formData);
  }

  useEffect(() => {
    if (state.success && state?.datetime) {
      toast.success("کد تایید مجدداً ارسال شد");
      console.log("OTP sent successfully", state.datetime);
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
