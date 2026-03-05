import { Building2, HandCoins } from "lucide-react";
import Link from "next/link";
import { Button } from "shared/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border px-6 py-12 text-white md:px-10 [background:var(--mtbank-gradient)]">
      <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 size-52 rounded-full bg-white/20 blur-3xl" />
      <div className="relative z-10 max-w-2xl space-y-5">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
          <HandCoins className="size-4" />
          МТБанк Loyalty Platform
        </p>
        <h1 className="text-3xl font-bold md:text-5xl">
          Привлекайте клиентов банка через единую систему лояльности
        </h1>
        <p className="text-sm text-white/90 md:text-base">
          Подключайте бизнес, запускайте акции и управляйте спецпредложениями
          для клиентов МТБанк.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="secondary"
            className="bg-white text-[#1b74fd] hover:bg-white/90"
          >
            <Link href="/sign-up">Стать партнером</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <Link href="/partners">
              <Building2 />
              Каталог партнеров
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
