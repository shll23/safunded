"use client";

import Link from "next/link";
import { Logo, LanguageToggle } from "@/components/Header";
import { useT } from "@/lib/i18n";

export default function CancelPage() {
  const t = useT();
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <LanguageToggle />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/5">
            <svg className="h-7 w-7 text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
            {t.cancel.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {t.cancel.desc}
          </p>

          <div className="mt-8">
            <Link
              href="/#accounts"
              className="cta-shimmer inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-accent-bright"
            >
              {t.cancel.viewAccounts}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-faint">{t.cancel.note}</p>
      </div>
    </main>
  );
}
