import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, ButtonParams } from "./button";

interface LoadingBtnParams extends ButtonParams {
  loading?: boolean;
}

export default function LoadingBtn({ loading = false, children, ...params }: LoadingBtnParams) {
  return (
    <Button type="submit" className="w-full" disabled={loading} {...params}>
      {children}
      {loading && <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
