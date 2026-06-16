"use client";

import { useT } from "@/lib/i18n";

/**
 * Compact 4-tile trust band shown directly below the pricing grid. Reinforces
 * that SAFunded is a serious, transparent, German-operated provider with secure
 * payments, a clear payout review and fully simulated trading — the questions a
 * prospective buyer weighs right after seeing the price.
 */
export default function TrustHighlights() {
  const t = useT();
  return (
    <section className="border-t border-white/[0.06] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.trustHighlights.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t.trustHighlights.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.trustHighlights.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-accent/30"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <TrustIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustIcon({ name }: { name: "flag" | "shield" | "check" | "sim" }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "flag":
      return (
        <svg {...common}>
          <path d="M4 21V4M4 4h11l-1.5 3.5L15 11H4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M9 11l3 3L20 6" />
          <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" />
        </svg>
      );
    case "sim":
    default:
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M3 9h18M8 21h8M12 17v4" />
        </svg>
      );
  }
}
