"use client";

import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

export default function Comparison() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.comparison.eyebrow}
          title={t.comparison.title}
          sub={t.comparison.sub}
        />

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-white/[0.08]">
          {/* Column headers */}
          <div className="grid grid-cols-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5 bg-accent/[0.06] px-6 py-5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                SA
              </span>
              <span className="text-base font-semibold text-white">
                {t.comparison.safundedLabel}
              </span>
            </div>
            <div className="px-6 py-5">
              <span className="text-base font-semibold text-muted">
                {t.comparison.traditionalLabel}
              </span>
            </div>
          </div>

          {/* Rows */}
          {t.comparison.rows.map((row, i) => (
            <div
              key={row.safunded}
              className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}`}
            >
              <div className="flex items-start gap-3 px-6 py-5">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent/15 text-accent">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-sm font-medium leading-relaxed text-white">
                  {row.safunded}
                </p>
              </div>
              <div className="flex items-start gap-3 px-6 py-5">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-white/15 text-faint">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-muted">{row.traditional}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-faint">
          {t.comparison.footnote}
        </p>
      </div>
    </section>
  );
}
