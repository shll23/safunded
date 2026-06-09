"use client";

import CheckoutButton from "./CheckoutButton";
import { useT } from "@/lib/i18n";

export default function CTA() {
  const t = useT();
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/[0.08] via-white/[0.02] to-transparent p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            {t.cta.desc}
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <CheckoutButton planId="50k" label={t.cta.start} />
            </div>
            <a
              href="#accounts"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
            >
              {t.cta.compare}
            </a>
          </div>
          <p className="mt-5 text-xs text-faint">{t.cta.note}</p>
        </div>
      </div>
    </section>
  );
}
