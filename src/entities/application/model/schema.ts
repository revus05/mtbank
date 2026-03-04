import { z } from "zod";

export const applicationSchema = z.object({
  companyName: z.string().min(2, "Название компании минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().regex(/^\+?\d{9,15}$/, "Телефон в формате +375XXXXXXXXX"),
  description: z.string().min(10, "Описание минимум 10 символов"),
  password: z
    .string()
    .min(6, "Пароль минимум 6 символов")
    .max(64, "Пароль слишком длинный"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
