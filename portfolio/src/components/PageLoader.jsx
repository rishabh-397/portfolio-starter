"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(false);

  // Decide ONCE whether to show the intro, and mark it seen -- kept in its
  // own effect (not the initial state) so React 18 Strict Mode's
  // double-invoke in dev can't leave sessionStorage and state out of sync.
  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen");
    if (seen) return;
    sessionStorage.setItem("intro-seen", "true");
    setLoading(true);
  }, []);

  // Separate effect for the timer, keyed off `loading` itself -- this is
  // the standard safe pattern: Strict Mode's mount/cleanup/mount always
  // leaves exactly one live timer, never zero.
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div
              className="w-20 h-20 rounded-full border-2 flex items-center justify-center font-display italic text-2xl"
              style={{ borderColor: "var(--accent)", color: "#F7F5F0" }}
            >
              RC
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-0.5"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
