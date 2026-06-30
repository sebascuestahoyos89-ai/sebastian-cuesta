import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, Briefcase, Users, CheckCircle2 } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { education, professionalBackground, awards, profile } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sebastian Cuesta Hoyos" },
      {
        name: "description",
        content:
          "Biography of Sebastian Cuesta Hoyos: a multidisciplinary chemist and chemical biologist integrating computational and experimental approaches across pharma R&D, biocatalysis and protein science.",
      },
      { property: "og:title", content: "About — Sebastian Cuesta Hoyos" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

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

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A multidisciplinary chemist & chemical biologist"
        intro={
          <p>
            Sebastian Cuesta Hoyos is a multidisciplinary chemist and chemical biologist with
            experience spanning computational chemistry, pharmaceutical R&D, enzyme discovery,
            biocatalysis, drug discovery and experimental biochemistry. His work integrates
            computational and experimental approaches to understand molecular mechanisms and
            accelerate the discovery of therapeutic molecules.
          </p>
        }
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/30 bg-gradient-hero p-6 shadow-soft lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Current role
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">{profile.role}</p>
          </div>

          <Card icon={GraduationCap} title="Education">
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.degree}>
                  <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Briefcase} title="Professional background">
            <ul className="space-y-3">
              {professionalBackground.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Award} title="Fellowship & awards">
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Users} title="Scientific mentoring & capacity building">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sebastian mentors students and early-career researchers in Ecuador, supporting thesis
              development, research design, data analysis, scientific writing and
              publication-oriented research. This work aims to strengthen scientific capacity and
              help emerging researchers produce rigorous, internationally relevant science.
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
}
