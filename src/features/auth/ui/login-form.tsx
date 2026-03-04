"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "shared/ui/card";
import { Input } from "shared/ui/input";
import { Label } from "shared/ui/label";
import { PasswordInput } from "shared/ui/password-input";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as {
        message: string;
        data: { redirectTo: string } | null;
      };

      if (!response.ok || !payload.data) {
        toast.error(payload.message ?? "Не удалось войти");
        return;
      }

      toast.success("Вход выполнен");
      router.push(payload.data.redirectTo);
      router.refresh();
    } catch {
      toast.error("Ошибка сети");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Вход в портал лояльности</CardTitle>
        <CardDescription>
          Вход для администратора и одобренных компаний-партнеров.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <PasswordInput id="password" name="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Войти
          </Button>
          <p className="text-xs text-muted-foreground">
            Демо админ: admin@mtbank.by / admin12345
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
