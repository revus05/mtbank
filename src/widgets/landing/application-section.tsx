import { SubmitApplicationForm } from "features/submit-application/ui/form";

export function ApplicationSection() {
  return (
    <section id="application" className="space-y-3 max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-semibold">Подключение партнера</h2>
      <p className="text-sm text-muted-foreground">
        Заполните форму и получите ответ от команды МТБанк после проверки.
      </p>
      <SubmitApplicationForm />
    </section>
  );
}
