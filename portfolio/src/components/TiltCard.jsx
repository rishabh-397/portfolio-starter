"use client";

import { useRef } from "react";

export default function TiltCard({ children, className, as: Component = "div", ...props }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  function handleLeave() {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  }

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: "transform 0.15s ease-out" }}
      {...props}
    >
      {children}
    </Component>
  );
}