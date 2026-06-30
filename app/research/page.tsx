import type { Metadata } from "next";
import { ResearchView } from "./research-view";

export const metadata: Metadata = {
  title: "Research & Expertise — Sebastian Cuesta Hoyos",
  description:
    "Expertise across enzyme discovery and biocatalysis, computational and AI-guided drug discovery, protein science and biochemistry, analytical and pharmaceutical R&D, and molecular mechanisms.",
  openGraph: { title: "Research & Expertise — Sebastian Cuesta Hoyos", url: "/research" },
  alternates: { canonical: "/research" },
};

export default function Page() {
  return <ResearchView />;
}
