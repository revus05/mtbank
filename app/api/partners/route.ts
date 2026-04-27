import { prisma } from "shared/lib/prisma";
import { getSession } from "shared/lib/session";

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

export async function DELETE(request: Request) {
  const session = await getSession();

  if (session?.role !== "admin") {
    return Response.json(
      { status: 401, message: "Только для администратора", data: null },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { status: 400, message: "ID партнера обязателен", data: null },
      { status: 400 },
    );
  }

  await prisma.partner.delete({ where: { id } });

  return Response.json({ status: 200, message: "Partner deleted", data: null });
}
