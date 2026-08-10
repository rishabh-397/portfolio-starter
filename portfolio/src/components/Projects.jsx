"use client";

import { useState, useEffect } from "react";
import { MessageCircleQuestion, Flame } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { useChatbotControl } from "./ChatbotControlContext";

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const PROJECTS = [
  {
    title: "EventBook — Seat Booking Platform",
    tags: ["React", "Node.js", "PostgreSQL"],
    blurb: "A concurrency-safe ticket booking platform — Redis distributed locks guarantee zero double-bookings even under 50 simultaneous requests, verified with real k6 load testing.",
    link: "https://eventbook-pi.vercel.app",
    github: "https://github.com/rishabh-397/eventbook",
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
  const [mostViewedSlug, setMostViewedSlug] = useState(null);
  const { askChatbot } = useChatbotControl();

  useEffect(() => {
    fetch("/api/project-stats")
      .then((res) => res.json())
      .then((data) => {
        const stats = data.stats || [];
        if (stats.length === 0) return;
        const top = stats.reduce((a, b) => (b.count > a.count ? b : a));
        if (top.count > 0) {
          setMostViewedSlug(top.key.replace("project_click_", ""));
        }
      })
      .catch(() => {});
  }, []);

  function trackProjectClick(title) {
    fetch("/api/track-project-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).catch(() => {});
  }

  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
      <p className="mono-tag mb-3">{"// projects"}</p>
      <h2 className="font-display italic text-3xl mb-8">Things I&apos;ve shipped.</h2>

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
            key={p.title}
            className="relative rounded-xl border hairline p-5 hover:border-signal transition-colors flex flex-col gap-3"
          >
            {mostViewedSlug === slugify(p.title) && (
              <span className="absolute -top-2.5 right-4 flex items-center gap-1 bg-signal text-ink text-[10px] font-mono px-2 py-0.5 rounded-full">
                <Flame size={10} /> most viewed
              </span>
            )}
            <h3 className="font-display italic text-xl">{p.title}</h3>
            <p className="text-sm opacity-80">{p.blurb}</p>
            <div className="flex gap-2 flex-wrap">
              {p.tags.map((t) => (
                <span key={t} className="mono-tag border hairline rounded px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="flex items-center gap-3">
                <a
                  href={p.link}
                  onClick={() => trackProjectClick(p.title)}
                  className="text-sm text-signal hover:opacity-80 transition-opacity"
                >
                  View project →
                </a>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-signal hover:opacity-80 transition-opacity"
                    aria-label={`View ${p.title} source on GitHub`}
                  >
                    <SiGithub size={16} />
                  </a>
                )}
              </div>
              <button
                onClick={() =>
                  askChatbot(`Can you explain the ${p.title} project in more depth?`)
                }
                className="flex items-center gap-1.5 text-xs border hairline rounded-full px-3 py-1.5 hover:border-signal transition-colors"
              >
                <MessageCircleQuestion size={13} />
                Ask AI
              </button>
            </div>
          </TiltCard>
        ))}
      </div>
    </Reveal>
    </section>
  );
}