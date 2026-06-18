"use client";

import { useState } from "react";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";
import Link from "next/link";

/**
 * Payout highlights. Each card leads with its headline value; the longer
 * explanation stays hidden behind a "Show more" toggle that expands inline, so
 * the section reads as four clean figures rather than four paragraphs.
 */
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.payouts.cards.map((c, i) => (
            <PayoutCard
              key={c.title}
              title={c.title}
              value={values[i]}
              desc={c.desc}
              showMore={t.common.showMore}
              showLess={t.common.showLess}
            />
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

function PayoutCard({
  title,
  value,
  desc,
  showMore,
  showLess,
}: {
  title: string;
  value: string;
  desc: string;
  showMore: string;
  showLess: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <p className="text-xs uppercase tracking-wide text-faint">{title}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-accent">
        {value}
      </p>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-medium text-muted transition-colors hover:text-accent"
      >
        {open ? showLess : showMore}
        <span
          className={`grid h-5 w-5 place-items-center rounded-full border border-white/15 text-xs transition-transform ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted">{desc}</p>
        </div>
      </div>
    </div>
  );
}
