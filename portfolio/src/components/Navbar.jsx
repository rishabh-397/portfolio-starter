"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "./AuthButton";
import { useLanguage } from "./LanguageContext";

const LINK_HREFS = ["about", "education", "certifications", "skills", "profiles", "projects", "resume", "contact"];

export default function Navbar() {
  const { t } = useLanguage();
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const LINKS = LINK_HREFS.map((key) => ({ href: `#${key}`, label: t.nav[key] }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    LINK_HREFS.forEach((key) => {
      const el = document.querySelector(`#${key}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-ink/70 border-b hairline">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-display italic text-lg">
          Rishabh Chaturvedi
        </a>

        <div className="hidden md:flex items-center gap-1.5 font-mono text-sm">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full transition-colors active:scale-95 ${
                active === l.href
                  ? "bg-signal text-ink"
                  : "hover:bg-line/50 hover:text-signal"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <AuthButton />
          <LanguageSwitcher />
          <AccentPicker />
          <span className="hidden sm:inline mono-tag border hairline rounded px-2 py-1">
            ⌘K to search
          </span>
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-full border hairline hover:border-signal transition-colors"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t hairline px-6 py-3 flex flex-col gap-1 font-mono text-sm bg-ink">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                active === l.href ? "bg-signal text-ink" : "hover:bg-line/50"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
