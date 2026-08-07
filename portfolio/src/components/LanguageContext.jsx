"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const TRANSLATIONS = {
  en: {
    nav: {
      about: "about",
      education: "education",
      certifications: "certifications",
      skills: "skills",
      profiles: "profiles",
      projects: "projects",
      resume: "resume",
      contact: "contact",
    },
    heroTitle1: "Building things",
    heroTitle2: "that ship.",
  },
  hi: {
    nav: {
      about: "परिचय",
      education: "शिक्षा",
      certifications: "प्रमाणपत्र",
      skills: "कौशल",
      profiles: "प्रोफाइल",
      projects: "प्रोजेक्ट्स",
      resume: "रिज़्यूमे",
      contact: "संपर्क",
    },
    heroTitle1: "चीज़ें बनाना",
    heroTitle2: "जो असल में इस्तेमाल होती हैं।",
  },
};

const TRANSLATED_CODES = ["en", "hi"];

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored && TRANSLATIONS[stored]) setLangState(stored);
  }, []);

  function setLang(code) {
    const resolved = TRANSLATED_CODES.includes(code) ? code : "en";
    setLangState(resolved);
    window.localStorage.setItem("lang", resolved);
  }

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, TRANSLATED_CODES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}