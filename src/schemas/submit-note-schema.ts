import { z } from "zod";

export const SubmitNoteSchema = z.object({
  full_name: z.string().min(3, "الاسم يجب أن يحتوي على 3 أحرف على الأقل"),

  phone: z
    .string()
    .regex(/^05\d{8}$/, "رقم الجوال يجب أن يكون بالصيغة: 05XXXXXXXX"),

  email: z.string().email("البريد الإلكتروني غير صالح"),

  title: z
    .string()
    .min(10, "عنوان الملاحظة يجب أن يحتوي على 10 أحرف على الأقل"),

  content: z
    .string()
    .min(50, "نص الملاحظة يجب أن يحتوي على 50 حرفًا على الأقل"),
});
