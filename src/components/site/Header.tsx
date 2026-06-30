import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Download } from "lucide-react";
import { profile } from "@/content/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/research", label: "Research / Expertise" },
  { to: "/projects", label: "Projects" },
  { to: "/publications", label: "Publications" },
  { to: "/notes", label: "Scientific Notes" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 font-display text-base font-bold tracking-tight text-foreground"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-accent text-sm font-bold text-primary-foreground">
            SC
          </span>
          <span className="truncate">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language toggle placeholder — Spanish content can be wired here later. */}
          <button
            type="button"
            disabled
            title="Español coming soon"
            className="hidden rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-muted-foreground sm:inline-flex"
          >
            EN <span className="mx-1 opacity-40">/</span> ES
          </button>
          <a
            href={profile.links.cv}
            className="hidden items-center gap-2 rounded-md bg-gradient-accent px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <Download className="h-4 w-4" /> Download CV
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
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={profile.links.cv}
            className="mt-1 inline-flex items-center gap-2 rounded-md bg-gradient-accent px-3.5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
