import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
  name: "Sebastian Cuesta Hoyos",
  jobTitle: "Postdoctoral Research Associate",
  affiliation: { "@type": "Organization", name: "University of Manchester" },
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
