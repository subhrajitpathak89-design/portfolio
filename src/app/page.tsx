import { About } from "@/components/sections/About";
import { Bento } from "@/components/sections/Bento";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Work />
      <Bento />
      <Testimonials />
      <Contact />
    </>
  );
}
