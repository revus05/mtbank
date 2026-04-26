import { prisma } from "shared/lib/prisma";

export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { companyName: "asc" },
  });

  return Response.json({
    status: 200,
    message: "Partners fetched",
    data: partners,
  });
}
