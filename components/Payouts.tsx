import { payoutInfo } from "@/lib/plans";
import { SectionHeading } from "./HowItWorks";

const cards = [
  {
    title: "Profit split",
    value: payoutInfo.profitSplit,
    desc: "The share of eligible simulated performance that may be paid as a reward. Exact terms are defined in the payout policy.",
  },
  {
    title: "Payout cycle",
    value: payoutInfo.payoutCycle,
    desc: "How often eligible reward requests are processed once requirements are met.",
  },
  {
    title: "Review process",
    value: payoutInfo.reviewProcess,
    desc: "Each request goes through a compliance review against the trading rules before approval.",
  },
  {
    title: "First reward window",
    value: payoutInfo.firstPayoutWindow,
    desc: "The earliest point at which an account may request its first reward.",
  },
];

export default function Payouts() {
  return (
    <section id="payouts" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Payouts & rewards"
          title="Rewards for consistent, rule-compliant performance"
          sub="Trade within the rules, perform positively, and you may become eligible for performance-based rewards."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <p className="text-xs uppercase tracking-wide text-faint">
                {c.title}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-accent">
                {c.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted">
            Payout eligibility is subject to compliance with SAFunded&rsquo;s
            trading rules and the applicable Terms &amp; Conditions. Payouts are
            not guaranteed, there is no guaranteed income, and all rewards are
            subject to eligibility requirements. Trading involves risk.
          </p>
        </div>
      </div>
    </section>
  );
}
