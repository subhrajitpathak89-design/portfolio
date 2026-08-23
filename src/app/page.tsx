import { Hero } from "@/components/sections/Hero";

export default function Home() {
  // Cream is scoped to this route rather than set on the global theme: the
  // case-study and project pages are still on the v1 dark tokens until they
  // get ported. Without it the dark body would show through below the hero,
  // which on phones is deliberately shorter than the viewport.
  return (
    <main className="min-h-svh bg-v2-cream">
      <Hero />
    </main>
  );
}
