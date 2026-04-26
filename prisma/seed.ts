import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "shared/lib/prisma";

async function seed() {
  const [appCount, partnerCount, adminCount] = await Promise.all([
    prisma.application.count(),
    prisma.partner.count(),
    prisma.admin.count(),
  ]);

  if (appCount === 0) {
    await prisma.application.createMany({
      data: [
        {
          id: "app-1",
          companyName: "Coffee Point",
          email: "partner@coffeepoint.by",
          unp: "123456789",
          phone: "+375291112233",
          description:
            "Сеть кофеен. Хотим подключиться к программе cashback для клиентов.",
          password: "coffee123",
          status: "pending",
          createdAt: new Date("2026-02-20T09:00:00Z"),
        },
        {
          id: "app-2",
          companyName: "Fit House",
          email: "sales@fithouse.by",
          unp: "123456789",
          phone: "+375293334455",
          description:
            "Фитнес-клуб с программой лояльности и скидками на абонементы.",
          password: "fithouse123",
          status: "approved",
          createdAt: new Date("2026-02-12T10:00:00Z"),
        },
      ],
    });
    console.log("Seeded applications");
  } else {
    console.log(`Skipped applications (${appCount} already exist)`);
  }

  if (partnerCount === 0) {
    const partner = await prisma.partner.create({
      data: {
        id: "partner-1",
        companyName: "Fit House",
        email: "sales@fithouse.by",
        phone: "+375293334455",
        description:
          "Фитнес-клуб с современными тренажерными залами по всей Беларуси.",
        approvedAt: new Date("2026-02-14T13:00:00Z"),
        loyaltyLevel: "gold",
        promotions: {
          createMany: {
            data: [
              {
                id: "promo-1",
                serviceName: "Абонемент на 1 месяц",
                discount: "10%",
                description: "Скидка по картам МТБанк для новых клиентов.",
                createdAt: new Date("2026-02-15T09:00:00Z"),
              },
              {
                id: "promo-2",
                serviceName: "Персональная тренировка",
                discount: "15 BYN",
                description: "Фиксированная скидка на первое занятие.",
                createdAt: new Date("2026-02-18T14:00:00Z"),
              },
            ],
          },
        },
        accounts: {
          create: {
            id: "account-1",
            email: "sales@fithouse.by",
            password: "fithouse123",
          },
        },
      },
    });
    console.log(`Seeded partner: ${partner.companyName}`);
  } else {
    console.log(`Skipped partners (${partnerCount} already exist)`);
  }

  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash("admin12345", 10);
    await prisma.admin.create({
      data: {
        email: "admin@mtbank.by",
        password: hashedPassword,
      },
    });
    console.log("Seeded admin: admin@mtbank.by");
  } else {
    console.log(`Skipped admin (${adminCount} already exist)`);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
