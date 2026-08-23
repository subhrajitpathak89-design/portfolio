import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { HangingWorks } from "@/components/sections/HangingWorks";
import { Hero } from "@/components/sections/Hero";
import { Tools } from "@/components/sections/Tools";
import { Work } from "@/components/sections/Work";

export default function Home() {
  // Both the cream ground and the footer are scoped to this route rather than
  // the shared layout: the case-study and project pages are still on the v1
  // dark tokens, and a cream-and-periwinkle footer under a dark page reads as
  // a mistake. Move the footer into layout.tsx once those routes are ported.
  return (
    <>
      <main className="min-h-svh bg-v2-cream">
        <Hero />
        <About />
        <Work />
        <Tools />
        <HangingWorks />
      </main>
      <Footer />
    </>
  );
}
