import { listPartners } from "shared/api/mock-db";
import { PartnerCatalogTable } from "widgets/public/partner-catalog-table";

export default function PartnersPage() {
  const partners = listPartners();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <header>
        <h1 className="text-2xl font-semibold">Каталог партнеров МТБанк</h1>
      </header>
      <PartnerCatalogTable partners={partners} />
    </main>
  );
}
