import Link from "next/link";
import type { Partner } from "shared/types";
import { Badge } from "shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "shared/ui/card";

const levelLabels: Record<Partner["loyaltyLevel"], string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{partner.companyName}</CardTitle>
          <Badge variant="secondary">{levelLabels[partner.loyaltyLevel]}</Badge>
        </div>
        <CardDescription>{partner.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{partner.phone}</p>
        <Link
          href={`/partners/${partner.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Открыть профиль партнера
        </Link>
      </CardContent>
    </Card>
  );
}
