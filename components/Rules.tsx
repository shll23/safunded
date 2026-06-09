import { rules } from "@/lib/plans";
import { SectionHeading } from "./HowItWorks";

export default function Rules() {
  return (
    <section id="rules" className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Trading rules"
          title="Clear rules, published up front"
          sub="SAFunded is built for disciplined traders. Clear rules protect both the trader and the platform."
        />

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08]">
          {rules.map((r, i) => (
            <div
              key={r.label}
              className={`grid gap-2 px-6 py-5 sm:grid-cols-[200px_1fr] sm:gap-6 ${
                i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-3 sm:block">
                <p className="font-semibold text-white">{r.label}</p>
                <span className="font-mono text-sm text-accent sm:hidden">
                  {r.value}
                </span>
              </div>
              <div className="flex items-start gap-4 sm:items-center">
                <span className="hidden min-w-[120px] font-mono text-sm text-accent sm:inline">
                  {r.value}
                </span>
                <p className="text-sm leading-relaxed text-muted">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-faint">
          Values marked &ldquo;placeholder&rdquo; must be replaced with your
          finalised rules. The full, binding rules live in the Terms &amp;
          Conditions.
        </p>
      </div>
    </section>
  );
}
