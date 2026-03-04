import { getPartnerById } from "shared/api/mock-db";
import { PartnerPromoManager } from "widgets/partner/partner-promo-manager";

export default function DashboardPage({ partnerId }: { partnerId: string }) {
  const currentPartner = getPartnerById(partnerId);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <header>
        <div>
          <h1 className="text-2xl font-semibold">Кабинет партнера</h1>
          <p className="text-sm text-muted-foreground">
            {currentPartner ? currentPartner.companyName : "Партнер не выбран"}
          </p>
        </div>
      </header>
      {currentPartner ? (
        <PartnerPromoManager partnerId={currentPartner.id} />
      ) : (
        <p className="text-sm text-muted-foreground">
          Нет одобренных партнеров.
        </p>
      )}
    </main>
  );
}
