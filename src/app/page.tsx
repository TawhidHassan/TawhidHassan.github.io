import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Clients } from "@/components/sections/Clients";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorldMap } from "@/components/sections/WorldMap";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Clients />
      <Skills />
      <Projects />
      <Achievements />
      <Testimonials />
      <WorldMap />
      <Contact />
    </>
  );
}
