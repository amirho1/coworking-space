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
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datePicker";
import { useRouter } from "next/navigation";
import {
  HTMLInputTypeAttribute,
  RefObject,
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { register } from "@/app/register/registerAction";
import { toast } from "sonner";
import { imageFormats, registerFormSchema } from "@/lib/schemas/registerForm";
import { format } from "date-fns-jalali";
import PasswordInput from "../PasswordInput";

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
      dateOfBirth: new Date(),
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
      } else if (key === "dateOfBirth" && value instanceof Date) {
        formData.append(key, format(value, "yyyy-MM-dd"));
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
      if (Array.isArray(state.error)) {
        state.error.forEach(error => toast.error(error.errorMessage || "خطا در ثبت نام"));
      } else toast.error(state.error);
    }
  }, [state, router]);

  interface Field {
    name: string;
    label: string;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    ref?: RefObject<HTMLInputElement | null>;
  }

  const fields: Field[] = [
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
      name: "dateOfBirth",
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

  function renderInputFields(
    { type, ...item }: Field,
    field: ControllerRenderProps<FieldValues, string>
  ) {
    switch (type) {
      case "file":
        return (
          <Input
            type="file"
            accept={imageFormats.join(",")}
            onChange={e => field.onChange(e.target.files?.[0])}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        );

      case "date":
        return <DatePicker field={field} />;
      case "password":
        return <PasswordInput {...field} {...item} />;
      default:
        return (
          <Input
            placeholder={item.placeholder}
            {...field}
            type={type}
            ref={e => {
              if (field?.ref && typeof field?.ref === "function") field?.ref?.(e);
              if (item.ref) item.ref.current = e;
            }}
          />
        );
    }
  }

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
            {fields.map(item => (
              <FormField
                key={item.name}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>{renderInputFields(item, field)}</FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="mt-2 col-span-full">
              ثبت نام
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
