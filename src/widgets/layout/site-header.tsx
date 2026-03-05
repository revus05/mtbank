"use client";

import {
  Building2,
  ClipboardPlus,
  House,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentType } from "react";
import { Button } from "shared/ui/button";
import logo from "../../../public/logo.svg";

type HeaderRole = "admin" | "partner" | null;

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  match: (pathname: string) => boolean;
};

const commonItems: NavItem[] = [
  {
    href: "/",
    label: "Главная",
    icon: House,
    match: (pathname) => pathname === "/",
  },
  {
    href: "/partners",
    label: "Партнеры",
    icon: Building2,
    match: (pathname) => pathname.startsWith("/partners"),
  },
];

const guestItems: NavItem[] = [
  {
    href: "/sign-up",
    label: "Заявка",
    icon: ClipboardPlus,
    match: (pathname) => pathname === "/sign-up",
  },
  {
    href: "/sign-in",
    label: "Вход",
    icon: LogIn,
    match: (pathname) => pathname === "/sign-in",
  },
];

const adminItems: NavItem[] = [
  {
    href: "/admin",
    label: "Админ",
    icon: ShieldCheck,
    match: (pathname) => pathname.startsWith("/admin"),
  },
];

const partnerItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Кабинет",
    icon: LayoutDashboard,
    match: (pathname) => pathname.startsWith("/dashboard"),
  },
];

function HeaderLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="gap-1.5"
    >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">Выйти</span>
    </Button>
  );
}

export function SiteHeader({ role }: { role: HeaderRole }) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const items = [
    ...commonItems,
    ...(role === "admin" ? adminItems : []),
    ...(role === "partner" ? partnerItems : []),
    ...(role ? [] : guestItems),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-2 md:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src={logo} alt="logo" className="h-5 w-fit" />
          <span className="hidden text-sm font-semibold sm:inline">
            Партнерская программа
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {items.map((item) => {
            const active = item.match(currentPath);

            return (
              <Button
                key={item.href}
                asChild
                variant={active ? "default" : "ghost"}
                size="sm"
              >
                <Link href={item.href} className="gap-1.5">
                  <item.icon className="size-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          {role ? <HeaderLogoutButton /> : null}
        </nav>
      </div>
    </header>
  );
}
