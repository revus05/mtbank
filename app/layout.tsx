import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { Toaster } from "shared/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Склад Collapse.by",
  description: "Система для учета склада collapse.by.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased min-h-screen flex`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
