"use client";

import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

export default function Rules() {
  const t = useT();
  return (
    <section id="rules" className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.rules.eyebrow}
          title={t.rules.title}
          sub={t.rules.sub}
        />

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08]">
          {t.rules.items.map((r, i) => (
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
          {t.rules.note}
        </p>
      </div>
    </section>
  );
}
