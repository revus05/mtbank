import { LoginForm } from "features/auth/ui/login-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="mx-auto flex grow w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 py-8">
      <LoginForm />
      <p className="text-sm text-muted-foreground">
        Нет аккаунта?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Подать заявку
        </Link>
      </p>
      <p className="text-xs text-muted-foreground">
        Вход партнера доступен после одобрения заявки администратором.
      </p>
    </main>
  );
}
