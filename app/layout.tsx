import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { getSession } from "shared/lib/session";
import { Toaster } from "shared/ui/sonner";
import { SiteHeader } from "widgets/layout/site-header";
import "./globals.css";
import Image from "next/image";
import logoFull from "../public/logo-full.svg";

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
            <div className="grid sm:grid-cols-2 grid-cols-1 items-center mx-auto w-full max-w-6xl px-4 py-6 text-sm text-muted-foreground md:px-6">
              <Image
                src={logoFull}
                alt="logo"
                className="sm:max-w-100 w-full"
              />
              <div className="flex flex-col gap-1">
                <p className="font-medium text-foreground">МТБанк</p>
                <p>Контакт-центр: +375 (29) 509-99-99</p>
                <p>Email: info@mtbank.by</p>
                <p>Минск, Беларусь</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
