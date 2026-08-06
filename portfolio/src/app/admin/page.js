"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FileDown } from "lucide-react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState(null);
  const [resumeDownloads, setResumeDownloads] = useState(null);

  useEffect(() => {
    if (session) {
      fetch("/api/admin/messages").then(async (r) => {
        if (r.status === 401) {
          setMessages("unauthorized");
          return;
        }
        const d = await r.json();
        setMessages(d.messages || []);
        setResumeDownloads(d.resumeDownloads ?? 0);
      });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center opacity-70">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-display italic text-2xl">Admin access</p>
        <p className="opacity-70 max-w-sm">
          Sign in with the Google account that owns this portfolio to view
          contact messages.
        </p>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 bg-white text-gray-700 font-medium rounded-full pl-2 pr-5 py-2.5 border border-gray-300 shadow-sm hover:shadow-md active:scale-95 transition-all"
        >
          <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <FcGoogle size={20} />
          </span>
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <p className="font-display italic text-2xl">Dashboard</p>
        <button
          onClick={() => signOut()}
          className="text-sm border hairline rounded-full px-4 py-1.5 hover:border-signal transition-colors"
        >
          Sign out
        </button>
      </div>

      {messages !== "unauthorized" && resumeDownloads !== null && (
        <div className="rounded-xl border hairline p-4 mb-8 flex items-center gap-3 w-fit">
          <FileDown size={18} className="text-signal" />
          <div>
            <p className="text-2xl font-display italic">{resumeDownloads}</p>
            <p className="text-xs opacity-60">resume downloads</p>
          </div>
        </div>
      )}

      <p className="font-mono text-xs uppercase tracking-wide text-circuit mb-4">
        Contact messages
      </p>

      {messages === null && <p className="opacity-60">Loading messages...</p>}
      {messages === "unauthorized" && (
        <p className="opacity-70">
          You&apos;re signed in, but this Google account doesn&apos;t have admin access
          on this site.
        </p>
      )}
      {Array.isArray(messages) && messages.length === 0 && (
        <p className="opacity-60">No messages yet.</p>
      )}

      <div className="space-y-4">
        {Array.isArray(messages) &&
          messages.map((m) => (
          <div key={m.id} className="rounded-xl border hairline p-4">
            <div className="flex justify-between text-sm mb-2 gap-4">
              <span className="font-medium">
                {m.name} — {m.email}
              </span>
              <span className="opacity-60 font-mono text-xs shrink-0">
                {new Date(m.receivedAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm opacity-80">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}