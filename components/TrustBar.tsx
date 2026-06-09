"use client";

import { useT } from "@/lib/i18n";

export default function TrustBar() {
  const t = useT();
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-faint">
          {t.trust.eyebrow}
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.trust.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/15"
            >
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder — see note */}
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.015] p-6 text-center">
          <p className="text-sm text-faint">{t.trust.testimonialPlaceholder}</p>
        </div>
      </div>
    </section>
  );
}
