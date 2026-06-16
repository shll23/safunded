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
          {/* Column headers — a 3-column table header from sm up. On mobile each
              row collapses into a self-labeled card, so the columns are never
              squeezed side-by-side on a narrow screen. */}
          <div className="hidden border-b border-white/[0.08] sm:grid sm:grid-cols-[minmax(7rem,1fr)_1.4fr_1.4fr]">
            <div className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-faint sm:px-6">
              {/* point column */}
            </div>
            <div className="flex items-center gap-2.5 bg-accent/[0.06] px-5 py-4 sm:px-6">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                SA
              </span>
              <span className="text-sm font-semibold text-white sm:text-base">
                {t.comparison.safundedLabel}
              </span>
            </div>
            <div className="px-5 py-4 sm:px-6">
              <span className="text-sm font-semibold text-muted sm:text-base">
                {t.comparison.traditionalLabel}
              </span>
            </div>
          </div>

          {/* Rows: self-labeled cards on mobile; three columns from sm up. */}
          {t.comparison.rows.map((row, i) => (
            <div
              key={row.point}
              className={`flex flex-col sm:grid sm:grid-cols-[minmax(7rem,1fr)_1.4fr_1.4fr] sm:items-stretch ${
                i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
              }`}
            >
              {/* Point label */}
              <div className="border-b border-white/[0.06] px-5 pb-1 pt-4 sm:flex sm:items-center sm:border-b-0 sm:px-6 sm:py-5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-accent sm:text-xs sm:text-faint">
                  {row.point}
                </span>
              </div>

              {/* SAFunded */}
              <div className="flex items-start gap-2.5 border-b border-white/[0.06] px-5 py-3 sm:border-b-0 sm:px-6 sm:py-5">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent/15 text-accent">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent sm:hidden">
                    {t.comparison.safundedLabel}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white">
                    {row.safunded}
                  </p>
                </div>
              </div>

              {/* Traditional */}
              <div className="flex items-start gap-2.5 px-5 py-3 sm:px-6 sm:py-5">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-white/15 text-faint">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-faint sm:hidden">
                    {t.comparison.traditionalLabel}
                  </p>
                  <p className="text-sm leading-relaxed text-muted">{row.traditional}</p>
                </div>
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
