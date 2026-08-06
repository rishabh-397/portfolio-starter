"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";

const EDUCATION = [
  {
    school: "VIT Bhopal University",
    location: "Sehore, Madhya Pradesh",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "2023 – 2027",
    score: "CGPA: 7.99 / 10",
    logo: "/vit-logo.jpg",
  },
  {
    school: "DAV Public School",
    location: "Bishrampur, Chhattisgarh",
    degree: "Senior Secondary (Class XII)",
    period: "Passed out 2023",
    score: "67.6%",
    logo: "/dav-logo.jpg",
  },
  {
    school: "DAV Public School",
    location: "Bishrampur, Chhattisgarh",
    degree: "Secondary (Class X)",
    period: "Passed out 2021",
    score: "87.2%",
    logo: "/dav-logo.jpg",
  },
];

function SchoolIcon({ logo, school }) {
  const [failed, setFailed] = useState(false);

  if (!logo || failed) {
    return (
      <div className="w-10 h-10 rounded-full border hairline flex items-center justify-center shrink-0 text-signal">
        <GraduationCap size={18} />
      </div>
    );
  }

  return (
    /* eslint-disable @next/next/no-img-element -- small local logo with a manual onError fallback */
    <img
      src={logo}
      alt={`${school} logo`}
      onError={() => setFailed(true)}
      className="w-10 h-10 rounded-full border hairline object-contain bg-white/5 shrink-0 p-1"
    />
    /* eslint-enable @next/next/no-img-element */
  );
}

export default function Education() {
  return (
    <section id="education" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
        <p className="mono-tag mb-3">{"// education"}</p>
        <h2 className="font-display italic text-3xl mb-10">Where it started.</h2>

        <div className="space-y-4">
          {EDUCATION.map((e, i) => (
            <div
              key={`${e.degree}-${i}`}
              className="rounded-xl border hairline p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-signal transition-colors"
            >
              <SchoolIcon logo={e.logo} school={e.school} />
              <div className="flex-1">
                <p className="font-display italic text-lg">{e.school}</p>
                <p className="text-sm opacity-80">{e.degree}</p>
                <p className="text-xs opacity-60">{e.location}</p>
              </div>
              <div className="font-mono text-sm text-right shrink-0">
                <p className="text-circuit">{e.period}</p>
                <p className="opacity-80">{e.score}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
