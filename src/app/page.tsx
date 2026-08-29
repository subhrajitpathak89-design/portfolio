import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { MoreWork } from "@/components/sections/MoreWork";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main className="min-h-svh bg-v2-cream">
      {/* Work sits directly under the hero, ahead of About. A reviewer's scan
          path goes role line -> proof -> thumbnails, and it stops at whatever
          is there first; a section about me in that slot spends the scan on
          the one thing the data says gets skipped. */}
      <Hero />
      <Work />
      <About />
      <Tools />
      <MoreWork />
    </main>
  );
}
