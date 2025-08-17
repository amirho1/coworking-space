import { Fragment } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TimeSelectProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  start?: number;
  end?: number;
  disabled?: boolean;
}
const minutes = ["00", "15", "30", "45"];

export default function TimeSelect({
  title,
  value,
  onChange,
  start = 0,
  end = 24,
  disabled,
}: TimeSelectProps) {
  const length = end - start;
  const fractionOfQuarter = (start % 1) * 4;

  const times = Array.from({ length }, (_, hourIndex) => {
    const from = hourIndex + Math.trunc(start);
    const hour = from < 10 ? `0${from}` : from;

    return Array.from({ length: 4 }, (_, quarterIndex) => {
      if (quarterIndex <= fractionOfQuarter - 1 && hourIndex === 0) return null;

      const value = `${hour}:${minutes[quarterIndex]}`;

      const lastSelectValue = `${from < 10 ? `0${from + 1}` : from + 1}:00`;
      const lastSelect =
        quarterIndex === 3 && hourIndex === end - start - 1 ? (
          <SelectItem key={lastSelectValue} value={lastSelectValue}>
            {lastSelectValue}
          </SelectItem>
        ) : null;

      return (
        <Fragment key={value}>
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
          {lastSelect}
        </Fragment>
      );
    });
  });

  return (
    <Select disabled={disabled} value={value} dir="rtl" onValueChange={onChange}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder={title} className="z-50" />
      </SelectTrigger>
      <SelectContent onChange={console.log}>
        <SelectGroup>{times}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
