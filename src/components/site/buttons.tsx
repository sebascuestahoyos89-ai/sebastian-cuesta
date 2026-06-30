import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all";

const variants = {
  primary: "bg-gradient-accent text-primary-foreground shadow-soft hover:-translate-y-0.5",
  outline: "border border-border bg-background text-foreground hover:bg-secondary",
  soft: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
} as const;

type Variant = keyof typeof variants;

export function LinkButton({
  to,
  variant = "primary",
  className,
  children,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={to} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function AnchorButton({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
}
