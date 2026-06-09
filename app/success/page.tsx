import Link from "next/link";
import { Logo } from "@/components/Header";

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/[0.06] to-transparent p-10 shadow-glow">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15">
            <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
            Payment successful
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Thank you for purchasing your SAFunded account. Your onboarding
            details will be sent to your email shortly.
          </p>

          {/* Next steps card */}
          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
              What happens next
            </p>
            <ol className="mt-3 space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="font-mono text-accent">1.</span> Check your
                inbox for the onboarding email.
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-accent">2.</span> Review your
                account&rsquo;s risk rules before trading.
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-accent">3.</span> Log in and
                start trading within the rules.
              </li>
            </ol>
            {/* EDIT-ME: replace with your real onboarding steps / links */}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-accent-bright"
            >
              Back to Home
            </Link>
            {/* EDIT-ME: point to your real dashboard URL */}
            <a
              href="#"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
            >
              Go to Dashboard
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-faint">
          Rewards are subject to rule compliance and Terms &amp; Conditions.
          Trading involves risk.
        </p>
      </div>
    </main>
  );
}
