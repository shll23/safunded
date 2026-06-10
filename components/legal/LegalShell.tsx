import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LanguageToggle } from "@/components/Header";
import { LEGAL_AS_OF, LEGAL_AS_OF_EN, COURTESY_NOTICE_EN } from "@/lib/legal";
import type { Language } from "@/lib/translations";

/**
 * Shared layout for every legal page. Provides the SAFunded dark theme, a
 * comfortable reading width (~720px), a compact top bar (with the DE | EN
 * switcher and a link back to the homepage) and the global footer.
 *
 * Pages set `lang` so German originals ("/<slug>") and their English courtesy
 * translations ("/en/<slug>") render the correct labels. English pages also
 * show the courtesy-translation notice — the German texts remain the legally
 * binding versions.
 */
export function LegalShell({
  title,
  intro,
  showAsOf = true,
  lang = "de",
  children,
}: {
  title: string;
  /** Optional short lead paragraph shown under the heading. */
  intro?: string;
  /** Whether to show the "Stand / As of <month>" note (hidden e.g. on placeholders). */
  showAsOf?: boolean;
  /** Document language. Defaults to German (the binding original). */
  lang?: Language;
  children: ReactNode;
}) {
  const isEn = lang === "en";
  const asOf = isEn
    ? `As of: ${LEGAL_AS_OF_EN}`
    : `Stand: ${LEGAL_AS_OF}`;
  const backHome = isEn ? "← Back to home" : "← Zur Startseite";

  return (
    <div className="flex min-h-screen flex-col bg-base">
      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-emerald-600 shadow-glow">
              <span className="text-sm font-bold text-ink">SA</span>
            </span>
            <span className="text-base font-semibold tracking-tight text-white">
              SA<span className="text-accent">Funded</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/"
              className="hidden text-sm text-muted transition-colors hover:text-white sm:inline"
            >
              {backHome}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[720px] flex-1 px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {showAsOf && <p className="mt-3 text-sm text-faint">{asOf}</p>}
        {isEn && (
          <p className="mt-6 rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-sm leading-7 text-muted">
            {COURTESY_NOTICE_EN}
          </p>
        )}
        {intro && (
          <p className="mt-6 text-[15px] leading-7 text-muted">{intro}</p>
        )}
        <div className="mt-6">{children}</div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
