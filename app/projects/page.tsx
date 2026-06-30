import type { Metadata } from "next";
import { ProjectsView } from "./projects-view";

export const metadata: Metadata = {
  title: "Projects & Publications — Sebastian Cuesta Hoyos",
  description:
    "Method-focused case studies and 30+ peer-reviewed publications across enzyme engineering, biocatalysis, computational and AI-guided drug discovery, molecular mechanisms and protein science.",
  openGraph: { title: "Projects & Publications — Sebastian Cuesta Hoyos", url: "/projects" },
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return <ProjectsView />;
}
