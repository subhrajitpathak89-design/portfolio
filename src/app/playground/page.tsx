import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { FolderShelf } from "@/components/sections/FolderShelf";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Offcuts, side quests and experiments that never became case studies.",
};

export default function PlaygroundPage() {
  return (
    <>
      <main className="min-h-svh bg-v2-cream">
        <FolderShelf />
      </main>
      <Footer />
    </>
  );
}
