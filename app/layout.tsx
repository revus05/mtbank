import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { getSession } from "shared/lib/session";
import { Toaster } from "shared/ui/sonner";
import { SiteHeader } from "widgets/layout/site-header";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "МТБанк | Партнерская программа лояльности",
  description:
    "Портал управления партнерами и акциями программы лояльности МТБанк.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="ru">
      <body
        className={`${roboto.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader role={session?.role ?? null} />
          <div className="flex grow">{children}</div>
          <footer className="mt-10 border-t border-border bg-card">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground md:px-6">
              <p className="font-medium text-foreground">МТБанк</p>
              <p>Контакт-центр: +375 (29) 509-99-99</p>
              <p>Email: info@mtbank.by</p>
              <p>Минск, Беларусь</p>
            </div>
          </footer>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
