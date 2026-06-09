"use client";

import { useState } from "react";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const t = useT();

  return (
    <section id="faq" className="border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <div className="mt-12 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08]">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white/[0.02]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="text-sm font-medium text-white">{f.q}</span>
                  <span
                    className={`grid h-6 w-6 flex-none place-items-center rounded-full border border-white/15 text-muted transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
