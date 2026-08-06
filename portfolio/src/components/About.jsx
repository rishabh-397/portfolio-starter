import Reveal from "./Reveal";

const TIMELINE = [
  { year: "2023", label: "Started B.Tech CSE, VIT Bhopal University" },
  { year: "2024", label: "Postman API Fundamentals Student Expert; Website Dev (Infosys Springboard)" },
  { year: "2025", label: "Summer Android Development Intern @ Imarticus Learning; NPTEL ML, Udacity LLMs, IBM Cybersecurity certs" },
  { year: "2026", label: "Campus Ambassador, GirlScript Summer of Code; contributor, Social Summer of Code — now placement-ready" },
];

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-20">
      <Reveal>
      <p className="mono-tag mb-3">{"// about"}</p>
      <h2 className="font-display italic text-3xl mb-10">A little bit of history.</h2>

      <div className="grid md:grid-cols-2 gap-12">
        <p className="opacity-80 leading-relaxed">
          I&apos;m a Computer Science undergraduate at VIT Bhopal University who
          enjoys building things and figuring out how communities of
          developers work well together. I&apos;ve spent time across software
          development, API testing, and machine learning, and I&apos;m most
          energized when I&apos;m contributing to open-source — as a Campus
          Ambassador for GirlScript Summer of Code and a contributor to
          Social Summer of Code, I&apos;ve learned as much from reviewing other
          people&apos;s code as from writing my own. I&apos;m a fast learner, I take
          collaboration seriously, and right now I&apos;m looking for a team where
          I can keep growing in web development and ML.
        </p>

        <ol className="space-y-4 font-mono text-sm">
          {TIMELINE.map((t) => (
            <li key={t.year} className="flex gap-4 border-l-2 hairline pl-4">
              <span className="text-signal">{t.year}</span>
              <span className="opacity-80">{t.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
    </section>
  );
}