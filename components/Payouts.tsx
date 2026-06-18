"use client";

import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";
import Link from "next/link";

export default function Payouts() {
  const t = useT();
  const values = [
    t.payouts.values.profitSplit,
    t.payouts.values.payoutCycle,
    t.payouts.values.reviewProcess,
    t.payouts.values.firstPayoutWindow,
  ];

  return (
    <section id="payouts" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.payouts.eyebrow}
          title={t.payouts.title}
          sub={t.payouts.sub}
        />

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.payouts.cards.map((c, i) => (
            <div key={c.title} className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wide text-faint">
                {c.title}
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-accent">
                {values[i]}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-muted">
          {t.payouts.disclaimer}
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/payouts"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            {t.payouts.viewAll} →
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-faint">
          {t.payouts.footnote}
        </p>
      </div>
    </section>
  );
}
