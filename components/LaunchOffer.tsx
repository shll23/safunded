"use client";

import { useT } from "@/lib/i18n";

/**
 * Launch-offer banner with a deliberate red accent — a soft red border, a faint
 * red glow and a quiet red surface — so it reads as a time-limited offer and
 * stands apart from the calm emerald palette of the rest of the page, without
 * tipping into a loud or cheap-looking sales panel. One clear call to action.
 */
export default function LaunchOffer() {
  const t = useT();
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-rose-500/45 bg-rose-500/[0.05] px-6 py-6 shadow-[0_0_45px_-12px_rgba(244,63,94,0.55)] sm:px-8">
          {/* Soft red wash anchored to the corner for depth without noise. */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(244,63,94,0.16),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-300">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
                </span>
                {t.launch.badge}
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {t.launch.title}
              </p>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
                {t.launch.sub}
              </p>
            </div>

            <a
              href="#accounts"
              className="inline-flex flex-none items-center justify-center rounded-xl bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(244,63,94,0.65)] transition-colors hover:bg-rose-400"
            >
              {t.launch.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
