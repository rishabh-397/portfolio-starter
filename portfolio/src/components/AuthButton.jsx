"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 bg-white text-gray-700 text-sm font-medium rounded-full pl-1.5 pr-4 py-1.5 border border-gray-300 shadow-sm hover:shadow-md active:scale-95 transition-all"
      >
        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <FcGoogle size={18} />
        </span>
        Sign in
      </button>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center">
        {session.user.image ? (
          /* eslint-disable @next/next/no-img-element -- external Google avatar URL, unknown at build time, not worth an images.remotePatterns entry for every possible Google host */
          <img
            src={session.user.image}
            alt={session.user.name || "Account"}
            className="w-7 h-7 rounded-full border-2"
            style={{ borderColor: "var(--accent)" }}
          />
          /* eslint-enable @next/next/no-img-element */
        ) : (
          <div className="w-7 h-7 rounded-full bg-signal text-ink flex items-center justify-center text-xs font-medium">
            {session.user.name?.[0] || "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border hairline bg-ink shadow-2xl z-50 py-2">
          <p className="px-4 py-2 text-xs opacity-60 truncate">{session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-sm hover:bg-line/50 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
