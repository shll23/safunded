"use client";

import { useT } from "@/lib/i18n";

/**
 * Compact Trustpilot-style rating pill used as social proof. Renders the
 * rating, a star, the Trustpilot brand and the trader count. The score and
 * counts come from the dictionary so they can be kept accurate per locale.
 */
export default function TrustpilotBadge({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm ${className}`}
    >
      <span className="font-semibold text-white">{t.trustpilot.rated}</span>
      <span className="text-muted">
        {t.trustpilot.score} {t.trustpilot.outOf}
      </span>
      <span className="inline-flex items-center gap-1.5 font-semibold text-white">
        <StarIcon />
        {t.trustpilot.brand}
      </span>
      <span className="text-faint" aria-hidden="true">·</span>
      <span className="text-muted">
        <span className="font-semibold text-white">{t.trustpilot.count}</span>
      </span>
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      className="h-4 w-4 text-[#00b67a]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77 4.8 17.5l.99-5.78L1.58 7.62l5.82-.85L10 1.5z" />
    </svg>
  );
}
