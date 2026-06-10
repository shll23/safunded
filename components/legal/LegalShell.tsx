import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { LEGAL_AS_OF } from "@/lib/legal";

/**
 * Shared layout for every legal page. Provides the SAFunded dark theme, a
 * comfortable reading width (~720px), a compact top bar that links back to the
 * homepage, and the global footer (with the full legal navigation).
 */
export function LegalShell({
  title,
  intro,
  showAsOf = true,
  children,
}: {
  title: string;
  /** Optional short lead paragraph shown under the heading. */
  intro?: string;
  /** Whether to show the "Stand: <month>" note (hidden e.g. on placeholders). */
  showAsOf?: boolean;
  children: ReactNode;
}) {
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
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            ← Zur Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[720px] flex-1 px-5 py-16 sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {showAsOf && (
          <p className="mt-3 text-sm text-faint">Stand: {LEGAL_AS_OF}</p>
        )}
        {intro && (
          <p className="mt-6 text-[15px] leading-7 text-muted">{intro}</p>
        )}
        <div className="mt-6">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
