"use client";

import { useT } from "@/lib/i18n";

/**
 * Low-key launch-offer banner. The discount is intentionally understated — a
 * single quiet strip deep in the page rather than a loud, pulsing panel — so it
 * informs without applying sales pressure. One calm call to action.
 */
export default function LaunchOffer() {
  const t = useT();
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {t.launch.badge}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {t.launch.title}
            </p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
              {t.launch.sub}
            </p>
          </div>

          <a
            href="#accounts"
            className="inline-flex flex-none items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.07]"
          >
            {t.launch.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
