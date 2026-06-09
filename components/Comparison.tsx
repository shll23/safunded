import { comparisonPoints } from "@/lib/plans";
import { SectionHeading } from "./HowItWorks";

export default function Comparison() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why SAFunded"
          title="A streamlined path to simulated funding"
          sub="Unlike complex multi-step evaluation models, SAFunded focuses on a streamlined instant funding experience."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {comparisonPoints.map((p) => (
            <div
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
            >
              <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-accent/15 text-accent">
                <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-sm leading-relaxed text-white">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
