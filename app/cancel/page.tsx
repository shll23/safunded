import Link from "next/link";
import { Logo } from "@/components/Header";

export default function CancelPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/5">
            <svg className="h-7 w-7 text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
            Checkout cancelled
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your payment was not completed. You can return to the account
            selection and try again whenever you&rsquo;re ready.
          </p>

          <div className="mt-8">
            <Link
              href="/#accounts"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-accent-bright"
            >
              View Accounts
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-faint">
          No charge was made. Trading involves risk.
        </p>
      </div>
    </main>
  );
}
