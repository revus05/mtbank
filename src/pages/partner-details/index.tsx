import Link from "next/link";
import { notFound } from "next/navigation";
import { getPartnerById, listPromotions } from "shared/api/mock-db";
import { Badge } from "shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shared/ui/table";

const levels = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

export default function PartnerDetailsPage({ id }: { id: string }) {
  const partner = getPartnerById(id);

  if (!partner) {
    notFound();
  }

  const promos = listPromotions(id);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-6">
      <Link href="/partners" className="text-sm text-primary hover:underline">
        К каталогу
      </Link>
      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">{partner.companyName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {partner.description}
            </p>
          </div>
          <Badge variant="secondary">{levels[partner.loyaltyLevel]}</Badge>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
          <p>Email: {partner.email}</p>
          <p>Телефон: {partner.phone}</p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Акции партнера</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Услуга</TableHead>
                <TableHead>Скидка</TableHead>
                <TableHead>Описание</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promos.length ? (
                promos.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">
                      {promo.serviceName}
                    </TableCell>
                    <TableCell>{promo.discount}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {promo.description}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-muted-foreground"
                  >
                    Акций пока нет
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
