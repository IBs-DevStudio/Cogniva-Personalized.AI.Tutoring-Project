"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const initialMessage: Message = {
  id: 0,
  role: "assistant",
  content:
    "Hi! I'm the Cogniva assistant. Ask me anything about creating, configuring, or managing companions.",
};

export default function CognivaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setIsLoading(true);

    let historySnapshot: { role: "user" | "assistant"; content: string }[] = [];

    setMessages((prev) => {
      const nextMessages: Message[] = [
        ...prev,
        { id: Date.now(), role: "user", content: text },
      ];

      historySnapshot = nextMessages.map(({ role, content }) => ({ role, content }));

      return nextMessages;
    });

    try {
      const response = await fetch("/api/cogniva-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historySnapshot,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data: { answer?: string; error?: string } = await response.json();
      const answer = data.answer ?? data.error ?? "Sorry, I couldn't respond right now.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: answer },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          content:
            "Oops, there was a problem reaching the Cogniva assistant. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full  "
        aria-label="Open Cogniva assistant "
      >
        <Image className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:drop-shadow-lg cursor-pointer" src="/images/robo-2.png" alt="Cogniva" width={100} height={108} />
      </button>

      {/*  window */}
      <div
        className={`${isOpen ? "flex" : "hidden"
          } fixed bottom-24 right-6 z-50 flex h-[28rem] w-80 flex-col rounded-3xl border border-border bg-background text-foreground shadow-xl shadow-black/30`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2 text-sm font-semibold">
          <span>Cogniva Assistant</span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-xs text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
            aria-label="Close "
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-3 py-2 text-sm">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs sm:text-sm ${message.role === "user"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground border border-border"
                  }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border px-3 py-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about companions…"
            className="flex-1 rounded-2xl border border-border bg-background px-3 py-2 text-xs sm:text-sm outline-none focus-visible:ring-1 focus-visible:ring-black"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-2xl bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm shadow-black/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "…" : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}