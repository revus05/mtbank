import { z } from "zod";

export const promotionSchema = z.object({
  partnerId: z.string().min(1, "Не выбран партнер"),
  serviceName: z.string().min(1, "Укажите услугу"),
  discount: z
    .string()
    .min(1, "Укажите скидку")
    .regex(/^(\d+%|\d+\s?(BYN|руб))$/i, "Например: 10% или 15 BYN"),
  description: z.string().min(5, "Добавьте описание"),
});

export type PromotionInput = z.infer<typeof promotionSchema>;
