import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RejectDialogProps extends React.HTMLAttributes<HTMLFormElement> {
  id: string;
  name: string;
}

export function RejectDialog({ id, name }: RejectDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div>ردکردن</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              ردکردن کاربر {name} با شناسه کابری {id}
            </DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید این کاربر را رد کنید؟ این عمل قابل بازگشت نیست.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div></div>
            <DialogClose asChild>
              <Button variant="outline">لفو</Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              ردکردن
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
