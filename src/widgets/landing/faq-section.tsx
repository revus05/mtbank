"use client";

import { ChevronDown, CircleHelp } from "lucide-react";
import { useState } from "react";
import { cn } from "shared/lib";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card";

const faqItems = [
  {
    question: "Кто может стать партнером программы?",
    answer:
      "Любая компания или ИП, оказывающие услуги или продающие товары на территории Беларуси.",
  },
  {
    question: "Сколько занимает рассмотрение заявки?",
    answer:
      "Обычно 1-3 рабочих дня. После модерации вы получите решение и доступ в личный кабинет.",
  },
  {
    question: "Как добавить акцию после одобрения?",
    answer:
      "Войдите в личный кабинет партнера и создайте запись с названием услуги и размером скидки.",
  },
  {
    question: "Можно ли изменить или удалить акцию?",
    answer:
      "Да, партнер управляет своими акциями самостоятельно: может добавлять и удалять предложения в кабинете.",
  },
  {
    question: "Где клиенты видят предложения партнеров?",
    answer:
      "Все одобренные компании и их условия отображаются в общем каталоге партнеров на портале.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-3 max-w-3xl mx-auto">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        <CircleHelp className="size-6 text-primary" />
        FAQ по партнерской программе
      </h2>
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <Card
            key={item.question}
            onClick={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          >
            <CardHeader className="pb-6">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <CardTitle className="text-base">{item.question}</CardTitle>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform",
                    openIndex === index ? "rotate-180" : "",
                  )}
                />
              </button>
            </CardHeader>
            <div
              className={cn(
                "grid transition-all duration-200",
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
