"use client";

/**
 * ============================================================================
 *  SAFunded — TRADING INSTRUMENTS EXPLORER
 * ============================================================================
 *  A standalone, self-contained showcase of every tradable instrument, grouped
 *  into collapsible categories with a live symbol search and a stats strip.
 *
 *  Design notes
 *  ------------
 *  • Built in the existing dark SAFunded look (base / surface tokens) but with a
 *    dedicated RED accent — scoped entirely to this page via the local
 *    `--mkt-accent` CSS variable, so nothing on the rest of the site changes.
 *  • Mobile-first: a single responsive column that expands to a grid on wider
 *    screens; symbol chips wrap fluidly.
 *  • Categories open/close with a smooth grid-rows height transition and a soft
 *    fade-in of their contents (disabled under prefers-reduced-motion via
 *    globals.css). Hovering a symbol gives a gentle red glow.
 *  • Pure client state, no dependencies — the whole list is static data, so the
 *    page stays fast and ships almost no JS.
 * ============================================================================
 */

import { useMemo, useState } from "react";

type CategoryKey =
  | "forex"
  | "indices"
  | "stocks"
  | "metals"
  | "energies"
  | "crypto";

interface Category {
  key: CategoryKey;
  name: string;
  blurb: string;
  symbols: string[];
  Icon: (props: { className?: string }) => JSX.Element;
}

/* ---- Instrument data ----------------------------------------------------- */

const FOREX = [
  "AUDCAD", "AUDCHF", "AUDJPY", "AUDNZD", "AUDUSD",
  "CADCHF", "CADJPY", "CHFJPY",
  "EURAUD", "EURCAD", "EURCHF", "EURGBP", "EURJPY", "EURNZD", "EURUSD",
  "GBPAUD", "GBPCAD", "GBPNZD", "GBPJPY", "GBPUSD", "GBPCHF",
  "NZDCAD", "NZDCHF", "NZDJPY", "NZDUSD",
  "USDCAD", "USDCHF", "USDJPY",
];

const INDICES = [".US500Cash", ".US30Cash", ".USTECHCash", ".DE40Cash", ".JP225Cash"];

const METALS = ["XAUUSD", "XAGUSD", "XAUEUR"];

const ENERGIES = ["BRENT", "WTI"];

const CRYPTO = ["BTCUSD", "ETHUSD"];

// US single-stock CFDs available on the platform.
const STOCKS = [
  "AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "AMD", "NFLX", "INTC",
  "JPM", "BAC", "WFC", "GS", "MS", "C", "V", "MA", "PYPL", "AXP",
  "DIS", "KO", "PEP", "MCD", "SBUX", "NKE", "WMT", "COST", "TGT", "HD",
  "BA", "GE", "CAT", "F", "GM", "UBER", "ABNB", "PLTR", "SNOW", "CRM",
  "ORCL", "ADBE", "CSCO", "QCOM", "TXN", "IBM", "T", "VZ", "PFE", "JNJ",
  "UNH", "XOM", "CVX",
];

const CATEGORIES: Category[] = [
  { key: "forex", name: "Forex", blurb: "Major, minor & cross currency pairs", symbols: FOREX, Icon: ForexIcon },
  { key: "indices", name: "Indices", blurb: "Global benchmark stock indices", symbols: INDICES, Icon: IndicesIcon },
  { key: "stocks", name: "Stocks", blurb: "Liquid US single-stock CFDs", symbols: STOCKS, Icon: StocksIcon },
  { key: "metals", name: "Metals", blurb: "Gold & silver against USD / EUR", symbols: METALS, Icon: MetalsIcon },
  { key: "energies", name: "Energies", blurb: "Crude oil benchmarks", symbols: ENERGIES, Icon: EnergiesIcon },
  { key: "crypto", name: "Crypto", blurb: "Leading digital assets", symbols: CRYPTO, Icon: CryptoIcon },
];

const STATS: { value: number; label: string }[] = [
  { value: FOREX.length, label: "Forex Pairs" },
  { value: STOCKS.length, label: "US Stocks" },
  { value: INDICES.length, label: "Indices" },
  { value: METALS.length, label: "Metals" },
  { value: ENERGIES.length, label: "Energies" },
  { value: CRYPTO.length, label: "Crypto Assets" },
];

/* ---- Page ---------------------------------------------------------------- */

export default function MarketsExplorer() {
  const [query, setQuery] = useState("");
  // Categories opened by the user. While searching, matching categories open
  // automatically so results are always visible.
  const [open, setOpen] = useState<Set<CategoryKey>>(new Set(["forex"]));

  const q = query.trim().toUpperCase();
  const searching = q.length > 0;

  const filtered = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      cat,
      symbols: searching
        ? cat.symbols.filter((s) => s.toUpperCase().includes(q))
        : cat.symbols,
    })).filter((row) => row.symbols.length > 0);
  }, [q, searching]);

  const totalMatches = useMemo(
    () => filtered.reduce((n, row) => n + row.symbols.length, 0),
    [filtered]
  );

  function toggle(key: CategoryKey) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <section
      className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16"
      style={{ "--mkt-accent": "#FF3147" } as React.CSSProperties}
    >
      {/* Ambient red glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, rgba(255,49,71,0.16), transparent 70%)",
        }}
      />

      {/* Hero */}
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--mkt-accent)]/30 bg-[var(--mkt-accent)]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--mkt-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--mkt-accent)]" />
          Live on MetaTrader 5
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
          Trading Instruments
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted sm:text-lg">
          Trade Forex, Indices, Stocks, Commodities, Metals and Crypto with
          institutional-grade execution.
        </p>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="group relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-faint transition-colors group-focus-within:text-[var(--mkt-accent)]" />
            <input
              type="search"
              inputMode="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search symbol…"
              aria-label="Search symbol"
              className="w-full rounded-2xl border border-white/10 bg-surface/80 py-3.5 pl-11 pr-4 text-sm text-white shadow-card outline-none transition-all placeholder:text-faint focus:border-[var(--mkt-accent)]/50 focus:shadow-[0_0_0_3px_rgba(255,49,71,0.15)]"
            />
          </div>
          {searching && (
            <p className="mt-3 text-xs text-faint" aria-live="polite">
              {totalMatches} {totalMatches === 1 ? "instrument" : "instruments"} matching
              “{query.trim()}”
            </p>
          )}
        </div>
      </header>

      {/* Stats strip */}
      <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s) => (
          <li
            key={s.label}
            className="rounded-2xl border border-white/8 bg-surface/60 px-4 py-4 text-center backdrop-blur-sm"
          >
            <div className="font-display text-2xl font-bold text-white sm:text-3xl">
              {s.value}
            </div>
            <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-faint">
              {s.label}
            </div>
          </li>
        ))}
      </ul>

      {/* Categories */}
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {filtered.map(({ cat, symbols }) => {
          const isOpen = searching || open.has(cat.key);
          return (
            <CategoryCard
              key={cat.key}
              category={cat}
              symbols={symbols}
              total={cat.symbols.length}
              isOpen={isOpen}
              locked={searching}
              onToggle={() => toggle(cat.key)}
            />
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-white/10 bg-surface/60 py-16 text-center">
            <p className="text-sm text-muted">
              No instruments match “{query.trim()}”.
            </p>
          </div>
        )}
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-faint">
        All trading is conducted in a simulated environment on MetaTrader 5.
        Instrument availability, spreads and leverage may vary by account model
        and market conditions.
      </p>
    </section>
  );
}

/* ---- Category card ------------------------------------------------------- */

function CategoryCard({
  category,
  symbols,
  total,
  isOpen,
  locked,
  onToggle,
}: {
  category: Category;
  symbols: string[];
  total: number;
  isOpen: boolean;
  locked: boolean;
  onToggle: () => void;
}) {
  const { name, blurb, Icon } = category;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-sm transition-colors hover:border-[var(--mkt-accent)]/25">
      <button
        type="button"
        onClick={onToggle}
        disabled={locked}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] disabled:cursor-default"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--mkt-accent)]/25 bg-[var(--mkt-accent)]/10 text-[var(--mkt-accent)]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold text-white">
              {name}
            </span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-semibold text-muted">
              {total}
            </span>
          </span>
          <span className="mt-0.5 block truncate text-xs text-faint">{blurb}</span>
        </span>
        {!locked && (
          <ChevronIcon
            className={`h-5 w-5 shrink-0 text-faint transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[var(--mkt-accent)]" : ""
            }`}
          />
        )}
      </button>

      {/* Collapsible body: grid-rows trick animates height smoothly. */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2 px-5 pb-5 pt-1">
            {symbols.map((sym) => (
              <span
                key={sym}
                className="cursor-default rounded-lg border border-white/10 bg-base/60 px-2.5 py-1.5 font-mono text-[13px] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--mkt-accent)]/60 hover:text-white hover:shadow-[0_0_18px_-2px_rgba(255,49,71,0.55)]"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Icons (minimalist, single-stroke) ----------------------------------- */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.2-3.2" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

function ForexIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5" />
    </svg>
  );
}

function IndicesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l4-5 3 3 4-6 5 7" />
      <path d="M4 20h16" />
    </svg>
  );
}

function StocksIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="4" height="8" rx="1" />
      <rect x="10" y="6" width="4" height="13" rx="1" />
      <rect x="16" y="9" width="4" height="10" rx="1" />
    </svg>
  );
}

function MetalsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 5h10l3 5-8 9-8-9 3-5z" />
      <path d="M4 10h16" />
    </svg>
  );
}

function EnergiesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 1-3.5S12 11 12 8c0-2 0-5 0-5z" />
    </svg>
  );
}

function CryptoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 8h3.2a2 2 0 0 1 0 4H9.5h3.4a2 2 0 0 1 0 4H9.5M10.5 6.5v11M13 6.5v1.5M13 16v1.5" />
    </svg>
  );
}
