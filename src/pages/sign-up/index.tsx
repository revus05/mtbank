import { SubmitApplicationForm } from "features/submit-application/ui/form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex grow w-full max-w-3xl flex-col justify-center gap-6 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Регистрация партнера</h1>
        <p className="text-sm text-muted-foreground">
          Для доступа в кабинет отправьте заявку. После одобрения используйте
          указанные email и пароль для входа.
        </p>
      </div>
      <SubmitApplicationForm />
      <Link href="/sign-in" className="text-sm text-primary hover:underline">
        Уже есть доступ? Войти
      </Link>
    </main>
  );
}
