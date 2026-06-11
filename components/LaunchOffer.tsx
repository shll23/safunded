"use client";

import CheckoutButton from "./CheckoutButton";
import { useT } from "@/lib/i18n";

/**
 * Dedicated launch-offer section: highlights the 35% LAUNCH35 discount with a
 * clear benefit list and a single, focused call to action.
 */
export default function LaunchOffer() {
  const t = useT();
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/[0.10] via-white/[0.02] to-transparent p-8 sm:p-12">
          <div className="pointer-events-none absolute -top-24 left-1/3 h-60 w-[520px] -translate-x-1/2 rounded-full bg-rose-500/15 blur-[120px]" />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-rose-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                {t.launch.badge}
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t.launch.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                {t.launch.sub}
              </p>

              <div className="mt-8 max-w-xs">
                <CheckoutButton planId="25k" label={t.launch.cta} />
              </div>
            </div>

            <ul className="grid gap-3">
              {t.launch.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                >
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent/15 text-accent">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-white">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
