"use client";

import { X } from "lucide-react";
import { Button } from "shared/ui/button";
import { toast } from "sonner";

export function RejectButton({
  applicationId,
  onComplete,
}: {
  applicationId: string;
  onComplete: () => void;
}) {
  async function handleReject() {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Заявка отклонена");
      onComplete();
    } catch {
      toast.error("Не удалось отклонить заявку");
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleReject}>
      <X />
      Отклонить
    </Button>
  );
}
