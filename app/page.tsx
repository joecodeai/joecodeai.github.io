import About from "@/components/sections/About";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Page() {
  return (
    <>
      <Hero />
      <main id="main">
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Beyond />
      </main>
      <Contact />
    </>
  );
}
