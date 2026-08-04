"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatbotControl } from "./ChatbotControlContext";

const SUGGESTIONS = [
  "What's their strongest project?",
  "What tech stack do they know?",
  "Are they available for placements?",
];

export default function Chatbot() {
  const { pendingOpen, pendingMessage, setPendingOpen, setPendingMessage } = useChatbotControl();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about this person's resume or projects." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (pendingOpen) {
      setOpen(true);
      if (pendingMessage) {
        send(pendingMessage);
        setPendingMessage(null);
      }
      setPendingOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingOpen]);

  async function send(text) {
    const userMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
        setLoading(false);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      setLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop();

        for (const event of events) {
          const line = event.trim();
          if (!line.startsWith("data:")) continue;
          const payload = line.replace(/^data:\s*/, "");
          if (payload === "[DONE]") continue;

          try {
            const parsed = JSON.parse(payload);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (delta) {
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = {
                  role: "assistant",
                  content: copy[copy.length - 1].content + delta,
                };
                return copy;
              });
            }
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I'm having trouble responding right now." },
      ]);
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-14 right-6 z-50">
      {open && (
        <div className="mb-3 w-[90vw] max-w-96 rounded-xl border hairline bg-ink shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b hairline flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-circuit">
              resume-assistant
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                  m.role === "user" ? "bg-signal text-ink ml-auto" : "bg-line/40"
                }`}
              >
                {m.content}
                {m.role === "assistant" && i === messages.length - 1 && loading === false && m.content === "" && (
                  <span className="animate-pulse">▌</span>
                )}
              </div>
            ))}
            {loading && <div className="text-sm opacity-60">typing…</div>}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs border hairline rounded-full px-2.5 py-1 hover:border-signal transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) send(input.trim());
            }}
            className="border-t hairline p-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button type="submit" aria-label="Send" className="text-signal">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle chatbot"
        className="w-12 h-12 rounded-full bg-signal text-ink flex items-center justify-center shadow-lg hover:opacity-90 active:scale-90 transition-all"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}