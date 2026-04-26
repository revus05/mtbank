import { prisma } from "shared/lib/prisma";
import { getSession } from "shared/lib/session";
import { z } from "zod";

const bodySchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (session?.role !== "admin") {
    return Response.json(
      { status: 401, message: "Только для администратора", data: null },
      { status: 401 },
    );
  }

  const { id } = await params;
  const payload = await request.json();
  const parsed = bodySchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        status: 400,
        message: "Validation error",
        data: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const app = await prisma.application.findUnique({ where: { id } });

  if (!app) {
    return Response.json(
      { status: 404, message: "Application not found", data: null },
      { status: 404 },
    );
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.application.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    if (parsed.data.status === "approved") {
      const partner = await tx.partner.upsert({
        where: { email: app.email },
        create: {
          companyName: app.companyName,
          email: app.email,
          phone: app.phone,
          description: app.description,
          approvedAt: new Date(),
          loyaltyLevel: "silver",
        },
        update: {},
      });

      await tx.partnerAccount.upsert({
        where: { email: app.email },
        create: {
          partnerId: partner.id,
          email: app.email,
          password: app.password,
        },
        update: {},
      });
    }

    return result;
  });

  return Response.json({
    status: 200,
    message: "Application updated",
    data: updated,
  });
}
