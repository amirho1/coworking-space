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
import { useEffect, useRef } from "react";

const imageFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export default function RegisterForm({ email = "", phone = "" }: { email: string; phone: string }) {
  const router = useRouter();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const schema = z
    .object({
      name: z.string().min(3, { message: "نام باید حداقل 3 کاراکتر باشد" }),
      lastname: z.string().min(3, { message: "نام خانوادگی باید حداقل 3 کاراکتر باشد" }),
      email: z.email({ message: "ایمیل معتبر نیست" }),
      phone: z.string().min(11, { message: "شماره موبایل باید حداقل 11 رقم باشد" }),
      birthdate: z.date(),
      nationalCode: z.string().min(3, { message: "کد ملی باید حداقل 3 کاراکتر باشد" }),
      password: z.string().min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }),
      passwordConfirm: z.string().min(8, { message: "تایید رمز عبور باید حداقل 8 کاراکتر باشد" }),
      nationalCard: z
        .custom<File>(v => v instanceof File, { message: "بارگذاری تصویر کارت ملی الزامی است" })
        .refine(file => imageFormats.includes(file.type), "فرمت تصویر باید jpeg/png/webp باشد")
        .refine(file => file.size <= 2 * 1024 * 1024, "حجم فایل حداکثر باید ۲ مگابایت باشد"),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: "رمز عبور و تایید رمز عبور مطابقت ندارند",
      path: ["passwordConfirm"],
    });

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
      password: "",
      passwordConfirm: "",
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
      ref: firstInputRef,
    },
    {
      name: "lastname",
      label: "نام خانوادگی",
      placeholder: "نام خانوادگی",
      type: "text",
    },
    {
      name: "password",
      label: "رمز عبور",
      placeholder: "رمز عبور",
      type: "password",
    },
    {
      name: "passwordConfirm",
      label: "تایید رمز عبور",
      placeholder: "تایید رمز عبور",
      type: "password",
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

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <Card className="md:w-xl p-3 gap-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">ثبت نام</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fields.map(({ name, label, placeholder, type, ref }) => (
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
                          <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                            ref={e => {
                              field.ref(e);
                              if (ref) ref.current = e;
                            }}
                          />
                        )}
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button type="submit" className="w-full mt-2">
              ثبت نام
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
