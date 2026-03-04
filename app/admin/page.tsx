import { redirect } from "next/navigation";
import AdminPage from "pages/admin";
import { getSession } from "shared/lib/session";

export default async function AdminRoute() {
  const session = await getSession();

  if (session?.role !== "admin") {
    redirect("/sign-in");
  }

  return <AdminPage />;
}
