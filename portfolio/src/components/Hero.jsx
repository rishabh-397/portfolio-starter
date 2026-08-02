"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";

const SNIPPET = [
  "const engineer = {",
  '  name: "Rishabh Chaturvedi",',
  '  focus: "full-stack + ML",',
  '  status: "open to placements",',
  '  currentlyBuilding: "this site",',
  "};",
];

const FULL_TEXT = SNIPPET.join("\n");

export default function Hero() {
  const { t } = useLanguage();
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= FULL_TEXT.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 18);
    return () => clearInterval(timer);
  }, []);

  const typed = FULL_TEXT.slice(0, charCount).split("\n");

  return (
    <section id="top" className="max-w-5xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="relative w-48 h-48 mb-6">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <Image
            src="/profile.jpeg"
            alt="Rishabh Chaturvedi"
            fill
            priority
            sizes="192px"
            className="relative rounded-full object-cover border-2"
            style={{ borderColor: "var(--accent)" }}
          />
          <span
            className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-ink"
            style={{ backgroundColor: "#4ADE80" }}
            title="Open to opportunities"
          />
        </div>
        <p className="mono-tag mb-4">// portfolio.jsx</p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display italic text-4xl md:text-6xl leading-[1.05]"
        >
          {t.heroTitle1}
          <br /> {t.heroTitle2}
        </motion.h1>
        <p className="mt-6 text-lg opacity-80 max-w-md">
          I'm a software engineer who likes taking ideas from a blank file to
          something people actually use. Here's my work, my resume, and an AI
          assistant that knows both better than a bullet list ever could.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#projects" className="rounded-full bg-signal text-ink px-5 py-2.5 font-medium hover:opacity-90 active:scale-95 transition-all">
            View projects
          </a>
          <a href="#contact" className="rounded-full border hairline px-5 py-2.5 font-medium hover:border-signal active:scale-95 transition-all">
            Get in touch
          </a>
        </div>
      </div>

      <div className="rounded-xl border hairline overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-line/40 border-b hairline">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-400/70" />
          <span className="ml-3 mono-tag text-[10px]">about-me.js</span>
        </div>
        <pre className="font-mono text-sm p-6 min-h-[220px] leading-relaxed">
          {typed.map((line, i) => (
            <div key={i}>
              <span className="text-circuit mr-4">{i + 1}</span>
              {line}
              {i === typed.length - 1 && <span className="animate-pulse">▌</span>}
            </div>
          ))}
        </pre>
      </div>
    </section>
  );
}