import z from "zod";
import { validatePhone } from "../utils";
import { isValidIranNationalCode } from "../nationalCodeValidation";

export const imageFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const registerFormSchema = z
  .object({
    name: z.string().min(3, { message: "نام باید حداقل 3 کاراکتر باشد" }),
    lastname: z.string().min(3, { message: "نام خانوادگی باید حداقل 3 کاراکتر باشد" }),
    email: z.email({ message: "ایمیل معتبر نیست" }),
    mobile: z
      .string()
      .min(11, { message: "شماره موبایل باید حداقل 11 رقم باشد" })
      .refine(validatePhone, { message: "شماره موبایل معتبر نیست" }),
    dateOfBirth: z.date(),
    nationalCode: z
      .string()
      .min(10, { message: "کد ملی باید حداقل 10 کاراکتر باشد" })
      .refine(isValidIranNationalCode, {
        message: "کد ملی معتبر نیست",
      }),
    password: z.string().min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }),
    passwordConfirm: z.string().min(8, { message: "تایید رمز عبور باید حداقل 8 کاراکتر باشد" }),
    file: z
      .custom<File>(v => v instanceof File, { message: "بارگذاری تصویر کارت ملی الزامی است" })
      .refine(file => imageFormats.includes(file.type), "فرمت تصویر باید jpeg/png/webp باشد")
      .refine(file => file.size <= 2 * 1024 * 1024, "حجم فایل حداکثر باید ۲ مگابایت باشد"),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "رمز عبور و تایید رمز عبور مطابقت ندارند",
    path: ["passwordConfirm"],
  });
