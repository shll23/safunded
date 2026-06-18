"use client";

import { useState } from "react";
import { SectionHeading } from "./HowItWorks";
import { useT } from "@/lib/i18n";

/**
 * Trading rules as a quiet list. Each rule shows only its label and headline
 * value by default; the longer explanation is hidden behind a "Show more"
 * toggle that expands the detail inline (no popup, no new page), so the section
 * stays calm and uncluttered — especially on mobile.
 */
export default function Rules() {
  const t = useT();
  return (
    <section
      id="rules"
      className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.rules.eyebrow}
          title={t.rules.title}
          sub={t.rules.sub}
        />

        <div className="mx-auto mt-14 max-w-4xl divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
          {t.rules.items.map((r, i) => (
            <RuleRow
              key={r.label}
              label={r.label}
              value={r.value}
              detail={r.detail}
              tinted={i % 2 === 0}
              showMore={t.common.showMore}
              showLess={t.common.showLess}
            />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-faint">
          {t.rules.note}
        </p>
      </div>
    </section>
  );
}

function RuleRow({
  label,
  value,
  detail,
  tinted,
  showMore,
  showLess,
}: {
  label: string;
  value: string;
  detail: string;
  tinted: boolean;
  showMore: string;
  showLess: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={tinted ? "bg-white/[0.02]" : "bg-transparent"}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-white">{label}</span>
          <span className="font-mono text-sm text-accent">{value}</span>
        </span>
        <span className="flex flex-none items-center gap-1.5 text-xs font-medium text-muted">
          <span className="hidden sm:inline">{open ? showLess : showMore}</span>
          <span
            className={`grid h-6 w-6 place-items-center rounded-full border border-white/15 transition-transform ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{detail}</p>
        </div>
      </div>
    </div>
  );
}
