const trustItems = [
  {
    title: "Transparent rules",
    desc: "Every limit is published up front. No surprises, no hidden conditions.",
  },
  {
    title: "Secure payments via Stripe",
    desc: "Card details are handled by Stripe. SAFunded never stores them.",
  },
  {
    title: "Built for disciplined traders",
    desc: "A structure that rewards consistency and risk management.",
  },
  {
    title: "Simple account structure",
    desc: "Three clear sizes — 25K, 50K, 100K. No hidden account types.",
  },
  {
    title: "Clear payout process",
    desc: "Reward eligibility and review steps are documented and consistent.",
  },
  {
    title: "Risk disclosed honestly",
    desc: "Simulated capital, performance-based rewards — stated plainly.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-faint">
          What SAFunded stands for
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/15"
            >
              <h3 className="text-base font-semibold text-white">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder — see note */}
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-6 text-center">
          <p className="text-sm text-faint">
            Testimonial placeholder — replace with verified trader feedback once
            available. Do not add fabricated reviews.
          </p>
        </div>
      </div>
    </section>
  );
}
