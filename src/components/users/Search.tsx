"use client";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { debounce } from "@/lib/utils";

export default function Search({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    router.push(`/dashboard/users?page=1&search=${query}`);
  }

  const debouncedOnChange = debounce(handleSearchChange);

  return (
    <Input placeholder="جستجو کاربر" onChange={debouncedOnChange} defaultValue={defaultValue} />
  );
}
