"use client";

import { plans } from "@/lib/plans";
import CheckoutButton from "./CheckoutButton";
import PromoBanner from "./PromoBanner";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

export default function Pricing() {
  const t = useT();
  return (
    <section id="accounts" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(45,212,167,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          sub={t.pricing.sub}
        />

        <PromoBanner />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const copy = t.pricing.plans[plan.id];
            return (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all ${
                  plan.mostPopular
                    ? "border-accent/40 bg-gradient-to-b from-accent/[0.06] to-transparent shadow-glow"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                }`}
              >
                {plan.mostPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                    {t.pricing.mostPopular}
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-white">{copy.name}</h3>
                  <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-muted">
                    {plan.accountType}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wide text-faint">
                    {t.pricing.simulatedCapital}
                  </p>
                  <p className="mt-1 font-display text-4xl font-semibold text-white">
                    {plan.simulatedCapital}
                  </p>
                </div>

                <dl className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6 text-sm">
                  <Row label={t.pricing.rows.profitSplit} value={t.pricing.values.profitSplit} accent />
                  <Row label={t.pricing.rows.maxDailyLoss} value={t.pricing.values.maxDailyLoss} />
                  <Row label={t.pricing.rows.maxOverallLoss} value={t.pricing.values.maxOverallLoss} />
                  <Row label={t.pricing.rows.minTradingDays} value={t.pricing.values.minTradingDays} />
                  <Row label={t.pricing.rows.payoutCycle} value={t.pricing.values.payoutCycle} />
                </dl>

                <div className="mt-6 border-t border-white/[0.07] pt-5">
                  <p className="text-xs text-faint">{t.pricing.launchPriceLabel}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-semibold text-white">
                      {plan.launchPrice}
                    </p>
                    <p className="text-sm text-faint line-through">{plan.price}</p>
                  </div>
                  <p className="mt-1.5 text-[11px] text-accent">
                    {t.pricing.withCode}
                  </p>
                  <p className="mt-1 text-[11px] text-faint">{t.pricing.exclTaxes}</p>
                </div>

                {/* Pinned to the card bottom so CTAs align across columns of
                    differing content height. */}
                <div className="mt-auto pt-6">
                  <CheckoutButton
                    planId={plan.id}
                    label={copy.cta}
                    variant={plan.mostPopular ? "primary" : "ghost"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-faint">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd
        className={`font-mono ${accent ? "text-accent" : "text-white"}`}
      >
        {value}
      </dd>
    </div>
  );
}
