import { useActionState, useEffect } from "react";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DeactivateState, userActiveStatus } from "@/actions/userActiveStatus";
import LoadingBtn from "../ui/LoadingBtn";

interface Props {
  id: string;
  name: string;
  onError?: () => void;
  isActive: boolean;
  onSuccess?: () => void;
}

const initialState: DeactivateState = { error: null, success: false };

export default function DeActivateDialogForm({ id, name, onSuccess, onError, isActive }: Props) {
  const [res, formAction, pending] = useActionState(userActiveStatus, initialState);

  useEffect(() => {
    if (res?.error && onError) onError();
    else if (res?.success && onSuccess) onSuccess();
  });

  return (
    <form
      dir="rtl"
      action={() => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("isActive", `${isActive ? 0 : 1}`);
        formAction(formData);
      }}
    >
      <DialogHeader>
        <DialogTitle className="text-center">
          غیر فعال کردن کاربر {name} با شناسه کابری {id}
        </DialogTitle>
        <DialogDescription className="text-center mt-2">
          آیا مطمئن هستید که می‌خواهید کاربر را غیرفعال کنید؟
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="mt-2">
        <DialogClose>لفو</DialogClose>
        <LoadingBtn loading={pending} type="submit" variant="destructive" className="w-32">
          تایید
        </LoadingBtn>
      </DialogFooter>
    </form>
  );
}
