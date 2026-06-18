"use client";

import { useState } from "react";
import { plans, type PlanId } from "@/lib/plans";
import CheckoutButton from "./CheckoutButton";
import RulesModal from "./RulesModal";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

export default function Pricing() {
  const t = useT();
  const [openPlan, setOpenPlan] = useState<PlanId | null>(null);
  return (
    <section id="accounts" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(45,212,167,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          sub={t.pricing.sub}
        />

        {/* Mobile: a horizontal swipe rail (FTMO-style) so all three account
            sizes sit at the same height and the visitor swipes instead of
            scrolling down a long stacked list. A sliver of the next card peeks
            in to signal that the row is swipeable. From lg up it becomes a calm
            three-column grid. */}
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-4 [scroll-padding-left:1.25rem] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {plans.map((plan) => {
            const copy = t.pricing.plans[plan.id];
            return (
              <div
                key={plan.id}
                className={`relative flex h-full w-[85%] shrink-0 snap-center flex-col rounded-2xl border p-7 transition-all sm:w-[60%] md:w-[44%] lg:w-auto ${
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
                  <button
                    type="button"
                    onClick={() => setOpenPlan(plan.id)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h8a1 1 0 011 1v11l-5-2.5L5 17V5a1 1 0 011-1z" />
                    </svg>
                    {t.pricing.rulesModal.trigger}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-faint">
          {t.pricing.note}
        </p>
      </div>

      {plans.map((plan) => (
        <RulesModal
          key={plan.id}
          plan={plan}
          open={openPlan === plan.id}
          onClose={() => setOpenPlan(null)}
        />
      ))}
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
