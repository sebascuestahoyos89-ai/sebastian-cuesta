import type { Metadata } from "next";
import { PublicationsView } from "./publications-view";

export const metadata: Metadata = {
  title: "Publications — Sebastian Cuesta Hoyos",
  description:
    "30+ peer-reviewed publications across computational chemistry, drug discovery, molecular modelling, antimicrobial peptides, chemical reactivity, enzyme mechanisms and biocatalysis.",
  openGraph: { title: "Publications — Sebastian Cuesta Hoyos", url: "/publications" },
  alternates: { canonical: "/publications" },
};

export default function Page() {
  return <PublicationsView />;
}
