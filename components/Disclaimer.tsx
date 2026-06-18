"use client";

import { useT } from "@/lib/i18n";

export default function Disclaimer() {
  const t = useT();
  return (
    <section className="mx-auto max-w-3xl px-5 pb-16 pt-4 text-center sm:px-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
        {t.disclaimer.eyebrow}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-faint">
        {t.disclaimer.body}
      </p>
    </section>
  );
}
