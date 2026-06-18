"use client";

import { useT } from "@/lib/i18n";

/**
 * Calm trust band. Rather than a wall of bordered cards, it leads with a single
 * neutral statement about who SAFunded is built for, followed by four short,
 * open trust points separated only by hairlines — plenty of breathing room and
 * no boxed-in feel.
 */
export default function TrustBar() {
  const t = useT();
  return (
    <section className="border-y border-white/[0.06] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {t.trust.eyebrow}
        </p>
        <p className="mx-auto mt-4 max-w-2xl font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">
          {t.trust.statement}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-10 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {t.trust.items.map((item) => (
          <div key={item.title} className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
