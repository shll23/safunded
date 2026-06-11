"use client";

import { useT } from "@/lib/i18n";

export default function Disclaimer() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
          {t.disclaimer.eyebrow}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {t.disclaimer.body}
        </p>
      </div>
    </section>
  );
}
