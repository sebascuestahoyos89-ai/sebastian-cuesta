import type { Metadata } from "next";
import { NotesView } from "./notes-view";

export const metadata: Metadata = {
  title: "Scientific Notes — Sebastian Cuesta Hoyos",
  description:
    "Short technical articles on biophysical methods, computational chemistry supporting experimental biochemistry, and mechanistic thinking in enzyme science.",
  openGraph: { title: "Scientific Notes — Sebastian Cuesta Hoyos", url: "/notes" },
  alternates: { canonical: "/notes" },
};

export default function Page() {
  return <NotesView />;
}
