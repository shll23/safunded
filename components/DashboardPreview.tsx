import { SectionHeading } from "./HowItWorks";

const recentTrades = [
  { sym: "EUR/USD", side: "Long", pnl: "+$214.50", up: true },
  { sym: "XAU/USD", side: "Short", pnl: "-$88.20", up: false },
  { sym: "US100", side: "Long", pnl: "+$430.10", up: true },
  { sym: "GBP/JPY", side: "Long", pnl: "+$96.40", up: true },
];

export default function DashboardPreview() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Platform preview"
          title="A clear view of your account"
          sub="Track balance, equity, risk limits and reward eligibility at a glance. (Visual preview — figures are illustrative.)"
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-accent/10 to-transparent blur-2xl" />
          <div className="glass overflow-hidden rounded-2xl shadow-card">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                  SA
                </span>
                <p className="text-sm font-medium text-white">
                  Instant Funded · 100K
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Active
              </span>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Left: metrics + chart */}
              <div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Metric label="Balance" value="$100,000.00" />
                  <Metric label="Equity" value="$101,268.40" accent />
                  <Metric label="Open P/L" value="+$652.80" accent />
                  <Metric label="Daily loss limit" value="placeholder" muted />
                  <Metric label="Overall loss limit" value="placeholder" muted />
                  <Metric label="Reward target" value="placeholder" muted />
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Equity curve (illustrative)</span>
                    <span className="font-mono text-accent">+1.27%</span>
                  </div>
                  <Sparkline />
                </div>
              </div>

              {/* Right: recent trades */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-wide text-faint">
                  Recent trades
                </p>
                <ul className="mt-3 divide-y divide-white/[0.06]">
                  {recentTrades.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between py-2.5"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{t.sym}</p>
                        <p className="text-[11px] text-faint">{t.side}</p>
                      </div>
                      <span
                        className={`font-mono text-sm ${
                          t.up ? "text-accent" : "text-rose-400"
                        }`}
                      >
                        {t.pnl}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] text-faint">
                  Recent trades placeholder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
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

function Sparkline() {
  return (
    <svg
      viewBox="0 0 320 70"
      className="mt-3 h-16 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(45,212,167)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(45,212,167)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 52 L40 48 L80 50 L120 38 L160 42 L200 28 L240 30 L280 18 L320 22"
        fill="none"
        stroke="rgb(45,212,167)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 52 L40 48 L80 50 L120 38 L160 42 L200 28 L240 30 L280 18 L320 22 L320 70 L0 70 Z"
        fill="url(#spark)"
      />
    </svg>
  );
}
