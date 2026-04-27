"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";
import { toast } from "sonner";

export function DeletePartnerButton({
  partnerId,
  companyName,
  onDeleted,
  redirectTo,
}: {
  partnerId: string;
  companyName: string;
  onDeleted?: () => void;
  redirectTo?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const response = await fetch(`/api/partners?id=${partnerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Партнер удален");
      setOpen(false);
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        onDeleted?.();
      }
    } catch {
      toast.error("Не удалось удалить партнера");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить партнера</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите удалить <strong>{companyName}</strong>? Это
            действие необратимо — все акции и аккаунты партнера также будут
            удалены.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
