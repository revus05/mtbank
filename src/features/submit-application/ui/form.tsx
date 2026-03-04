"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ApplicationInput,
  applicationSchema,
} from "entities/application/model/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card";
import { Input } from "shared/ui/input";
import { Label } from "shared/ui/label";
import { PasswordInput } from "shared/ui/password-input";
import { Textarea } from "shared/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { submitApplication } from "../api/use-submit-app";

const applicationFormSchema = applicationSchema
  .extend({
    confirmPassword: z.string().min(6, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export function SubmitApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      description: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const payload: ApplicationInput = {
        companyName: values.companyName,
        email: values.email,
        phone: values.phone,
        description: values.description,
        password: values.password,
      };

      await submitApplication(payload);
      toast.success("Заявка отправлена");
      reset();
    } catch {
      toast.error("Не удалось отправить заявку");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Подать заявку на подключение</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="companyName">Название компании</Label>
            <Input id="companyName" {...register("companyName")} />
            {errors.companyName ? (
              <p className="text-sm text-destructive">
                {errors.companyName.message}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email ? (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                placeholder="+375291112233"
                {...register("phone")}
              />
              {errors.phone ? (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Опишите ваш бизнес и предложение по лояльности"
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль для кабинета</Label>
              <PasswordInput id="password" {...register("password")} />
              {errors.password ? (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <PasswordInput
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            Отправить заявку
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
