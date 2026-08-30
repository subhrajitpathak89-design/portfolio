import type { Metadata } from "next";
import { Playground } from "@/components/v3/Playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Offcuts, side quests and experiments that never became case studies.",
};

export default function PlaygroundPage() {
  return (
    <main className="min-h-svh bg-v3-bg">
      <Playground />
    </main>
  );
}
