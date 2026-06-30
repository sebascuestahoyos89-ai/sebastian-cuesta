import { createFileRoute } from "@tanstack/react-router";
import { Download, Linkedin, Mail, Award, FileText, Clock, FlaskConical, BriefcaseBusiness } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import headshot from "@/assets/headshot.jpg";
import { Container, SectionHeading } from "@/components/site/primitives";
import { LinkButton, AnchorButton } from "@/components/site/buttons";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ExpertiseIcon } from "@/components/site/ExpertiseIcon";
import { credibility, whatIWorkOn, projects, profile } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sebastian Cuesta Hoyos | Chemist & Chemical Biologist" },
      {
        name: "description",
        content:
          "Chemist and chemical biologist combining computational chemistry, enzyme engineering, biochemical methods and pharmaceutical R&D to accelerate the discovery of therapeutic molecules.",
      },
      { property: "og:title", content: "Sebastian Cuesta Hoyos | Chemist & Chemical Biologist" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const credIcons = [FileText, Award, Clock, BriefcaseBusiness, FlaskConical];

function Home() {
  const featured = projects.filter((p) => !p.draft).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
          width={1600}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
              {/* Easy to update: current role */}
              {profile.role}
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
              Chemist & chemical biologist working across{" "}
              <span className="text-gradient">biotechnology, biocatalysis, drug discovery</span> and
              protein science.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I combine computational chemistry, enzyme engineering, biochemical methods and
              pharmaceutical R&D experience to understand molecular mechanisms and accelerate the
              discovery of therapeutic molecules.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/research">View Research</LinkButton>
              <LinkButton to="/projects" variant="outline">
                View Projects
              </LinkButton>
              <LinkButton to="/publications" variant="outline">
                Publications
              </LinkButton>
              <AnchorButton href={profile.links.cv} variant="soft">
                <Download className="h-4 w-4" /> Download CV
              </AnchorButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs animate-fade-up">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-accent opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <img
                src={headshot}
                alt="Portrait placeholder of Sebastian Cuesta Hoyos — replace with professional headshot"
                className="aspect-[4/5] w-full object-cover"
                width={800}
                height={1000}
              />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Headshot placeholder — upload professional photo
            </p>
          </div>
        </Container>
      </section>

      {/* Credibility strip */}
      <section className="border-b border-border bg-card">
        <Container className="py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {credibility.map((item, i) => {
              const Icon = credIcons[i % credIcons.length];
              return (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium leading-snug text-foreground">{item}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* What I work on */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Focus areas" title="What I work on" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whatIWorkOn.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-accent text-primary-foreground">
                  <ExpertiseIcon name={c.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected work" title="Featured projects" />
            <LinkButton to="/projects" variant="outline">
              All projects
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-hero p-8 text-center shadow-card sm:p-14">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold text-foreground sm:text-3xl">
              Interested in collaboration, scientific consulting or biotech/pharma opportunities?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LinkButton to="/contact">
                <Mail className="h-4 w-4" /> Contact
              </LinkButton>
              <AnchorButton href={profile.links.cv} variant="outline">
                <Download className="h-4 w-4" /> View CV
              </AnchorButton>
              <AnchorButton href={profile.links.linkedin} variant="outline">
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </AnchorButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
