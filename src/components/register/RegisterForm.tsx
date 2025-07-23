import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datePicker";

const imageFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const schema = z.object({
  name: z.string().min(3, { message: "نام باید حداقل 3 کاراکتر باشد" }),
  lastname: z.string().min(3, { message: "نام خانوادگی باید حداقل 3 کاراکتر باشد" }),
  birthdate: z.date(),
  nationalCode: z.string().min(3, { message: "کد ملی باید حداقل 3 کاراکتر باشد" }),
  nationalCard: z
    .instanceof(File)
    .refine(file => file.size <= 1024 * 1024 * 5, {
      message: "حجم فایل باید کمتر از 5 مگابایت باشد",
    })
    .refine(file => imageFormats.includes(file.type), {
      message: "فرمت فایل باید یکی از فرمت های زیر باشد: " + imageFormats.join(", "),
    }),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastname: "",
      birthdate: new Date(),
      nationalCode: "",
      nationalCard: undefined,
    },
  });

  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">ثبت نام</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="نام" {...field} type="text" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="نام خانوادگی" {...field} type="text" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="birthdate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاریخ تولد</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nationalCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0039902211"
                      {...field}
                      value={field.value}
                      type="text"
                      dir="ltr"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nationalCard"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کارت ملی</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.name}
                      type="file"
                      accept={imageFormats.join(",")}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full ">
              ثبت نام
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
