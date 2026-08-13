"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Reveal from "./Reveal";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("sent");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-6 py-6">
      <Reveal className="max-w-5xl mx-auto rounded-2xl p-10 sm:p-14 text-center bg-signal text-ink">
        <h2 className="font-display italic text-3xl sm:text-4xl mb-3">
          Let&apos;s create great things together.
        </h2>
        <p className="opacity-80 mb-8 max-w-md mx-auto">
          Drop your email and I&apos;ll reach out — whether it&apos;s a role, a
          project, or just to connect.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-full px-5 py-3 bg-ink text-paper placeholder:opacity-50 outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2 rounded-full bg-ink text-paper px-6 py-3 font-medium hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : <Send size={16} />}
          </button>
        </form>

        {status === "sent" && (
          <p className="mt-4 text-sm font-medium">Thanks — I&apos;ll be in touch.</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm font-medium">Something went wrong, please try again.</p>
        )}
      </Reveal>
    </section>
  );
}
