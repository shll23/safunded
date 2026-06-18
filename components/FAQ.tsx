"use client";

import { useState } from "react";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

/**
 * Compact, two-level FAQ. The five top-level categories are accordions that are
 * all closed by default, so the section reads as a short, calm list rather than
 * a long wall of questions. Opening a category reveals its questions, each of
 * which expands its own answer inline — no new page, no popup.
 */
export default function FAQ() {
  const t = useT();
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <div className="mt-12 space-y-4">
          {t.faq.categories.map((category, i) => {
            const isOpen = openCategory === i;
            return (
              <div
                key={category.title}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]"
              >
                <button
                  onClick={() => setOpenCategory(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base font-semibold text-white">
                      {category.title}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-medium text-faint">
                      {category.items.length}
                    </span>
                  </span>
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
                    <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                      {category.items.map((item) => (
                        <Question key={item.q} q={item.q} a={item.a} />
                      ))}
                    </div>
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

function Question({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="text-sm font-medium text-white">{q}</span>
        <span
          className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-white/15 text-xs text-muted transition-transform ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-4 text-sm leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}
