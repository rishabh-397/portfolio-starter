import { Layers, Rocket } from "lucide-react";
import Reveal from "./Reveal";

export default function Highlights() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 border-t hairline">
      <Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border hairline p-6 hover:border-signal transition-colors">
            <Layers size={22} className="text-signal mb-4" />
            <h3 className="font-display italic text-xl mb-2">
              <span className="text-signal">Multiple</span> tech stacks
            </h3>
            <p className="text-sm opacity-80">
              Comfortable across the stack — from Python and ML tooling to
              full JavaScript web apps with React and Node.js — and picking
              the right tool for the problem rather than one favorite hammer.
            </p>
          </div>

          <div className="rounded-xl border hairline p-6 hover:border-signal transition-colors">
            <Rocket size={22} className="text-signal mb-4" />
            <h3 className="font-display italic text-xl mb-2">
              Open to <span className="text-signal">opportunities</span>
            </h3>
            <p className="text-sm opacity-80">
              Currently looking for full-time placements and internships.
              Whether it&apos;s a fast-moving startup team or a larger
              engineering org, I&apos;m ready to contribute and keep learning.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
