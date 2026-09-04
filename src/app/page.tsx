import { About } from "@/components/v3/About";
import { Commits } from "@/components/v3/Commits";
import { Hero } from "@/components/v3/Hero";
import { PlaygroundStream } from "@/components/v3/PlaygroundStream";
import { Work } from "@/components/v3/Work";

export default function Home() {
  return (
    <main className="bg-v3-bg">
      <Hero />
      <Work />
      <About />
      {/* The playground sits after About on purpose: About is the day job, and
          this is the answer to "what else". Before it, it competes with the
          case studies for the same attention. */}
      <PlaygroundStream />
      <Commits />
    </main>
  );
}
