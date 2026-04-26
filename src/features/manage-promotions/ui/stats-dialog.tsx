"use client";

import { BarChart3 } from "lucide-react";
import { useState } from "react";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";

export function StatsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <BarChart3 />
          Просмотр статистики
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Статистика</DialogTitle>
          <DialogDescription>
            Просмотр статистики по транзакциям и начисленным бонусам скоро будет
            доступен.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
