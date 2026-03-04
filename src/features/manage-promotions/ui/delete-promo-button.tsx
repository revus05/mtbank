"use client";

import { Trash2 } from "lucide-react";
import { Button } from "shared/ui/button";
import { toast } from "sonner";

export function DeletePromoButton({
  promoId,
  onDeleted,
}: {
  promoId: string;
  onDeleted: () => void;
}) {
  async function handleDelete() {
    try {
      const response = await fetch(`/api/promotions?id=${promoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Акция удалена");
      onDeleted();
    } catch {
      toast.error("Не удалось удалить акцию");
    }
  }

  return (
    <Button type="button" variant="ghost" size="icon-sm" onClick={handleDelete}>
      <Trash2 />
    </Button>
  );
}
