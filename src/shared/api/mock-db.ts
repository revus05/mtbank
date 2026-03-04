import type {
  Application,
  Partner,
  PartnerAccount,
  Promotion,
} from "shared/types";

type Database = {
  applications: Application[];
  partners: Partner[];
  accounts: PartnerAccount[];
  promotions: Promotion[];
};

const seededApplications: Application[] = [
  {
    id: "app-1",
    companyName: "Coffee Point",
    email: "partner@coffeepoint.by",
    phone: "+375291112233",
    description:
      "Сеть кофеен. Хотим подключиться к программе cashback для клиентов.",
    password: "coffee123",
    status: "pending",
    createdAt: new Date("2026-02-20T09:00:00Z").toISOString(),
  },
  {
    id: "app-2",
    companyName: "Fit House",
    email: "sales@fithouse.by",
    phone: "+375293334455",
    description:
      "Фитнес-клуб с программой лояльности и скидками на абонементы.",
    password: "fithouse123",
    status: "approved",
    createdAt: new Date("2026-02-12T10:00:00Z").toISOString(),
  },
];

const seededPartners: Partner[] = [
  {
    id: "partner-1",
    companyName: "Fit House",
    email: "sales@fithouse.by",
    phone: "+375293334455",
    description:
      "Фитнес-клуб с современными тренажерными залами по всей Беларуси.",
    approvedAt: new Date("2026-02-14T13:00:00Z").toISOString(),
    loyaltyLevel: "gold",
  },
];

const seededPromotions: Promotion[] = [
  {
    id: "promo-1",
    partnerId: "partner-1",
    serviceName: "Абонемент на 1 месяц",
    discount: "10%",
    description: "Скидка по картам МТБанк для новых клиентов.",
    createdAt: new Date("2026-02-15T09:00:00Z").toISOString(),
  },
  {
    id: "promo-2",
    partnerId: "partner-1",
    serviceName: "Персональная тренировка",
    discount: "15 BYN",
    description: "Фиксированная скидка на первое занятие.",
    createdAt: new Date("2026-02-18T14:00:00Z").toISOString(),
  },
];

const seededAccounts: PartnerAccount[] = [
  {
    id: "account-1",
    partnerId: "partner-1",
    email: "sales@fithouse.by",
    password: "fithouse123",
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __mtbankDb: Database | undefined;
}

const db: Database = globalThis.__mtbankDb ?? {
  applications: seededApplications,
  partners: seededPartners,
  accounts: seededAccounts,
  promotions: seededPromotions,
};

globalThis.__mtbankDb = db;

export function listApplications() {
  return [...db.applications].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function createApplication(
  payload: Omit<Application, "id" | "status" | "createdAt">,
) {
  const item: Application = {
    ...payload,
    id: `app-${crypto.randomUUID()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.applications.push(item);
  return item;
}

export function updateApplicationStatus(
  id: string,
  status: "approved" | "rejected",
) {
  const app = db.applications.find((item) => item.id === id);

  if (!app) {
    return null;
  }

  app.status = status;

  if (status === "approved") {
    let partner = db.partners.find((item) => item.email === app.email);

    if (!partner) {
      partner = {
        id: `partner-${crypto.randomUUID()}`,
        companyName: app.companyName,
        email: app.email,
        phone: app.phone,
        description: app.description,
        approvedAt: new Date().toISOString(),
        loyaltyLevel: "silver",
      };

      db.partners.push(partner);
    }

    const accountExists = db.accounts.some(
      (account) => account.email === app.email,
    );

    if (!accountExists) {
      db.accounts.push({
        id: `account-${crypto.randomUUID()}`,
        partnerId: partner.id,
        email: app.email,
        password: app.password,
      });
    }
  }

  return app;
}

export function listPartners() {
  return [...db.partners].sort((a, b) =>
    a.companyName.localeCompare(b.companyName),
  );
}

export function getPartnerById(id: string) {
  return db.partners.find((item) => item.id === id) ?? null;
}

export function listPromotions(partnerId?: string) {
  const items = partnerId
    ? db.promotions.filter((promo) => promo.partnerId === partnerId)
    : db.promotions;

  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createPromotion(payload: Omit<Promotion, "id" | "createdAt">) {
  const item: Promotion = {
    ...payload,
    id: `promo-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
  };

  db.promotions.push(item);
  return item;
}

export function getPromotionById(id: string) {
  return db.promotions.find((promo) => promo.id === id) ?? null;
}

export function deletePromotion(id: string) {
  const index = db.promotions.findIndex((promo) => promo.id === id);

  if (index < 0) {
    return false;
  }

  db.promotions.splice(index, 1);
  return true;
}

export function validatePartnerAccount(email: string, password: string) {
  return (
    db.accounts.find(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase() &&
        account.password === password,
    ) ?? null
  );
}
