"use client";

import { useEffect, useState } from "react";
import { useLanguage, useT } from "@/lib/i18n";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useT();

  const navLinks = [
    { label: t.header.nav.howItWorks, href: "#how-it-works" },
    { label: t.header.nav.accounts, href: "#accounts" },
    { label: t.header.nav.rules, href: "#rules" },
    { label: t.header.nav.payouts, href: "#payouts" },
    { label: t.header.nav.faq, href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-base/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <a
            href="#accounts"
            className="inline-flex items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright hover:shadow-glow-lg"
          >
            {t.header.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            aria-label={t.header.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white"
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-base/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#accounts"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink"
            >
              {t.header.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/**
 * Compact English / German switcher. Shows the language you can switch TO,
 * so the active language stays implicit in the rest of the UI. The choice is
 * persisted and applied instantly via the language context.
 */
export function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.langToggle.ariaLabel}
      title={t.langToggle.ariaLabel}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-muted transition-all hover:border-white/20 hover:text-white"
    >
      <GlobeIcon />
      <span className="font-mono tracking-wide">
        {lang === "en" ? "EN" : "DE"}
      </span>
      <span className="text-faint" aria-hidden="true">
        /
      </span>
      <span className="font-mono tracking-wide text-accent">
        {t.langToggle.label}
      </span>
    </button>
  );
}

function GlobeIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7.25" />
      <path d="M2.75 10h14.5M10 2.75c2 2 2 12.5 0 14.5-2-2-2-12.5 0-14.5z" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      {/* Logo placeholder — replace with your final mark */}
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-emerald-600 shadow-glow">
        <span className="text-sm font-bold text-ink">SA</span>
      </span>
      {!compact && (
        <span className="text-base font-semibold tracking-tight text-white">
          SA<span className="text-accent">Funded</span>
        </span>
      )}
    </a>
  );
}
