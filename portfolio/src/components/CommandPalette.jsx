"use client";

import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";

const COMMANDS = [
  { label: "Go to About", href: "#about" },
  { label: "Go to Education", href: "#education" },
  { label: "Go to Certifications", href: "#certifications" },
  { label: "Go to Skills", href: "#skills" },
  { label: "Go to Coding Profiles", href: "#profiles" },
  { label: "Go to Projects", href: "#projects" },
  { label: "Go to Resume", href: "#resume" },
  { label: "Go to Contact", href: "#contact" },
  { label: "Open GitHub profile", href: "https://github.com/rishabh-397" },
  { label: "Open LeetCode profile", href: "https://leetcode.com/u/h4dcxOA0Pj/" },
  { label: "Open HackerRank profile", href: "https://www.hackerrank.com/profile/rishabh_cha2005" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isShortcut) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  function go(href) {
    setOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noreferrer");
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl border hairline bg-ink shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b hairline">
          <Search size={16} className="opacity-60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <span className="mono-tag border hairline rounded px-1.5 py-0.5">esc</span>
        </div>

        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm opacity-60">No matches.</li>
          )}
          {filtered.map((c) => (
            <li key={c.label}>
              <button
                onClick={() => go(c.href)}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-line/50 transition-colors"
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
