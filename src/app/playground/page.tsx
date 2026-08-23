import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { FolderShelf } from "@/components/sections/FolderShelf";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Offcuts, side quests and experiments that never became case studies.",
};

export default function PlaygroundPage() {
  // No background colour on `main` here — unlike the home route. The section
  // paints a fixed backdrop behind itself, and an opaque ancestor background
  // would cover it.
  return (
    <>
      <main className="min-h-svh">
        <FolderShelf />
      </main>
      <Footer />
    </>
  );
}
