"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

// Replace these with real testimonials once you have them -- a LinkedIn
// recommendation, a quote from a mentor/professor, or a teammate from
// GirlScript/Social Summer of Code all work well here. Never fabricate one.
const TESTIMONIALS = [
  {
    quote:
      "Add a real testimonial here once you have one -- a short quote from someone who's actually worked with you carries a lot more weight than any placeholder text.",
    name: "Awaiting a real quote",
    role: "",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }
  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
        <p className="mono-tag mb-3">{"// testimonials"}</p>
        <h2 className="font-display italic text-3xl mb-10">What people say.</h2>

        <div className="relative rounded-xl border hairline p-8 max-w-2xl mx-auto">
          <Quote size={28} className="text-signal opacity-40 absolute top-6 right-6" />
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-signal fill-signal" />
            ))}
          </div>
          <p className="text-sm sm:text-base opacity-90 leading-relaxed mb-6">
            {current.quote}
          </p>
          <p className="font-medium text-sm">
            {current.name}
            {current.role && <span className="opacity-60"> — {current.role}</span>}
          </p>

          {TESTIMONIALS.length > 1 && (
            <div className="flex gap-2 justify-center mt-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-2 rounded-full border hairline hover:border-signal transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="p-2 rounded-full border hairline hover:border-signal transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
