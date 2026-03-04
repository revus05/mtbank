import { redirect } from "next/navigation";
import DashboardPage from "pages/dashboard";
import { getSession } from "shared/lib/session";

export default async function DashboardRoute() {
  const session = await getSession();

  if (session?.role !== "partner") {
    redirect("/sign-in");
  }

  return <DashboardPage partnerId={session.partnerId} />;
}
