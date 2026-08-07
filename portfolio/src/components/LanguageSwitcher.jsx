"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "bn", label: "বাংলা" },
  { code: "mr", label: "मराठी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ur", label: "اردو" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "ml", label: "മലയാളം" },
];

export default function LanguageSwitcher() {
  const { lang, setLang, TRANSLATED_CODES } = useLanguage();
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function pick(code) {
    setOpen(false);
    if (!TRANSLATED_CODES.includes(code)) {
      setNotice(true);
      setTimeout(() => setNotice(false), 3000);
    }
    setLang(code);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 border hairline rounded-full px-3 py-1.5 text-xs font-mono hover:border-signal transition-colors"
      >
        <Globe size={14} /> {lang.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 max-h-64 overflow-y-auto rounded-xl border hairline bg-ink shadow-2xl z-50 py-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => pick(l.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-line/50 transition-colors ${
                lang === l.code ? "text-signal" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      {notice && (
        <div className="absolute right-0 mt-2 w-52 rounded-lg border hairline bg-ink px-3 py-2 text-xs opacity-90 shadow-xl z-50">
          Full translation for this language is coming soon -- showing English for now.
        </div>
      )}
    </div>
  );
}