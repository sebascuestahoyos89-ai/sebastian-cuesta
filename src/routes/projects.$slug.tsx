import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { LinkButton } from "@/components/site/buttons";
import { en } from "@/content/site";
import { useContent } from "@/lib/i18n";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = en.projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { slug: project.slug, project };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.project.title ?? "Project";
    return {
      meta: [
        { title: `${t} — Sebastian Cuesta Hoyos` },
        { name: "description", content: loaderData?.project.short ?? "" },
        { property: "og:title", content: `${t} — Sebastian Cuesta Hoyos` },
        { property: "og:description", content: loaderData?.project.short ?? "" },
        { property: "og:url", content: `/projects/${loaderData?.project.slug ?? ""}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/projects/${loaderData?.project.slug ?? ""}` }],
    };
  },
  notFoundComponent: () => <ProjectNotFound />,
  errorComponent: () => <ProjectNotFound />,
  component: ProjectDetail,
});

function ProjectNotFound() {
  const content = useContent();
  return (
    <Container className="py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">{content.ui.projects.notFound}</h1>
      <p className="mt-3 text-muted-foreground">{content.ui.projects.notFoundText}</p>
      <div className="mt-6 flex justify-center">
        <LinkButton to="/projects">{content.ui.projects.backToProjects}</LinkButton>
      </div>
    </Container>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function ProjectDetail() {
  const { slug } = Route.useLoaderData();
  const content = useContent();
  const t = content.ui.projects;
  const project = content.projects.find((p) => p.slug === slug) ?? content.projects[0];

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container className="py-12 sm:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> {t.backToProjects}
          </Link>
          {project.draft && (
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
              {t.currentWork}
            </span>
          )}
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.short}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.keywords.map((k: string) => (
              <span
                key={k}
                className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-foreground"
              >
                {k}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <Block title={t.overview}>{project.overview}</Block>
            <Block title={t.question}>{project.question}</Block>
            <Block title={t.whyItMatters}>{project.whyItMatters}</Block>
            <Block title={t.approach}>{project.approach}</Block>
            <Block title={t.relevance}>{project.relevance}</Block>
            <Block title={t.outputs}>{project.outputs}</Block>

            {project.articles && project.articles.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {content.ui.common.relatedArticles}
                </h2>
                <ul className="mt-3 space-y-3">
                  {project.articles.map((a) => (
                    <li key={a.url}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 rounded-lg border border-border bg-card p-4 text-sm text-foreground shadow-soft transition-colors hover:border-primary/40"
                      >
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="font-medium leading-snug group-hover:text-primary">
                          {a.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-base font-bold text-foreground">{t.methods}</h2>
              <ul className="mt-4 space-y-2.5">
                {project.methods.map((m: string) => (
                  <li key={m} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-base font-bold text-foreground">{t.skills}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((s: string) => (
                  <span
                    key={s}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <LinkButton to="/publications" variant="outline" className="w-full">
              {t.viewPublications}
            </LinkButton>
          </aside>
        </Container>
      </section>
    </>
  );
}
