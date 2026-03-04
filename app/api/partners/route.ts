import { listPartners } from "shared/api/mock-db";

export async function GET() {
  return Response.json({
    status: 200,
    message: "Partners fetched",
    data: listPartners(),
  });
}
