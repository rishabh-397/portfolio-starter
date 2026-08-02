"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const PROJECTS = [
  {
    title: "Project One",
    tags: ["React", "Node.js"],
    blurb: "One line on the real problem this solved, not just what it uses.",
    link: "#",
  },
  {
    title: "Project Two",
    tags: ["Python", "ML"],
    blurb: "What decision or trade-off made this project worth talking about.",
    link: "#",
  },
  {
    title: "Project Three",
    tags: ["Next.js", "MongoDB"],
    blurb: "The hardest bug you hit here, in one sentence.",
    link: "#",
  },
];

const ALL_TAGS = ["All", ...new Set(PROJECTS.flatMap((p) => p.tags))];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
      <p className="mono-tag mb-3">// projects</p>
      <h2 className="font-display italic text-3xl mb-8">Things I've shipped.</h2>

      <div className="flex flex-wrap gap-2 mb-10">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border hairline transition-colors ${
              filter === tag ? "bg-signal text-ink border-signal" : "hover:border-signal"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {visible.map((p) => (
          <TiltCard
            as="a"
            key={p.title}
            href={p.link}
            className="rounded-xl border hairline p-5 hover:border-signal transition-colors flex flex-col gap-3"
          >
            <h3 className="font-display italic text-xl">{p.title}</h3>
            <p className="text-sm opacity-80">{p.blurb}</p>
            <div className="flex gap-2 mt-auto pt-2">
              {p.tags.map((t) => (
                <span key={t} className="mono-tag border hairline rounded px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </Reveal>
    </section>
  );
}