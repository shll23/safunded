export default function Disclaimer() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Risk disclaimer
        </p>
        {/* LEGAL: Final wording should be reviewed by your lawyer. */}
        <p className="mt-3 text-xs leading-relaxed text-muted">
          SAFunded does not provide financial advice, investment services,
          brokerage services or access to live client funds. All trading
          accounts are simulated unless explicitly stated otherwise. Any
          performance-based rewards are subject to the applicable Terms &amp;
          Conditions, risk rules and eligibility requirements. Trading financial
          markets involves risk and past performance is not indicative of future
          results.
        </p>
      </div>
    </section>
  );
}
