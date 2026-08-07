import { Award } from "lucide-react";
import Reveal from "./Reveal";

const CERTIFICATIONS = [
  { name: "Postman API Fundamentals Student Expert", issuer: "Postman", date: "Nov 2024" },
  { name: "Website Development Tutorial", issuer: "Infosys Springboard", date: "Nov 2024" },
  { name: "Introduction to Machine Learning", issuer: "NPTEL", date: "May 2025" },
  { name: "Introduction to Large Language Models", issuer: "Udacity", date: "May 2025" },
  { name: "Insights on Computational Data Science", issuer: "Indiana University Indianapolis", date: "May 2025" },
  { name: "Problem Solving", issuer: "HackerRank", date: "Apr 2025" },
  { name: "MATLAB Certificate", issuer: "MATLAB", date: "Aug 2023" },
  { name: "Cybersecurity Essentials", issuer: "IBM SkillsBuild", date: "May 2025" },
  { name: "Marketing Analytics", issuer: "NPTEL", date: "May 2026" },
  { name: "Tata Cybersecurity Analyst Certificate", issuer: "Tata", date: "Jun 2026" },
  { name: "Oracle Cloud Infrastructure Certified AI Foundations Associate", issuer: "Oracle", date: "2026" },
  { name: "Oracle Agentic AI Foundations Associate (1Z0-1157-26)", issuer: "Oracle", date: "2026" },
  { name: "The Bits and Bytes of Computer Networking", issuer: "Coursera", date: "2025" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
        <p className="mono-tag mb-3">{"// certifications"}</p>
        <h2 className="font-display italic text-3xl mb-10">Things I&apos;ve completed.</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border hairline p-4 hover:border-signal transition-colors flex gap-3"
            >
              <Award size={16} className="text-signal shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium leading-snug">{c.name}</p>
                <p className="text-xs opacity-60 mt-1">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
