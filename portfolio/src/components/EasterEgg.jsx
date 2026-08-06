"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function EasterEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let progress = 0;
    function handleKeyDown(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[progress]) {
        progress++;
        if (progress === KONAMI.length) {
          setShow(true);
          progress = 0;
          setTimeout(() => setShow(false), 4000);
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-24 z-[200] flex justify-center px-4 pointer-events-none">
      <div className="bg-signal text-ink rounded-full px-5 py-2.5 font-mono text-sm shadow-2xl animate-bounce">
        Nice pattern recognition -- that&apos;s exactly the kind of attention to
        detail I try to bring to code too. 👋
      </div>
    </div>
  );
}