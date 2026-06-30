import type { Metadata } from "next";
import { ProjectsView } from "./projects-view";

export const metadata: Metadata = {
  title: "Projects — Sebastian Cuesta Hoyos",
  description:
    "High-level, method-focused case studies in enzyme engineering, computational and AI-guided drug discovery, molecular mechanisms, and membrane-protein biochemistry.",
  openGraph: { title: "Projects — Sebastian Cuesta Hoyos", url: "/projects" },
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return <ProjectsView />;
}
