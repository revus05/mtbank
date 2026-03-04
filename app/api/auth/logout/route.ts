import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "shared/lib/session";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  return Response.json({
    status: 200,
    message: "Выход выполнен",
    data: null,
  });
}
