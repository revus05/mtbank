import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "mtbank_session";

export type SessionData =
  | { role: "admin" }
  | { role: "partner"; partnerId: string };

function encodeSession(session: SessionData) {
  return encodeURIComponent(JSON.stringify(session));
}

function decodeSession(raw: string) {
  return JSON.parse(decodeURIComponent(raw)) as SessionData;
}

export function serializeSession(session: SessionData) {
  return encodeSession(session);
}

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) {
    return null;
  }

  try {
    const session = decodeSession(raw);

    if (session.role === "admin") {
      return session;
    }

    if (session.role === "partner") {
      return session;
    }

    return null;
  } catch {
    return null;
  }
}
