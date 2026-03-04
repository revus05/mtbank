"use client";

import { PromoRow } from "entities/promotion/ui/promo-row";
import { AddPromoDialog } from "features/manage-promotions/ui/add-promo-dialog";
import { useCallback, useEffect, useState } from "react";
import type { Promotion } from "shared/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";

export function PartnerPromoManager({ partnerId }: { partnerId: string }) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPromotions = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`/api/promotions?partnerId=${partnerId}`, {
      cache: "no-store",
    });
    const payload = (await response.json()) as { data: Promotion[] };
    setPromotions(payload.data);
    setLoading(false);
  }, [partnerId]);

  useEffect(() => {
    void loadPromotions();
  }, [loadPromotions]);

  async function deletePromo(id: string) {
    await fetch(`/api/promotions?id=${id}`, { method: "DELETE" });
    await loadPromotions();
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Управление акциями</h2>
        <AddPromoDialog partnerId={partnerId} onCreated={loadPromotions} />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Услуга</TableHead>
              <TableHead>Скидка</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : promotions.length ? (
              promotions.map((promo) => (
                <PromoRow key={promo.id} promo={promo} onDelete={deletePromo} />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  Пока нет добавленных акций
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
