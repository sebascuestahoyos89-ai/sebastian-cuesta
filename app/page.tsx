import type { Metadata } from "next";
import { HomeView } from "./home-view";

export const metadata: Metadata = {
  title: "Sebastian Cuesta Hoyos | Chemist & Chemical Biologist",
  description:
    "Chemist and chemical biologist combining computational chemistry, enzyme engineering, biochemical methods and pharmaceutical R&D to accelerate the discovery of therapeutic molecules.",
  openGraph: {
    title: "Sebastian Cuesta Hoyos | Chemist & Chemical Biologist",
    url: "/",
  },
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeView />;
}
