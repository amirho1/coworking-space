"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full p-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6">
          <Icon icon="mdi:alert-circle" className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">مشکلی پیش آمده است!</h2>
        <p className="text-muted-foreground mb-6">
          ما بابت این مشکل متاسفیم. شما می‌توانید دوباره تلاش کنید یا به صفحه اصلی بازگردید.
          {error?.digest && (
            <span className="block mt-2 text-xs text-muted-foreground">
              شناسه خطا: {error.digest}
            </span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/">صفحه اصلی</Link>
          </Button>
          <Button onClick={reset}>دوباره تلاش کنید</Button>
        </div>
      </div>
    </div>
  );
}
