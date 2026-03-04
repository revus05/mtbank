import { Banknote, ChartColumnIncreasing, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card";

const benefits = [
  {
    title: "Рост клиентского потока",
    description: "Ваши предложения видят клиенты МТБанк в едином каталоге.",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Гибкие скидки и кешбэк",
    description: "Поддержка процентных и фиксированных механик лояльности.",
    icon: Banknote,
  },
  {
    title: "Контроль и безопасность",
    description: "Заявки проходят модерацию, изменения фиксируются в системе.",
    icon: ShieldCheck,
  },
];

export function BenefitsGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {benefits.map((benefit) => (
        <Card key={benefit.title}>
          <CardHeader>
            <benefit.icon className="size-5 text-primary" />
            <CardTitle className="text-base">{benefit.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {benefit.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
