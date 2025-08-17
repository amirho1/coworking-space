import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "../ui/Calendar";
import { reserve } from "@/app/dashboard/meeting-rooms/[id]/reserve";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import TimeSelect from "./TimeSelect";
import LoadingBtn from "../ui/LoadingBtn";
import { toast } from "sonner";

function calcTimDiff(diff: number = 1, from: string) {
  const [hour, minute] = from.split(":");
  const total = +hour + diff;
  const fourths = +minute / 60;

  return total + fourths;
}

interface ReserveFormProps {
  initialValue: Date;
  onDateChange: (value: Date) => any;
}

const schema = z.object({
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

export default function ReserveForm({ initialValue, onDateChange }: ReserveFormProps) {
  const router = useRouter();
  const [response, action, loading] = useActionState(reserve, {
    error: null,
    success: false,
  });

  const { id } = useParams();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: initialValue,
      startTime: "",
      endTime: "",
    },
    mode: "onSubmit",
  });

  const { date, endTime, startTime } = form.watch();

  function handleSubmit() {
    const values = form.getValues();
    const selectedDate = format(values.date, "yyyy-MM-dd");

    startTransition(() => {
      if (id && !isNaN(+id) && !Array.isArray(id))
        action({ ...values, date: selectedDate, roomId: +id });
    });
  }

  const disabledSubmit = loading || !endTime || !startTime;

  const handleDateChange = (date: Date) => {
    form.setValue("date", date);
    onDateChange(date);
  };

  const endTimeStartFrom = calcTimDiff(1, startTime);

  async function onStartTimeChange(value: string) {
    await form.setValue("startTime", value);
    const [hour, minute] = value.split(":");

    const endTimeHour = +hour < 9 ? `0${+hour + 1}` : +hour + 1;
    const endTimeValue = `${endTimeHour}:${minute}`;

    form.setValue("endTime", endTimeValue);
  }

  useEffect(() => {
    if (response.success) {
      toast.success("اتاق جلسه مورد نظر رزرو شد");
      router.refresh();
    }
  }, [response]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="border-l w-[350px] [&>*+*]:mt-5 pl-4"
      >
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          disabled={{ before: new Date() }}
          onDayClick={handleDateChange}
          className="m-auto"
        />

        <div className="flex justify-between items-end gap-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-center">انتخاب زمان شروع</FormLabel>
                <FormControl>
                  <TimeSelect
                    value={field.value}
                    onChange={onStartTimeChange}
                    title="انتخاب زمان شروع"
                    start={8}
                    end={23}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span>تا</span>

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>انتخاب زمان شروع</FormLabel>
                <FormControl>
                  <TimeSelect
                    value={field.value}
                    onChange={field.onChange}
                    title="انتخاب زمان شروع"
                    start={endTimeStartFrom}
                    end={24}
                    disabled={!startTime}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingBtn type="submit" className="w-full" loading={loading} disabled={disabledSubmit}>
          رزرو اتاق جلسه
        </LoadingBtn>
      </form>
    </Form>
  );
}
