import { promotionSchema } from "entities/promotion/model/schema";
import {
  createPromotion,
  deletePromotion,
  getPromotionById,
  listPromotions,
} from "shared/api/mock-db";
import { getSession } from "shared/lib/session";

export async function GET(request: Request) {
  const session = await getSession();

  if (session?.role !== "partner") {
    return Response.json(
      { status: 401, message: "Только для партнера", data: null },
      { status: 401 },
    );
  }

  const partnerId =
    new URL(request.url).searchParams.get("partnerId") ?? session.partnerId;

  if (partnerId !== session.partnerId) {
    return Response.json(
      { status: 403, message: "Недостаточно прав", data: null },
      { status: 403 },
    );
  }

  return Response.json({
    status: 200,
    message: "Promotions fetched",
    data: listPromotions(partnerId),
  });
}

export async function POST(request: Request) {
  const session = await getSession();

  if (session?.role !== "partner") {
    return Response.json(
      { status: 401, message: "Только для партнера", data: null },
      { status: 401 },
    );
  }

  const payload = await request.json();
  const parsed = promotionSchema.safeParse(payload);

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

  if (parsed.data.partnerId !== session.partnerId) {
    return Response.json(
      { status: 403, message: "Недостаточно прав", data: null },
      { status: 403 },
    );
  }

  const created = createPromotion(parsed.data);

  return Response.json(
    {
      status: 201,
      message: "Promotion created",
      data: created,
    },
    { status: 201 },
  );
}

export async function DELETE(request: Request) {
  const session = await getSession();

  if (session?.role !== "partner") {
    return Response.json(
      { status: 401, message: "Только для партнера", data: null },
      { status: 401 },
    );
  }

  const id = new URL(request.url).searchParams.get("id");

  if (!id) {
    return Response.json(
      { status: 400, message: "Promotion id is required", data: null },
      { status: 400 },
    );
  }

  const promo = getPromotionById(id);

  if (!promo) {
    return Response.json(
      { status: 404, message: "Promotion not found", data: null },
      { status: 404 },
    );
  }

  if (promo.partnerId !== session.partnerId) {
    return Response.json(
      { status: 403, message: "Недостаточно прав", data: null },
      { status: 403 },
    );
  }

  const deleted = deletePromotion(id);

  if (!deleted) {
    return Response.json(
      { status: 404, message: "Promotion not found", data: null },
      { status: 404 },
    );
  }

  return Response.json({
    status: 200,
    message: "Promotion deleted",
    data: { id },
  });
}
