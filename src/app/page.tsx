import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";

export default function Home() {
  // Cream is scoped to this route rather than set on the global theme: the
  // case-study and project pages are still on the v1 dark tokens until they
  // get ported.
  return (
    <main className="min-h-svh bg-v2-cream">
      <Hero />
      <About />
      <Tools />
      <Work />
    </main>
  );
}
