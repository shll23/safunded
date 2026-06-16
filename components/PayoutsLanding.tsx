"use client";

import Link from "next/link";
import { SectionHeading } from "./HowItWorks";
import PayoutCertificateSlideshow from "./PayoutCertificateSlideshow";
import { useT } from "@/lib/i18n";
import { payoutLedger } from "@/lib/plans";

/** Whole-dollar USD formatter used for the aggregate stat tiles. */
const usd = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

/** Flag emoji per payout country, shown alongside the country name. */
const countryFlags: Record<string, string> = {
  de: "🇩🇪",
  at: "🇦🇹",
  ch: "🇨🇭",
  nl: "🇳🇱",
  es: "🇪🇸",
  it: "🇮🇹",
};

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export default function PayoutsLanding() {
  const t = useT();
  const p = t.payoutsPage;

  // Aggregate stats are derived from the ledger so the headline figures always
  // match the examples shown below.
  const totalUsd = payoutLedger.reduce((sum, r) => sum + r.usdValue, 0);
  const count = payoutLedger.length;
  const avgUsd = totalUsd / count;
  const medianHours = Math.round(
    median(payoutLedger.map((r) => r.processingHours))
  );

  // Recent payouts: newest first, limited to the six most recent.
  const recent = [...payoutLedger]
    .sort((a, b) => b.year - a.year || b.month - a.month)
    .slice(0, 6);

  const fmtDate = (month: number, year: number) =>
    `${p.months[month - 1]} ${year}`;

  const stats = [
    { value: p.stats.totalPaidValue, label: p.stats.totalPaid },
    { value: p.stats.payoutsCountValue, label: p.stats.payoutsCount },
    { value: `${medianHours}${p.largest.hoursSuffix}`, label: p.stats.medianTime },
    { value: usd(avgUsd), label: p.stats.avgPayout },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {p.hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {p.hero.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {p.hero.sub}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#accounts"
                className="cta-shimmer inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright hover:shadow-glow-lg"
              >
                {p.hero.ctaPrimary}
              </Link>
              <Link
                href="/payout-policy"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                {p.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Aggregate stats */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center"
              >
                <p className="font-display text-3xl font-semibold text-accent">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wide text-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-faint">
            {p.stats.note}
          </p>
        </div>
      </section>

      {/* Payout certificate slideshow */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.certificates.eyebrow}
            title={p.certificates.title}
            sub={p.certificates.sub}
          />

          <PayoutCertificateSlideshow />

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-faint">
            {p.certificates.footnote}
          </p>
        </div>
      </section>

      {/* Recent payouts table */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.activity.eyebrow}
            title={p.activity.title}
            sub={p.activity.sub}
          />

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wide text-faint">
                  <th className="px-5 py-4 font-medium">{p.activity.columns.date}</th>
                  <th className="px-5 py-4 font-medium">{p.activity.columns.country}</th>
                  <th className="px-5 py-4 font-medium">{p.activity.columns.method}</th>
                  <th className="hidden px-5 py-4 font-medium sm:table-cell">
                    {p.activity.columns.account}
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    {p.activity.columns.amount}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr
                    key={`${r.name}-${i}`}
                    className="border-b border-white/[0.05] last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4 text-muted">
                      {fmtDate(r.month, r.year)}
                    </td>
                    <td className="px-5 py-4 text-muted">
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden="true">{countryFlags[r.country]}</span>
                        {p.countries[r.country]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted">{p.methods[r.method]}</td>
                    <td className="hidden px-5 py-4 text-muted sm:table-cell">
                      ${r.account}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-accent">
                      {r.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How payouts work */}
      <section className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow={p.flow.eyebrow} title={p.flow.title} />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.flow.steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all hover:border-accent/30 hover:bg-white/[0.03]"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payout conditions */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading
            eyebrow={p.conditions.eyebrow}
            title={p.conditions.title}
            sub={p.conditions.sub}
          />

          <dl className="mt-12 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            {p.conditions.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="text-sm font-semibold text-white">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 text-center">
            <Link
              href="/trading-rules"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              {p.conditions.cta}
            </Link>
          </div>

          <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-xs leading-relaxed text-faint">
            {p.disclaimer}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {p.finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {p.finalCta.desc}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#accounts"
              className="cta-shimmer inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright hover:shadow-glow-lg"
            >
              {p.finalCta.primary}
            </Link>
            <Link
              href="/#rules"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              {p.finalCta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
