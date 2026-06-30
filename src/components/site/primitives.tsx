import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-gradient-hero">
      <Container className="py-14 sm:py-20">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {intro && (
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {intro}
          </div>
        )}
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
    </div>
  );
}
