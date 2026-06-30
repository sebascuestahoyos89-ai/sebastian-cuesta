"use client";

import { useState } from "react";
import { Mail, Linkedin, GraduationCap, BadgeCheck, Download, Send } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { AnchorButton } from "@/components/site/buttons";
import { profile } from "@/content/site";
import { useContent } from "@/lib/i18n";

export function ContactView() {
  const content = useContent();
  const t = content.ui.contact;
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} intro={<p>{t.intro}</p>} />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-foreground">{t.directContact}</h2>
              <div className="mt-3 space-y-2">
                {profile.emails.map((mail) => (
                  <a
                    key={mail}
                    href={`mailto:${mail}`}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0" /> {mail}
                  </a>
                ))}
              </div>
              <div className="mt-6 grid gap-3">
                <AnchorButton href={profile.links.linkedin} variant="outline">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </AnchorButton>
                <AnchorButton href={profile.links.scholar} variant="outline">
                  <GraduationCap className="h-4 w-4" /> Google Scholar
                </AnchorButton>
                <AnchorButton href={profile.links.orcid} variant="outline">
                  <BadgeCheck className="h-4 w-4" /> ORCID
                </AnchorButton>
                <AnchorButton href={profile.links.cv}>
                  <Download className="h-4 w-4" /> {content.ui.common.downloadCv}
                </AnchorButton>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">{t.sendMessage}</h2>
            {sent ? (
              <p className="mt-6 rounded-lg bg-secondary/60 p-4 text-sm text-foreground">
                {t.sentNote}
              </p>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="font-medium text-foreground">{t.name}</span>
                    <input
                      required
                      type="text"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium text-foreground">{t.email}</span>
                    <input
                      required
                      type="email"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="font-medium text-foreground">{t.message}</span>
                  <textarea
                    required
                    rows={5}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-accent px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" /> {t.send}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
