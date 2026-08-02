"use client";

import { useEffect, useState } from "react";
import { GitBranch, CheckCircle2 } from "lucide-react";

const SECTIONS = ["top", "about", "education", "skills", "profiles", "projects", "resume", "contact"];

export default function StatusBar() {
  const [active, setActive] = useState("top");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="h-0.5 bg-line/40">
        <div
          className="h-full bg-ink/60 transition-[width] duration-150"
          style={{ width: `${scrollPct}%` }}
        />
      </div>
      <div className="bg-signal text-ink font-mono text-xs">
        <div className="max-w-5xl mx-auto px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <GitBranch size={12} /> main
            </span>
            <span className="hidden sm:inline">viewing: {active}.section</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{Math.round(scrollPct)}% read</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} /> chatbot online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
