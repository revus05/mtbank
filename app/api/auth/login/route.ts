import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "shared/lib/prisma";
import { SESSION_COOKIE_NAME, serializeSession } from "shared/lib/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      { status: 400, message: "Некорректные данные входа", data: null },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;
  const cookieStore = await cookies();

  const admin = await prisma.admin.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    cookieStore.set(SESSION_COOKIE_NAME, serializeSession({ role: "admin" }), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return Response.json({
      status: 200,
      message: "Вход выполнен",
      data: { redirectTo: "/admin" },
    });
  }

  const account = await prisma.partnerAccount.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });

  if (!account || account.password !== password) {
    return Response.json(
      {
        status: 401,
        message:
          "Неверный логин или пароль. Вход доступен только после одобрения заявки.",
        data: null,
      },
      { status: 401 },
    );
  }

  cookieStore.set(
    SESSION_COOKIE_NAME,
    serializeSession({ role: "partner", partnerId: account.partnerId }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    },
  );

  return Response.json({
    status: 200,
    message: "Вход выполнен",
    data: { redirectTo: "/dashboard" },
  });
}
