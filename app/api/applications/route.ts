import { applicationSchema } from "entities/application/model/schema";
import { prisma } from "shared/lib/prisma";
import { getSession } from "shared/lib/session";

export async function GET() {
  const session = await getSession();

  if (session?.role !== "admin") {
    return Response.json(
      { status: 401, message: "Только для администратора", data: null },
      { status: 401 },
    );
  }

  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json({
    status: 200,
    message: "Applications fetched",
    data: applications,
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = applicationSchema.safeParse(payload);

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

  const created = await prisma.application.create({ data: parsed.data });

  return Response.json(
    {
      status: 201,
      message: "Application created",
      data: created,
    },
    { status: 201 },
  );
}
