"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/Calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns-jalali";
import { ControllerRenderProps } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return format(date, "yyyy/MM/dd");
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
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

function CustomMonthsDropdown(props: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-50">
        <Button variant="outline">
          {persianMonths[props.value]}
          <Icon icon="mdi:chevron-down" className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {persianMonths.map((month, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              props.onChange(props.options[index]);
            }}
            className="justify-center cursor-pointer"
          >
            {month}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DatePicker({
  field,
}: {
  field: ControllerRenderProps<
    {
      name: string;
      lastname: string;
      birthdate: Date;
      nationalCode: string;
      nationalCard: File;
    },
    "birthdate"
  >;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(field?.value as Date | undefined);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(field?.value as Date | undefined));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background "
          onChange={e => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              field.onChange(date);
              setDate(date);
              setMonth(date);
            }
          }}
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
              components={{
                // MonthCaption: CustomMonthCaption,
                MonthsDropdown: CustomMonthsDropdown,
              }}
              month={month}
              onMonthChange={setMonth}
              onSelect={date => {
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
