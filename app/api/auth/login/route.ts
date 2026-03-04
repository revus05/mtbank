import { cookies } from "next/headers";
import { validatePartnerAccount } from "shared/api/mock-db";
import { ADMIN_CREDENTIALS } from "shared/lib/auth";
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

  if (
    email.toLowerCase() === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
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

  const account = validatePartnerAccount(email, password);

  if (!account) {
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
