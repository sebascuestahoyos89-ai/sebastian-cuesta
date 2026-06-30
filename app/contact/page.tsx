import type { Metadata } from "next";
import { ContactView } from "./contact-view";

export const metadata: Metadata = {
  title: "Contact — Sebastian Cuesta Hoyos",
  description:
    "Get in touch for biotech/pharma opportunities, scientific collaborations, consulting discussions, invited talks, mentoring initiatives or research-related enquiries.",
  openGraph: { title: "Contact — Sebastian Cuesta Hoyos", url: "/contact" },
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactView />;
}
