import { About } from "@/components/v3/About";
import { Commits } from "@/components/v3/Commits";
import { Hero } from "@/components/v3/Hero";
import { Work } from "@/components/v3/Work";

export default function Home() {
  return (
    <main className="bg-v3-bg">
      <Hero />
      <Work />
      <About />
      <Commits />
    </main>
  );
}
