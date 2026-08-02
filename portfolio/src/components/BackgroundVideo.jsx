"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-25"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable over the video in both themes */}
      <div className="absolute inset-0 bg-ink/80 [body.light_&]:bg-paper/85" />
    </div>
  );
}
