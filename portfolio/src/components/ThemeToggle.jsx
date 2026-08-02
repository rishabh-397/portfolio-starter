"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersLight = stored === "light";
    setLight(prefersLight);
    document.body.classList.toggle("light", prefersLight);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.body.classList.toggle("light", next);
    window.localStorage.setItem("theme", next ? "light" : "dark");
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="rounded-full p-2 hairline border hover:border-signal transition-colors"
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
