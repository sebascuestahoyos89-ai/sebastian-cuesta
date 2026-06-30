import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { LinkButton } from "@/components/site/buttons";
import { projects } from "@/content/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
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
  notFoundComponent: () => (
    <Container className="py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
      <p className="mt-3 text-muted-foreground">This project doesn't exist or has been moved.</p>
      <div className="mt-6 flex justify-center">
        <LinkButton to="/projects">Back to projects</LinkButton>
      </div>
    </Container>
  ),
  errorComponent: () => (
    <Container className="py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">This page didn't load</h1>
      <div className="mt-6 flex justify-center">
        <LinkButton to="/projects">Back to projects</LinkButton>
      </div>
    </Container>
  ),
  component: ProjectDetail,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-gradient-hero">
        <Container className="py-12 sm:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
          {project.draft && (
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
              Current work
            </span>
          )}
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.short}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.keywords.map((k) => (
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
            <Block title="Overview">{project.overview}</Block>
            <Block title="Scientific question">{project.question}</Block>
            <Block title="Why it matters">{project.whyItMatters}</Block>
            <Block title="Approach">{project.approach}</Block>
            <Block title="Relevance to biotech/pharma">{project.relevance}</Block>
            <Block title="Selected outputs / publications">{project.outputs}</Block>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-base font-bold text-foreground">Methods & tools</h2>
              <ul className="mt-4 space-y-2.5">
                {project.methods.map((m) => (
                  <li key={m} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-base font-bold text-foreground">Skills demonstrated</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((s) => (
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
              View publications
            </LinkButton>
          </aside>
        </Container>
      </section>
    </>
  );
}
