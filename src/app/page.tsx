import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Work />
    </>
  );
}
