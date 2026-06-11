"use client";

import { useT } from "@/lib/i18n";

/**
 * Plain-language SEO explainer section. Describes SAFunded in clear, indexable
 * prose without keyword stuffing.
 */
export default function SeoSection() {
  const t = useT();
  return (
    <section className="border-t border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {t.seo.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t.seo.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted">{t.seo.body}</p>
      </div>
    </section>
  );
}
