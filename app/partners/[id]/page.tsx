import PartnerDetailsPage from "pages/partner-details";

export default async function PartnerDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PartnerDetailsPage id={id} />;
}
