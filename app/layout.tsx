import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { profile, en } from "@/content/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sebastian Cuesta Hoyos | Chemist & Chemical Biologist",
  description:
    "Personal website of Sebastian Cuesta Hoyos, a chemist and chemical biologist working across biotechnology, biocatalysis, drug discovery, computational chemistry, enzyme engineering and protein science.",
  keywords: [
    "Sebastian Cuesta Hoyos",
    "chemist",
    "chemical biologist",
    "biotechnology",
    "biocatalysis",
    "drug discovery",
    "computational chemistry",
    "enzyme engineering",
    "molecular modelling",
    "protein science",
    "pharmaceutical R&D",
    "University of Manchester",
    "MSCA Postdoctoral Fellow",
  ],
  authors: [{ name: "Sebastian Cuesta Hoyos" }],
  openGraph: {
    title: "Sebastian Cuesta Hoyos | Chemist & Chemical Biologist",
    description:
      "Chemist and chemical biologist working across biotechnology, biocatalysis, drug discovery, computational chemistry, enzyme engineering and protein science.",
    type: "website",
    siteName: "Sebastian Cuesta Hoyos",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: "Postdoctoral Research Associate",
  email: profile.emailDisplay,
  worksFor: { "@type": "Organization", name: "University of Manchester" },
  affiliation: { "@type": "Organization", name: "University of Manchester" },
  alumniOf: en.education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
  knowsAbout: [
    "Biocatalysis",
    "Enzyme engineering",
    "Drug discovery",
    "Computational chemistry",
    "Molecular modelling",
    "Protein science",
    "Chemical biology",
    "Quantum chemistry",
    "Pharmaceutical R&D",
  ],
  sameAs: [profile.links.linkedin, profile.links.scholar, profile.links.orcid],
  description:
    "Chemist and chemical biologist working across biotechnology, biocatalysis, drug discovery, computational chemistry, enzyme engineering and protein science.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
