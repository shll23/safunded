"use client";

/**
 * ============================================================================
 *  SAFunded — SUPPORT CHAT WIDGET
 * ============================================================================
 *  A small floating support assistant, mounted globally in app/layout.tsx.
 *
 *  - A floating button (bottom-right) opens a compact chat window.
 *  - Questions are answered by /api/support STRICTLY from the knowledge base.
 *  - When the bot cannot answer (needs_human) — or the customer clicks
 *    "send to support" — an inline contact form appears, which POSTs to
 *    /api/support/contact (e-mail to support@safunded.com).
 *  - After sending, the customer sees the 24-hour confirmation.
 *
 *  Styling uses the site's existing Tailwind design tokens (base / surface /
 *  accent / muted …). Bilingual (DE/EN) via the language context.
 * ============================================================================
 */

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

type Mode = "chat" | "contact" | "sent";

const COPY = {
  de: {
    title: "SAM",
    name: "SAM",
    subtitle: "Fragen zu Regeln, Plänen & AGB",
    open: "Support-Chat öffnen",
    close: "Schließen",
    greeting:
      "Hi, ich bin SAM 👋 Ich beantworte Fragen zu unseren Regeln, Plänen und Bedingungen. Bei kontobezogenen Anliegen verbinde ich dich mit unserem Team.",
    placeholder: "Deine Frage…",
    send: "Senden",
    thinking: "Einen Moment…",
    toSupport: "An Support senden",
    handoff:
      "Das beantworte ich dir nicht aus den Hilfe-Texten – oder es betrifft dein Konto. Schreib uns kurz, wir melden uns persönlich.",
    formIntro: "Hinterlasse uns eine Nachricht – wir melden uns per E-Mail.",
    emailLabel: "Deine E-Mail",
    messageLabel: "Deine Nachricht",
    submit: "Absenden",
    sending: "Wird gesendet…",
    confirmation:
      "Wir melden uns innerhalb von 24 h, danke für deine Geduld.",
    backToChat: "Zurück zum Chat",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    errorEmail: "Bitte gib eine gültige E-Mail-Adresse an.",
    errorMessage: "Bitte gib eine Nachricht ein.",
  },
  en: {
    title: "SAM",
    name: "SAM",
    subtitle: "Questions about rules, plans & terms",
    open: "Open support chat",
    close: "Close",
    greeting:
      "Hi, I'm SAM 👋 I answer questions about our rules, plans and terms. For anything account-related I'll connect you with our team.",
    placeholder: "Your question…",
    send: "Send",
    thinking: "One moment…",
    toSupport: "Send to support",
    handoff:
      "I can't answer that from the help texts — or it concerns your account. Leave us a short message and we'll get back to you personally.",
    formIntro: "Leave us a message — we'll reply by e-mail.",
    emailLabel: "Your e-mail",
    messageLabel: "Your message",
    submit: "Submit",
    sending: "Sending…",
    confirmation:
      "We'll get back to you within 24 h — thanks for your patience.",
    backToChat: "Back to chat",
    errorGeneric: "Something went wrong. Please try again.",
    errorEmail: "Please enter a valid e-mail address.",
    errorMessage: "Please enter a message.",
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Safety net so the customer never sees raw Markdown, even if the model slips.
 * Strips bold/italic markers (**, *, __), heading hashes and leading bullet
 * dashes — turning a "- item" line into plain text on its own line. The
 * conversation bubbles already render with `whitespace-pre-wrap`, so newlines
 * are preserved as paragraphs.
 */
function toPlainText(text: string): string {
  return text
    .replace(/\*\*/g, "") // bold **
    .replace(/__/g, "") // bold/underline __
    .replace(/\*/g, "") // italic *
    .replace(/^[ \t]*#{1,6}\s+/gm, "") // headings
    .replace(/^[ \t]*[-•]\s+/gm, ""); // leading bullet markers → plain line
}

export default function SupportWidget() {
  const { lang } = useLanguage();
  const c = COPY[lang === "en" ? "en" : "de"];

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Prefill the e-mail from the logged-in session, if any.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (active && user?.email) setEmail(user.email);
      } catch {
        // Not logged in / Supabase unavailable — leave the field blank.
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Keep the message list scrolled to the latest entry.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, mode]);

  // Focus the input when the chat opens.
  useEffect(() => {
    if (open && mode === "chat") inputRef.current?.focus();
  }, [open, mode]);

  async function sendQuestion() {
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: question,
          messages: nextMessages,
        }),
      });
      const data = (await res.json()) as {
        needs_human?: boolean;
        answer?: string;
      };

      if (data.needs_human === false && data.answer) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer as string },
        ]);
      } else {
        // Hand over to a human: surface the note in-chat and open the form,
        // prefilled with the question that couldn't be answered.
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: c.handoff },
        ]);
        setContactMessage(question);
        setMode("contact");
      }
    } catch {
      // Network error → also route to the human contact form.
      setMessages((prev) => [...prev, { role: "assistant", content: c.handoff }]);
      setContactMessage(question);
      setMode("contact");
    } finally {
      setLoading(false);
    }
  }

  function openContactForm() {
    // Seed the form with the customer's last question if it's still empty.
    if (!contactMessage.trim()) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      if (lastUser) setContactMessage(lastUser.content);
    }
    setError(null);
    setMode("contact");
  }

  async function submitContact() {
    if (submitting) return;
    const trimmedEmail = email.trim();
    const trimmedMessage = contactMessage.trim();
    if (!EMAIL_RE.test(trimmedEmail)) {
      setError(c.errorEmail);
      return;
    }
    if (!trimmedMessage) {
      setError(c.errorMessage);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/support/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          message: trimmedMessage,
          transcript: messages,
        }),
      });
      if (!res.ok) {
        setError(c.errorGeneric);
        return;
      }
      setMode("sent");
    } catch {
      setError(c.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  function onChatKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? c.close : c.open}
        aria-expanded={open}
        className={
          open
            ? "fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-accent text-ink shadow-glow-lg transition-transform hover:bg-accent-bright hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            : "fixed bottom-5 right-5 z-[60] grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-surface ring-1 ring-accent/40 shadow-glow-lg transition-transform hover:scale-105 hover:ring-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        }
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <img
            src="/sam.png"
            alt={c.open}
            className="h-full w-full scale-110 object-cover"
          />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-label={c.title}
          className="fixed bottom-24 right-3 left-3 z-[60] flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-card sm:left-auto sm:right-5 sm:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="h-9 w-9 flex-none overflow-hidden rounded-lg bg-base ring-1 ring-accent/30">
              <img
                src="/sam.png"
                alt={c.title}
                className="h-full w-full scale-110 object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{c.title}</p>
              <p className="truncate text-xs text-faint">{c.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={c.close}
              className="ml-auto grid h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
            {mode === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-muted">{c.confirmation}</p>
              </div>
            ) : (
              <>
                {/* Greeting */}
                <div className="mb-3 flex items-start gap-2">
                  <img
                    src="/sam.png"
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-7 flex-none rounded-full object-cover ring-1 ring-accent/30"
                  />
                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium text-faint">{c.name}</p>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.05] px-3.5 py-2.5 text-sm leading-relaxed text-muted">
                      {c.greeting}
                    </div>
                  </div>
                </div>

                {/* Conversation */}
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="mb-3 flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm leading-relaxed text-ink">
                        {m.content}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="mb-3 flex items-start gap-2">
                      <img
                        src="/sam.png"
                        alt=""
                        aria-hidden="true"
                        className="h-7 w-7 flex-none rounded-full object-cover ring-1 ring-accent/30"
                      />
                      <div className="min-w-0">
                        <p className="mb-1 text-xs font-medium text-faint">{c.name}</p>
                        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-white/[0.05] px-3.5 py-2.5 text-sm leading-relaxed text-muted">
                          {toPlainText(m.content)}
                        </div>
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="mb-3 flex">
                    <div className="rounded-2xl rounded-tl-sm bg-white/[0.05] px-3.5 py-2.5 text-sm text-faint">
                      {c.thinking}
                    </div>
                  </div>
                )}

                {/* Inline contact form */}
                {mode === "contact" && (
                  <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <p className="mb-3 text-xs leading-relaxed text-faint">{c.formIntro}</p>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="mb-3 w-full rounded-lg border border-white/10 bg-base px-3 py-2 text-sm text-white placeholder:text-faint focus:border-accent focus:outline-none"
                      placeholder="you@example.com"
                    />
                    <label className="mb-1 block text-xs font-medium text-muted">
                      {c.messageLabel}
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={4}
                      className="mb-3 w-full resize-none rounded-lg border border-white/10 bg-base px-3 py-2 text-sm text-white placeholder:text-faint focus:border-accent focus:outline-none"
                    />
                    {error && (
                      <p className="mb-2 text-xs text-red-400">{error}</p>
                    )}
                    <button
                      type="button"
                      onClick={submitContact}
                      disabled={submitting}
                      className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-bright disabled:opacity-60"
                    >
                      {submitting ? c.sending : c.submit}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer / composer */}
          {mode === "chat" && (
            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onChatKeyDown}
                  placeholder={c.placeholder}
                  className="flex-1 rounded-full border border-white/10 bg-base px-4 py-2.5 text-sm text-white placeholder:text-faint focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={sendQuestion}
                  disabled={loading || !input.trim()}
                  aria-label={c.send}
                  className="grid h-10 w-10 flex-none place-items-center rounded-full bg-accent text-ink transition-colors hover:bg-accent-bright disabled:opacity-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12l16-8-6 16-3.5-6.5L4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={openContactForm}
                className="mt-2 w-full text-center text-xs text-faint underline-offset-2 transition-colors hover:text-muted hover:underline"
              >
                {c.toSupport}
              </button>
            </div>
          )}

          {mode === "contact" && (
            <div className="border-t border-white/10 p-3">
              <button
                type="button"
                onClick={() => setMode("chat")}
                className="w-full text-center text-xs text-faint underline-offset-2 transition-colors hover:text-muted hover:underline"
              >
                {c.backToChat}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
