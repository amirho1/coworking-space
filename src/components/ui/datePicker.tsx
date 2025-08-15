"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/Calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns-jalali";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ClassNames, CustomComponents, DropdownOption } from "react-day-picker";
import { useState } from "react";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return format(date, "yyyy/MM/dd");
}

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function CustomMonthsDropdown({
  classNames,
  ...props
}: {
  components: CustomComponents;
  classNames: ClassNames;
  options?: DropdownOption[] | undefined;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">) {
  return (
    <div className="z-50">
      <Select
        dir="rtl"
        onValueChange={value => {
          props.onChange?.({
            currentTarget: { value: props?.value },
            target: { value: props?.value },
          } as any);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={persianMonths[props.value]} className="z-50" />
        </SelectTrigger>
        <SelectContent {...props} onChange={console.log}>
          <SelectGroup>
            {persianMonths.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function DatePicker({ field }: { field: ControllerRenderProps<FieldValues, string> }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(field?.value as Date | undefined);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(field?.value as Date | undefined));
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background "
          onFocus={() => {
            setOpen(true);
          }}
          onKeyDown={e => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 left-2 size-6 -translate-y-1/2"
            >
              <Icon icon="mdi:calendar" className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={date => {
                field.onChange(date);
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
