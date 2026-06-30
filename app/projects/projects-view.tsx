"use client";

import { useState } from "react";
import { GraduationCap, BadgeCheck, Linkedin } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { AnchorButton } from "@/components/site/buttons";
import { ProjectCard } from "@/components/site/ProjectCard";
import { PublicationCard } from "@/components/site/PublicationCard";
import { profile, type ThemeId } from "@/content/site";
import { useContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tab = "projects" | "publications";

export function ProjectsView() {
  const content = useContent();
  const w = content.ui.work;
  const [tab, setTab] = useState<Tab>("projects");
  const [theme, setTheme] = useState<ThemeId | "all">("all");

  const themeIdsFor = (t: Tab): Set<ThemeId> =>
    new Set(
      t === "projects"
        ? content.projects.map((p) => p.themeId)
        : content.publications.map((p) => p.themeId),
    );
  const availableThemes = content.themes.filter((t) => themeIdsFor(tab).has(t.id));

  // Switching tab: keep the active theme only if it also exists in the new tab.
  const switchTab = (next: Tab) => {
    if (next === tab) return;
    if (theme !== "all" && !themeIdsFor(next).has(theme)) setTheme("all");
    setTab(next);
  };

  const projectList =
    theme === "all" ? content.projects : content.projects.filter((p) => p.themeId === theme);
  const pubList =
    theme === "all"
      ? content.publications
      : content.publications.filter((p) => p.themeId === theme);

  const tabClass = (t: Tab) =>
    cn(
      "-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors",
      tab === t
        ? "border-primary text-foreground"
        : "border-transparent text-muted-foreground hover:text-foreground",
    );

  return (
    <>
      <PageHeader eyebrow={w.eyebrow} title={w.title} intro={<p>{w.intro}</p>} />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex gap-2 border-b border-border">
            <button type="button" onClick={() => switchTab("projects")} className={tabClass("projects")}>
              {w.tabProjects}
            </button>
            <button
              type="button"
              onClick={() => switchTab("publications")}
              className={tabClass("publications")}
            >
              {w.tabPublications}
            </button>
          </div>

          {tab === "publications" && (
            <div className="mt-8 flex flex-wrap gap-3">
              <AnchorButton href={profile.links.scholar} variant="outline">
                <GraduationCap className="h-4 w-4" /> Google Scholar
              </AnchorButton>
              <AnchorButton href={profile.links.orcid} variant="outline">
                <BadgeCheck className="h-4 w-4" /> ORCID
              </AnchorButton>
              <AnchorButton href={profile.links.linkedin} variant="outline">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </AnchorButton>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTheme("all")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                theme === "all"
                  ? "bg-gradient-accent text-primary-foreground"
                  : "border border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {w.all}
            </button>
            {availableThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  theme === t.id
                    ? "bg-gradient-accent text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "projects" ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectList.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {pubList.map((pub) => (
                  <PublicationCard key={pub.title} pub={pub} />
                ))}
              </div>
              <p className="mt-10 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                {content.ui.publications.footer}
              </p>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
