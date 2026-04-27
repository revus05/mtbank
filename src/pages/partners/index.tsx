import { prisma } from "shared/lib/prisma";
import { PartnerCatalogTable } from "widgets/public/partner-catalog-table";

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { companyName: "asc" },
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <header>
        <h1 className="text-2xl font-semibold">Каталог партнеров МТБанк</h1>
      </header>
      <PartnerCatalogTable partners={partners} />
    </main>
  );
}
