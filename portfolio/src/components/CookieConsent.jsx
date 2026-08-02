"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("cookie-consent");
    if (!stored) setVisible(true);
  }, []);

  function save(value) {
    window.localStorage.setItem("cookie-consent", JSON.stringify(value));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[150] p-4 flex justify-center">
      <div className="w-full max-w-2xl rounded-xl border hairline bg-ink shadow-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full border hairline flex items-center justify-center shrink-0 text-signal">
            <Cookie size={16} />
          </div>
          <div className="flex-1">
            <p className="font-medium mb-1">We value your privacy</p>
            <p className="text-sm opacity-70">
              This site uses cookies to remember your preferences (like theme
              and language) and, if you allow it, to collect anonymous visit
              statistics.
            </p>

            {customizing && (
              <label className="flex items-center gap-2 mt-3 text-sm">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-signal"
                />
                Allow anonymous analytics
              </label>
            )}

            <div className="flex flex-wrap gap-2 mt-4">
              {!customizing ? (
                <>
                  <button
                    onClick={() => setCustomizing(true)}
                    className="text-sm border hairline rounded-full px-4 py-1.5 hover:border-signal transition-colors"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => save({ analytics: false })}
                    className="text-sm border hairline rounded-full px-4 py-1.5 hover:border-signal transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => save({ analytics: true })}
                    className="text-sm bg-signal text-ink rounded-full px-4 py-1.5 font-medium hover:opacity-90 transition-opacity"
                  >
                    Accept All
                  </button>
                </>
              ) : (
                <button
                  onClick={() => save({ analytics })}
                  className="text-sm bg-signal text-ink rounded-full px-4 py-1.5 font-medium hover:opacity-90 transition-opacity"
                >
                  Save preferences
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}