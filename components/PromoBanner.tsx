"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

/**
 * Eye-catching discount-code banner shown above the pricing grid, right where
 * visitors decide on a plan. The code can be copied with one click.
 */
export default function PromoBanner() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(t.promo.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — code is still visible.
    }
  };

  return (
    <div className="relative mx-auto mt-12 max-w-3xl">
      {/* Soft glow behind the banner */}
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-rose-500/40 via-rose-500/20 to-rose-500/40 blur-md" />

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-rose-500/40 bg-base/80 px-6 py-5 text-center shadow-[0_0_40px_-12px_rgba(244,63,94,0.55)] sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
          {t.promo.badge}
        </span>

        <span className="hidden h-6 w-px bg-white/10 sm:block" />

        <p className="text-lg font-semibold text-white sm:text-xl">
          {t.promo.headline}
        </p>

        <button
          type="button"
          onClick={copyCode}
          aria-label={t.promo.copy}
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(244,63,94,0.7)] transition-transform hover:scale-[1.03] sm:ml-auto"
        >
          <span className="text-[11px] font-medium uppercase tracking-wide text-rose-100/80">
            {t.promo.codeLabel}
          </span>
          <span className="font-mono tracking-wider">{t.promo.code}</span>
          <span className="text-rose-100/90">
            {copied ? `· ${t.promo.copied}` : <CopyIcon />}
          </span>
        </button>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="7" y="7" width="9" height="9" rx="2" />
      <path d="M4 13V5a2 2 0 012-2h7" />
    </svg>
  );
}
