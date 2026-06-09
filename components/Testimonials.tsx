"use client";

import { testimonials } from "@/lib/plans";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "text-gold" : "text-white/15"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.95 2.6.95-5.49-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useT();
  return (
    <section
      id="testimonials"
      className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.reviews.eyebrow}
          title={t.reviews.title}
          sub={t.reviews.sub}
        />

        {/* Sample-content disclaimer — these are NOT real reviews. */}
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-dashed border-white/15 bg-white/[0.015] px-5 py-3 text-center">
          <p className="text-xs leading-relaxed text-faint">
            {t.reviews.sampleDisclaimer}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-white/15"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/[0.06] pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-faint">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-faint">
          {t.reviews.riskNote}
        </p>
      </div>
    </section>
  );
}
