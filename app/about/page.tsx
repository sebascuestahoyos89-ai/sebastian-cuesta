import type { Metadata } from "next";
import { AboutView } from "./about-view";

export const metadata: Metadata = {
  title: "About — Sebastian Cuesta Hoyos",
  description:
    "Biography of Sebastian Cuesta Hoyos: a multidisciplinary chemist and chemical biologist integrating computational and experimental approaches across pharma R&D, biocatalysis and protein science.",
  openGraph: { title: "About — Sebastian Cuesta Hoyos", url: "/about" },
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutView />;
}
