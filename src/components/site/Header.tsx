"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { profile } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BenzeneMark } from "@/components/site/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, content } = useLang();

  const nav = [
    { to: "/about", label: content.ui.nav.about },
    { to: "/projects", label: content.ui.nav.work },
    { to: "/notes", label: content.ui.nav.notes },
    { to: "/contact", label: content.ui.nav.contact },
  ] as const;

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-display text-base font-bold tracking-tight text-foreground"
        >
          <BenzeneMark className="h-8 w-8 shrink-0 text-primary" />
          <span className="truncate">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                isActive(item.to) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language toggle — switches the active content bundle (EN / ES). */}
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            title={lang === "en" ? "Cambiar a español" : "Switch to English"}
            aria-label="Toggle language"
            className="inline-flex items-center rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className={cn(lang === "en" && "text-foreground")}>EN</span>
            <span className="mx-1 opacity-40">/</span>
            <span className={cn(lang === "es" && "text-foreground")}>ES</span>
          </button>
          <a
            href={profile.links.cv}
            className="hidden items-center gap-2 rounded-md bg-gradient-accent px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <Download className="h-4 w-4" /> {content.ui.common.downloadCv}
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 bg-background lg:hidden",
          open ? "max-h-[28rem]" : "max-h-0",
          "transition-[max-height] duration-300",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium",
                isActive(item.to)
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.links.cv}
            className="mt-1 inline-flex items-center gap-2 rounded-md bg-gradient-accent px-3.5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Download className="h-4 w-4" /> {content.ui.common.downloadCv}
          </a>
        </nav>
      </div>
    </header>
  );
}
