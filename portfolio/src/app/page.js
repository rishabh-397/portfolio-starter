import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import CodingProfiles from "@/components/CodingProfiles";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Resume from "@/components/Resume";
import NewsletterCTA from "@/components/NewsletterCTA";
import Contact from "@/components/Contact";
import StatusBar from "@/components/StatusBar";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <CommandPalette />
      <main id="main-content" className="pb-14">
        <Hero />
        <TechMarquee />
        <Highlights />
        <About />
        <Education />
        <Certifications />
        <Skills />
        <CodingProfiles />
        <Projects />
        <Testimonials />
        <Resume />
        <NewsletterCTA />
        <Contact />
      </main>
      <StatusBar />
      <Chatbot />
    </>
  );
}