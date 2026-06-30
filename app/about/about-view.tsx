"use client";

import { GraduationCap, Award, Briefcase, Users, CheckCircle2 } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { useContent } from "@/lib/i18n";

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Award;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-accent text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function AboutView() {
  const content = useContent();
  const t = content.ui.about;
  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={<p>{t.intro}</p>} />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/30 bg-gradient-hero p-6 shadow-soft lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t.currentRole}
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">{content.profile.role}</p>
          </div>

          <Card icon={GraduationCap} title={t.education}>
            <ul className="space-y-4">
              {content.education.map((e) => (
                <li key={e.degree}>
                  <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Briefcase} title={t.background}>
            <ul className="space-y-3">
              {content.professionalBackground.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Award} title={t.awards}>
            <ul className="space-y-3">
              {content.awards.map((a) => (
                <li key={a} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Users} title={t.mentoring}>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.mentoringText}</p>
          </Card>
        </Container>
      </section>
    </>
  );
}
