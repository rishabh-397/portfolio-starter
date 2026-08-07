"use client";

import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "916267496883"; // +91 assumed -- confirm with Rishabh

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        e.target.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
      <p className="mono-tag mb-3">{"// contact"}</p>
      <h2 className="font-display italic text-3xl mb-6">Say hello.</h2>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi Rishabh, I saw your portfolio and wanted to connect!"
        )}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 mb-8 font-medium hover:border-signal active:scale-95 transition-all"
      >
        <SiWhatsapp size={16} className="text-[#25D366]" />
        Chat on WhatsApp
      </a>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          name="name"
          required
          aria-label="Your name"
          placeholder="Your name"
          className="w-full bg-transparent border hairline rounded-lg px-4 py-3 focus:border-signal outline-none"
        />
        <input
          name="email"
          type="email"
          required
          aria-label="Your email"
          placeholder="Your email"
          className="w-full bg-transparent border hairline rounded-lg px-4 py-3 focus:border-signal outline-none"
        />
        <textarea
          name="message"
          required
          rows={4}
          aria-label="Your message"
          placeholder="What's on your mind?"
          className="w-full bg-transparent border hairline rounded-lg px-4 py-3 focus:border-signal outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-signal text-ink px-6 py-2.5 font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && (
          <p className="text-sm text-circuit">Sent — I&apos;ll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            {errorMsg} Try again, or email me directly.
          </p>
        )}
      </form>
    </Reveal>
    </section>
  );
}