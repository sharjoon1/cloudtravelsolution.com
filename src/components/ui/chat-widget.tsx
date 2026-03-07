"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { Sparkles, X, Send, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hi! I\u2019m CTS-AI, your visa and travel assistant at Cloud Travel Solution. How can I help you today? \u2708\uFE0F";

const QUICK_PROMPTS = [
  "Visa for USA?",
  "Document checklist",
  "Track application",
  "Nearest office",
  "Visa fees",
];

const WHATSAPP_URL = "https://wa.me/919632132143";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-gray-400"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const assistantMsg: Message = { role: "assistant", content: "" };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);

      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        abortRef.current = new AbortController();

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantText = "";
        let buffer = "";

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split("\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data: ")) continue;

            try {
              const data = JSON.parse(line.slice(6));
              if (data.done) break;
              if (data.text) {
                assistantText += data.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantText,
                  };
                  return updated;
                });
              }
            } catch {
              /* Ignore malformed JSON lines */
            }
          }
        }

        if (!assistantText) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content:
                "Sorry, I couldn\u2019t process that right now. You can reach us directly on WhatsApp for immediate help!",
            };
            return updated;
          });
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "Oops, something went wrong. Please try again or chat with us on WhatsApp!",
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, messages],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 z-[55] md:bottom-8 md:right-24"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#0cfcbc]/30" />

            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0c6cbc] text-white shadow-lg transition-transform hover:scale-105"
              aria-label="Open chat with CTS-AI"
            >
              <Sparkles className="h-6 w-6" />

              <span className="pointer-events-none absolute bottom-full right-1/2 mb-2 hidden translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
                Ask CTS-AI
                <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white md:inset-auto md:bottom-8 md:right-24 md:h-[550px] md:w-[400px] md:rounded-2xl md:shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between bg-gradient-to-r from-[#0c6cbc] to-[#0a5a9e] px-4 py-3 md:rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-5 w-5 text-[#0cfcbc]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">CTS-AI</h3>
                  <p className="text-xs text-white/80">Visa & Travel Expert</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Talk to Expert
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-shrink-0 gap-2 overflow-x-auto border-b border-gray-100 bg-gray-50 px-4 py-2.5 scrollbar-hide">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isStreaming}
                  className="flex-shrink-0 rounded-full border border-[#0c6cbc]/20 bg-white px-3 py-1.5 text-xs font-medium text-[#0c6cbc] transition-colors hover:bg-[#0c6cbc] hover:text-white disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:thin]">
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-[#0c6cbc] text-white"
                          : "rounded-bl-md bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isStreaming &&
                  messages[messages.length - 1]?.role === "assistant" &&
                  !messages[messages.length - 1]?.content && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-md bg-gray-100">
                        <TypingIndicator />
                      </div>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex flex-shrink-0 items-end gap-2 border-t border-gray-200 bg-white p-3 md:rounded-b-2xl">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about visas, documents, fees..."
                disabled={isStreaming}
                rows={1}
                className="max-h-24 flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-[#0c6cbc] focus:bg-white focus:ring-1 focus:ring-[#0c6cbc]/20 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isStreaming || !input.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0cfcbc] text-[#094f8a] transition-all hover:bg-[#0adba5] disabled:bg-gray-300 disabled:text-gray-500"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
