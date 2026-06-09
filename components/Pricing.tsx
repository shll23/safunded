import { plans } from "@/lib/plans";
import CheckoutButton from "./CheckoutButton";
import { SectionHeading } from "./HowItWorks";

export default function Pricing() {
  return (
    <section id="accounts" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(45,212,167,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Accounts"
          title="Choose your Instant Funded Account"
          sub="Three sizes of simulated capital. The same transparent rules apply to all."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
                plan.mostPopular
                  ? "border-accent/40 bg-gradient-to-b from-accent/[0.06] to-transparent shadow-glow"
                  : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {plan.mostPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
                  Most Popular
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-muted">
                  {plan.accountType}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wide text-faint">
                  Simulated capital
                </p>
                <p className="mt-1 font-display text-4xl font-semibold text-white">
                  {plan.simulatedCapital}
                </p>
              </div>

              <dl className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6 text-sm">
                <Row label="Profit split" value={plan.profitSplit} accent />
                <Row label="Max daily loss" value={plan.maxDailyLoss} />
                <Row label="Max overall loss" value={plan.maxOverallLoss} />
                <Row label="Min. trading days" value={plan.minTradingDays} />
                <Row label="Payout cycle" value={plan.payoutCycle} />
              </dl>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs text-faint">One-time fee</p>
                  <p className="font-display text-2xl font-semibold text-white">
                    {plan.price}
                  </p>
                </div>
                <p className="text-[11px] text-faint">excl. taxes</p>
              </div>

              <div className="mt-6">
                <CheckoutButton
                  planId={plan.id}
                  label={plan.cta}
                  variant={plan.mostPopular ? "primary" : "ghost"}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-faint">
          All accounts operate in a simulated trading environment unless
          explicitly stated otherwise. Prices, splits and risk limits shown are
          placeholders — confirm final values before launch. Payouts are not
          guaranteed and are subject to the Terms &amp; Conditions.
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
