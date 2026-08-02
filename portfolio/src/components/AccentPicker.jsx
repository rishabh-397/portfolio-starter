"use client";

import { useEffect, useState } from "react";

const COLORS = [
  { name: "Amber", value: "#E8A33D" },
  { name: "Teal", value: "#5EC8B8" },
  { name: "Rose", value: "#E85D75" },
  { name: "Violet", value: "#8B7CF6" },
];

export default function AccentPicker() {
  const [active, setActive] = useState(COLORS[0].value);

  useEffect(() => {
    const stored = window.localStorage.getItem("accent");
    if (stored) {
      setActive(stored);
      document.documentElement.style.setProperty("--accent", stored);
    }
  }, []);

  function pick(color) {
    setActive(color);
    document.documentElement.style.setProperty("--accent", color);
    window.localStorage.setItem("accent", color);
  }

  return (
    <div className="flex items-center gap-1.5">
      {COLORS.map((c) => (
        <button
          key={c.value}
          onClick={() => pick(c.value)}
          aria-label={`Use ${c.name} accent color`}
          className="w-4 h-4 rounded-full border transition-transform hover:scale-110"
          style={{
            backgroundColor: c.value,
            borderColor: active === c.value ? "var(--accent)" : "transparent",
            outline: active === c.value ? "2px solid var(--accent)" : "none",
            outlineOffset: "2px",
          }}
        />
      ))}
    </div>
  );
}
