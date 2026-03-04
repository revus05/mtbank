"use client";

import { Check } from "lucide-react";
import { Button } from "shared/ui/button";
import { toast } from "sonner";

export function ApproveButton({
  applicationId,
  onComplete,
}: {
  applicationId: string;
  onComplete: () => void;
}) {
  async function handleApprove() {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Заявка одобрена");
      onComplete();
    } catch {
      toast.error("Не удалось одобрить заявку");
    }
  }

  return (
    <Button type="button" size="sm" onClick={handleApprove}>
      <Check />
      Одобрить
    </Button>
  );
}
