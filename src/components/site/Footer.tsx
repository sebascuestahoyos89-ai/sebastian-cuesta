import { Link } from "@tanstack/react-router";
import { Linkedin, GraduationCap, BadgeCheck, Mail } from "lucide-react";
import { profile } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <div className="font-display text-lg font-bold text-foreground">{profile.name}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Chemist & chemical biologist working across biotechnology, biocatalysis, drug discovery
            and protein science.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Connect</h3>
          <ul className="mt-3 space-y-2.5 text-sm">
            <li>
              <a
                href={profile.links.linkedin}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.links.scholar}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <GraduationCap className="h-4 w-4" /> Google Scholar
              </a>
            </li>
            <li>
              <a
                href={profile.links.orcid}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <BadgeCheck className="h-4 w-4" /> ORCID
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Contact</h3>
          <a
            href={profile.links.email}
            className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" /> {profile.emailDisplay}
          </a>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Get in touch
            </Link>
            <a href={profile.links.cv} className="font-medium text-primary hover:underline">
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
