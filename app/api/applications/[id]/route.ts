import { updateApplicationStatus } from "shared/api/mock-db";
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

  const updated = updateApplicationStatus(id, parsed.data.status);

  if (!updated) {
    return Response.json(
      { status: 404, message: "Application not found", data: null },
      { status: 404 },
    );
  }

  return Response.json({
    status: 200,
    message: "Application updated",
    data: updated,
  });
}
