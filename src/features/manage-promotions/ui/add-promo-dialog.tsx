"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type PromotionInput,
  promotionSchema,
} from "entities/promotion/model/schema";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";
import { Input } from "shared/ui/input";
import { Label } from "shared/ui/label";
import { Textarea } from "shared/ui/textarea";
import { toast } from "sonner";

export function AddPromoDialog({
  partnerId,
  onCreated,
}: {
  partnerId: string;
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PromotionInput>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      partnerId,
      serviceName: "",
      discount: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Акция добавлена");
      onCreated();
      reset({ partnerId, serviceName: "", discount: "", description: "" });
      setOpen(false);
    } catch {
      toast.error("Не удалось добавить акцию");
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <Plus />
          Добавить акцию
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Новая акция</DialogTitle>
          <DialogDescription>
            Укажите параметры скидки для клиентов МТБанк.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input type="hidden" {...register("partnerId")} />
          <div className="space-y-2">
            <Label htmlFor="serviceName">Услуга</Label>
            <Input id="serviceName" {...register("serviceName")} />
            {errors.serviceName ? (
              <p className="text-sm text-destructive">
                {errors.serviceName.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Скидка</Label>
            <Input
              id="discount"
              placeholder="10% или 15 BYN"
              {...register("discount")}
            />
            {errors.discount ? (
              <p className="text-sm text-destructive">
                {errors.discount.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" rows={3} {...register("description")} />
            {errors.description ? (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
