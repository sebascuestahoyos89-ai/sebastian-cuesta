import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Linkedin, GraduationCap, BadgeCheck, Download, Send } from "lucide-react";
import { Container, PageHeader } from "@/components/site/primitives";
import { AnchorButton } from "@/components/site/buttons";
import { profile } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sebastian Cuesta Hoyos" },
      {
        name: "description",
        content:
          "Get in touch for biotech/pharma opportunities, scientific collaborations, consulting discussions, invited talks, mentoring initiatives or research-related enquiries.",
      },
      { property: "og:title", content: "Contact — Sebastian Cuesta Hoyos" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's connect"
        intro={
          <p>
            Please get in touch for biotech/pharma opportunities, scientific collaborations,
            consulting discussions, invited talks, mentoring initiatives or research-related
            enquiries.
          </p>
        }
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-foreground">Direct contact</h2>
              <a
                href={profile.links.email}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Mail className="h-4 w-4" /> {profile.emailDisplay}
              </a>
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
                  <Download className="h-4 w-4" /> Download CV
                </AnchorButton>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-lg font-bold text-foreground">Send a message</h2>
            {sent ? (
              <p className="mt-6 rounded-lg bg-secondary/60 p-4 text-sm text-foreground">
                Thank you — your message is noted. This is a placeholder form; connect it to an email
                service or backend to receive submissions.
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
                    <span className="font-medium text-foreground">Name</span>
                    <input
                      required
                      type="text"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium text-foreground">Email</span>
                    <input
                      required
                      type="email"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="font-medium text-foreground">Message</span>
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
                  <Send className="h-4 w-4" /> Send message
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
