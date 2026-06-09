const steps = [
  {
    n: "01",
    title: "Choose your account size",
    desc: "Pick a 25K, 50K or 100K Instant Funded Account based on the amount of simulated capital you want to trade.",
  },
  {
    n: "02",
    title: "Complete secure checkout",
    desc: "Pay securely through Stripe Checkout. Your card details are handled by Stripe, not by SAFunded.",
  },
  {
    n: "03",
    title: "Receive account access",
    desc: "After a successful payment, your onboarding details are sent to your email so you can get started.",
  },
  {
    n: "04",
    title: "Trade within the rules",
    desc: "Trade inside the defined risk rules. With positive performance and full rule compliance, you may become eligible for performance-based rewards according to the payout policy.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From checkout to your first trade"
          sub="Four straightforward steps. No multi-stage evaluation to begin."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all hover:border-accent/30 hover:bg-white/[0.03]"
            >
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-faint">
          Payouts are not guaranteed. Reward eligibility is subject to rule
          compliance and the applicable Terms &amp; Conditions.
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}
