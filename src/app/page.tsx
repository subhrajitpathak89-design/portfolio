import { About } from "@/components/sections/About";
import { HangingWorks } from "@/components/sections/HangingWorks";
import { Hero } from "@/components/sections/Hero";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main className="min-h-svh bg-v2-cream">
      <Hero />
      <About />
      <Work />
      <Tools />
      <HangingWorks />
    </main>
  );
}
