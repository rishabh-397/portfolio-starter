import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import CodingProfiles from "@/components/CodingProfiles";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import StatusBar from "@/components/StatusBar";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <CommandPalette />
      <main className="pb-14">
        <Hero />
        <About />
        <Education />
        <Skills />
        <CodingProfiles />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <StatusBar />
      <Chatbot />
    </>
  );
}