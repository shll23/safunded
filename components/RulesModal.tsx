"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Plan } from "@/lib/plans";
import { useT } from "@/lib/i18n";

/**
 * Accessible "Rules summary" dialog opened from a pricing card. Shows the key
 * rules for the selected account: size, loss limits, profit split, minimum
 * trading days, payout requirements, a prohibited-practices note and the
 * mandatory simulated-account disclosure.
 *
 * Behaviour: rendered into a portal, closes on backdrop click and the Escape
 * key, locks body scroll while open, traps initial focus on the close button
 * and restores focus to the trigger on close. The shared, language-neutral
 * loss/split/day values live in the pricing dictionary so they always match
 * the values shown on the cards themselves.
 */
export default function RulesModal({
  plan,
  open,
  onClose,
}: {
  plan: Plan;
  open: boolean;
  onClose: () => void;
}) {
  const t = useT();
  const m = t.pricing.rulesModal;
  const v = t.pricing.values;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape and lock background scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const planName = t.pricing.plans[plan.id]?.name ?? plan.name;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={m.close}
        onClick={onClose}
        className="absolute inset-0 bg-base/80 backdrop-blur-sm motion-safe:animate-[fadeIn_0.15s_ease-out]"
      />

      {/* Panel */}
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-white/[0.1] bg-surface shadow-card sm:rounded-2xl motion-safe:animate-[modalIn_0.2s_ease-out]">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-white/[0.08] bg-surface px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {m.title}
            </p>
            <h3 id={titleId} className="mt-1 font-display text-xl font-semibold text-white">
              {planName}
            </h3>
            <p className="mt-1 text-xs text-faint">{m.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={m.close}
            className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/15 text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          <dl className="space-y-2.5 text-sm">
            <ModalRow label={m.accountSize} value={plan.simulatedCapital} />
            <ModalRow label={m.rows.maxDailyLoss} value={v.maxDailyLoss} />
            <ModalRow label={m.rows.maxOverallLoss} value={v.maxOverallLoss} />
            <ModalRow label={m.rows.profitSplit} value={v.profitSplit} accent />
            <ModalRow label={m.rows.minTradingDays} value={v.minTradingDays} />
          </dl>

          <Block heading={m.payoutHeading} body={m.payoutReq} />
          <Block heading={m.prohibitedHeading} body={m.prohibited} />

          <p className="mt-5 rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-xs leading-relaxed text-muted">
            {m.simulatedNote}
          </p>

          <Link
            href="/instant-funded-account-rules"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-bright"
          >
            {m.fullRules}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ModalRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-2.5">
      <dt className="text-muted">{label}</dt>
      <dd className={`font-mono ${accent ? "text-accent" : "text-white"}`}>{value}</dd>
    </div>
  );
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="mt-5">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
        {heading}
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
