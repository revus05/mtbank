import { Trash2 } from "lucide-react";
import type { Promotion } from "shared/types";
import { Button } from "shared/ui/button";
import { TableCell, TableRow } from "shared/ui/table";

export function PromoRow({
  promo,
  onDelete,
}: {
  promo: Promotion;
  onDelete?: (id: string) => void;
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{promo.serviceName}</TableCell>
      <TableCell>{promo.discount}</TableCell>
      <TableCell className="text-muted-foreground">
        {promo.description}
      </TableCell>
      <TableCell className="text-right">
        {onDelete ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(promo.id)}
            aria-label="Удалить акцию"
          >
            <Trash2 />
          </Button>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
