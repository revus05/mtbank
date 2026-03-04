import type { ApplicationStatus } from "shared/types";
import { Badge } from "shared/ui/badge";

const labels: Record<ApplicationStatus, string> = {
  pending: "На рассмотрении",
  approved: "Одобрена",
  rejected: "Отклонена",
};

const variants: Record<
  ApplicationStatus,
  "outline" | "default" | "destructive"
> = {
  pending: "outline",
  approved: "default",
  rejected: "destructive",
};

export function AppStatusBadge({ status }: { status: ApplicationStatus }) {
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
