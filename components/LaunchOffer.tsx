"use client";

import { useEffect, useState } from "react";
import { useLanguage, useT } from "@/lib/i18n";
import { LAUNCH_OFFER_ENDS_AT } from "@/lib/plans";

/** Remaining time broken into whole days/hours/minutes/seconds. */
function timeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    done: diff === 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
  };
}

/**
 * Launch-offer banner with a deliberate red accent — a soft red border, a faint
 * red glow and a quiet red surface — so it reads as a time-limited offer and
 * stands apart from the calm emerald palette of the rest of the page, without
 * tipping into a loud or cheap-looking sales panel. One clear call to action.
 *
 * A live countdown to LAUNCH_OFFER_ENDS_AT makes the discount read as genuinely
 * time-limited rather than a permanent price.
 */
export default function LaunchOffer() {
  const t = useT();
  const { lang } = useLanguage();
  const target = new Date(LAUNCH_OFFER_ENDS_AT).getTime();

  // Start null so server and first client render match (avoids hydration
  // mismatch); the real countdown is filled in after mount and ticks each second.
  const [left, setLeft] = useState<ReturnType<typeof timeLeft> | null>(null);
  useEffect(() => {
    setLeft(timeLeft(target));
    const id = setInterval(() => setLeft(timeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const endsOnLabel = new Date(target).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-GB",
    { day: "2-digit", month: "long", year: "numeric" },
  );
  const expired = left?.done ?? false;

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

              {/* Live countdown — real urgency tied to LAUNCH_OFFER_ENDS_AT. */}
              {expired ? (
                <p className="mt-4 text-sm font-medium text-rose-300">
                  {t.launch.expired}
                </p>
              ) : (
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-300/90">
                    {t.launch.endsIn}
                  </p>
                  <div className="mt-2 flex items-center gap-2" aria-live="polite">
                    {left ? (
                      [
                        [left.days, t.launch.units.days],
                        [left.hours, t.launch.units.hours],
                        [left.mins, t.launch.units.mins],
                        [left.secs, t.launch.units.secs],
                      ].map(([value, unit], i) => (
                        <span
                          key={i}
                          className="flex min-w-[3rem] flex-col items-center rounded-lg border border-rose-500/30 bg-rose-500/[0.08] px-2 py-1.5"
                        >
                          <span className="font-mono text-lg font-semibold tabular-nums text-white">
                            {String(value).padStart(2, "0")}
                          </span>
                          <span className="text-[10px] uppercase tracking-wide text-rose-300/80">
                            {unit}
                          </span>
                        </span>
                      ))
                    ) : (
                      // Placeholder boxes keep layout stable before the timer mounts.
                      [0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className="flex min-w-[3rem] flex-col items-center rounded-lg border border-rose-500/30 bg-rose-500/[0.08] px-2 py-1.5"
                        >
                          <span className="font-mono text-lg font-semibold tabular-nums text-white">
                            --
                          </span>
                        </span>
                      ))
                    )}
                  </div>
                  <p className="mt-2 text-[11px] text-muted">
                    {t.launch.endsOn} {endsOnLabel}
                  </p>
                </div>
              )}
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
