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
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { register } from "@/app/register/registerAction";
import { toast } from "sonner";
import { imageFormats, registerFormSchema } from "@/lib/schemas/registerForm";

interface RegisterFormProps {
  email?: string;
  mobile?: string;
}

export default function RegisterForm({ email = "", mobile = "" }: RegisterFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(register, { error: null, success: false });

  const firstInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      birthdate: new Date(),
      nationalCode: "",
      file: undefined,
      email,
      mobile,
      password: "",
      passwordConfirm: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key as keyof typeof data];
      if (key === "file" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (state.success) {
      router.push("/login");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state.success, router]);

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
      name: "mobile",
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
      name: "file",
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
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
            <Button type="submit" className="w-full mt-2">
              ثبت نام
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
