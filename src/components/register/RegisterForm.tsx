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
import axiosFront from "@/api/front";
import { frontRoutes } from "@/lib/utils";
import { useRouter } from "next/navigation";

const imageFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const schema = z.object({
  name: z.string().min(3, { message: "نام باید حداقل 3 کاراکتر باشد" }),
  lastname: z.string().min(3, { message: "نام خانوادگی باید حداقل 3 کاراکتر باشد" }),
  email: z.email({ message: "ایمیل معتبر نیست" }),
  phone: z.string().min(11, { message: "شماره موبایل باید حداقل 11 رقم باشد" }),
  birthdate: z.date(),
  nationalCode: z.string().min(3, { message: "کد ملی باید حداقل 3 کاراکتر باشد" }),
  nationalCard: z
    .custom<File>(v => v instanceof File, { message: "بارگذاری تصویر کارت ملی الزامی است" })
    .refine(file => imageFormats.includes(file.type), "فرمت تصویر باید jpeg/png/webp باشد")
    .refine(file => file.size <= 2 * 1024 * 1024, "حجم فایل حداکثر باید ۲ مگابایت باشد"),
});

export default function RegisterForm({ email, phone }: { email: string; phone: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastname: "",
      birthdate: new Date(),
      nationalCode: "",
      nationalCard: undefined,
      email,
      phone,
    },
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("nationalCard", data.nationalCard);
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("birthdate", data.birthdate.toISOString());
    formData.append("nationalCode", data.nationalCode);

    console.log(formData.get("nationalCard"));
    axiosFront
      .post(frontRoutes.register, formData)
      .then(() => {
        router.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fields = [
    {
      name: "name",
      label: "نام",
      placeholder: "نام",
      type: "text",
    },
    {
      name: "lastname",
      label: "نام خانوادگی",
      placeholder: "نام خانوادگی",
      type: "text",
    },
    {
      name: "email",
      label: "ایمیل",
      placeholder: "example@example.com",
      type: "email",
    },
    {
      name: "phone",
      label: "شماره موبایل",
      placeholder: "09123456789",
      type: "text",
    },
    {
      name: "birthdate",
      label: "تاریخ تولد",
      placeholder: "تاریخ تولد",
      type: "date",
    },
    {
      name: "nationalCode",
      label: "کد ملی",
      placeholder: "0039902211",
      type: "text",
    },
    {
      name: "nationalCard",
      label: "کارت ملی",
      placeholder: "کارت ملی",
      type: "file",
    },
  ];

  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">ثبت نام</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            {fields.map(({ name, label, placeholder, type }) => (
              <FormField
                key={name}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {type === "file" ? (
                        <Input
                          type="file"
                          accept={imageFormats.join(",")}
                          onChange={e => field.onChange(e.target.files?.[0])}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      ) : type === "date" ? (
                        <DatePicker field={field} />
                      ) : (
                        <Input placeholder={placeholder} {...field} type={type} />
                      )}
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="w-full ">
              ثبت نام
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
