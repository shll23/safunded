"use client";

import CheckoutButton from "./CheckoutButton";
import TrustpilotBadge from "./TrustpilotBadge";
import { useT } from "@/lib/i18n";

export default function Hero() {
  const t = useT();
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid opacity-[0.18]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.07] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.titleLead}
            <span className="text-accent">{t.hero.titleAccent}</span>
            {t.hero.titleTail}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.desc}
          </p>

          {/* Launch offer + price line */}
          <div className="mt-7 space-y-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
              {t.hero.offerLine}
            </span>
            <p className="text-base font-semibold text-white sm:text-lg">
              {t.hero.priceLine}
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <div className="sm:w-56">
              <CheckoutButton planId="25k" label={t.hero.ctaStart} />
            </div>
            <a
              href="#accounts"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
            >
              {t.hero.viewOptions}
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-lg">
            {t.hero.trustBadges.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-muted">
                <CheckIcon />
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-faint">{t.hero.riskNote}</p>

          <TrustpilotBadge className="mt-8" />
        </div>

        {/* Hero mockup */}
        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  const t = useT();
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-accent/15 to-transparent blur-2xl" />
      <div className="glass rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">{t.hero.mock.accountLabel}</p>
            <p className="font-display text-lg font-semibold text-white">
              {t.hero.mock.accountName}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t.hero.mock.active}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat label={t.hero.mock.balance} value="$50,000.00" />
          <Stat label={t.hero.mock.equity} value="$50,840.20" accent />
          <Stat label={t.hero.mock.dailyLossLimit} value="5%" muted />
          <Stat label={t.hero.mock.overallLossLimit} value="10%" muted />
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{t.hero.mock.profitSplit}</span>
            <span className="font-mono text-accent">{t.hero.mock.profitSplitValue}</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-accent to-emerald-400" />
          </div>
          <p className="mt-2 text-[11px] text-faint">
            {t.hero.mock.rewardNote}
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  muted,
}: {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
      <p className="text-[11px] uppercase tracking-wide text-faint">{label}</p>
      <p
        className={`mt-1 font-mono text-sm ${
          accent ? "text-accent" : muted ? "text-muted" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 flex-none text-accent"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
