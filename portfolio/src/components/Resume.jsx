"use client";

import Reveal from "./Reveal";

function trackDownload() {
  fetch("/api/track-download", { method: "POST" }).catch(() => {});
}

export default function Resume() {
  return (
    <section id="resume" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
      <p className="mono-tag mb-3">{"// resume"}</p>
      <h2 className="font-display italic text-3xl mb-8">The short version.</h2>

      <div className="rounded-xl border hairline p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="opacity-80 max-w-md">
          Drop your PDF in <code className="font-mono text-signal">/public/resume.pdf</code>{" "}
          and both links below will work automatically.
        </p>
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border hairline px-5 py-2.5 font-medium hover:border-signal active:scale-95 transition-all"
            >
              View
            </a>
            <a
              href="/resume.pdf"
              download
              onClick={trackDownload}
              className="rounded-full bg-signal text-ink px-5 py-2.5 font-medium hover:opacity-90 active:scale-95 transition-all"
            >
              Download
            </a>
          </div>
          <div className="hidden sm:flex flex-col items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element -- external QR-generation service image */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://portfolio-starter-eta.vercel.app&color=247-160-38&bgcolor=11-18-32"
              alt="QR code linking to this portfolio's live site"
              className="rounded-lg border hairline p-1"
              width={90}
              height={90}
            />
            <span className="mono-tag text-[10px]">scan to open</span>
          </div>
        </div>
      </div>
    </Reveal>
    </section>
  );
}