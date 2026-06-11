"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { persistLang, useLanguage, useT } from "@/lib/i18n";
import { legalLocaleFromPath } from "@/lib/legal";
import type { Language } from "@/lib/translations";
import AnnouncementBar from "./AnnouncementBar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useT();

  const navLinks = [
    { label: t.header.nav.howItWorks, href: "#how-it-works" },
    { label: t.header.nav.accounts, href: "#accounts" },
    { label: t.header.nav.rules, href: "#rules" },
    { label: t.header.nav.payouts, href: "#payouts" },
    { label: t.header.nav.reviews, href: "#testimonials" },
    { label: t.header.nav.faq, href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />
      <div
        className={`transition-all duration-300 ${
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
 * Clearly visible "DE | EN" language switcher used in the header, footer,
 * checkout and on every legal page. German is the default language.
 *
 * It is route-aware: on a legal page (German "/<slug>" or English "/en/<slug>")
 * each segment links to that page's counterpart URL, so every English page has
 * its own, linkable address and the choice survives via the URL. Everywhere
 * else (homepage, checkout, …) the segments flip the in-page language instantly
 * via the language context. Both paths persist the preference (cookie +
 * localStorage) so it is remembered across pages.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const { lang: ctxLang, setLang } = useLanguage();
  const legal = legalLocaleFromPath(pathname);

  // On a legal page the active language is dictated by the route; otherwise by
  // the language context.
  const active: Language = legal ? legal.lang : ctxLang;

  const base =
    "inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-0.5 text-xs font-semibold";
  const seg = "rounded-md px-2.5 py-1.5 font-mono tracking-wide transition-all";
  const on = "bg-accent text-ink";
  const off = "text-muted hover:text-white";

  function Segment({ code, label }: { code: Language; label: string }) {
    const isActive = active === code;
    const cls = `${seg} ${isActive ? on : off}`;

    // Legal pages: link to the counterpart locale route.
    if (legal) {
      const href = code === "de" ? `/${legal.slug}` : `/en/${legal.slug}`;
      return (
        <Link
          href={href}
          aria-current={isActive ? "true" : undefined}
          onClick={() => persistLang(code)}
          className={cls}
        >
          {label}
        </Link>
      );
    }

    // Everywhere else: flip the in-page language.
    return (
      <button
        type="button"
        aria-pressed={isActive}
        onClick={() => setLang(code)}
        className={cls}
      >
        {label}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Sprache / Language"
      className={`${base} ${className}`}
    >
      <GlobeIcon />
      <Segment code="de" label="DE" />
      <span className="text-faint" aria-hidden="true">
        |
      </span>
      <Segment code="en" label="EN" />
    </div>
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
