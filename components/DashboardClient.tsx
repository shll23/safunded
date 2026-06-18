"use client";

import { useEffect, useState } from "react";
import TrackingWidget from "@/components/TrackingWidget";
import { getQuote } from "@/lib/validopay-checkout";

/**
 * One funded account as rendered on the dashboard. Mirrors the `accounts[]`
 * objects stored in Supabase user_metadata (see lib/compliance.ts). Passed in
 * from the server component as plain JSON.
 */
export interface DashboardAccount {
  account_id: string;
  order_id: string;
  account_plan_name: string;
  account_size: string | null;
  account_status: string;
  account_amount_paid: string | null;
  tracking_token: string | null;
  mt5_login: string | null;
  mt5_password: string | null;
  mt5_server: string | null;
  /** Whether MT5 credentials are available (resolved server-side). */
  has_credentials?: boolean;
}

export interface PlanTile {
  id: string;
  name: string;
  simulatedCapital: string;
  price: string; // regular list price, e.g. "$399"
  launchPrice: string; // discounted launch price, e.g. "$259.35"
}

type Quote = {
  listPrice: number;
  finalPrice: number;
  discount: number; // discount amount in USD
  coupon: { value?: number } | null; // coupon.value is the percent off
};

type QuoteStatus = "idle" | "checking" | "valid" | "invalid" | "error";

// USD display helper: whole prices stay clean ("$399"), cents shown when present.
const fmtUsd = (n: number) =>
  `$${Number.isInteger(n) ? String(n) : Number(n).toFixed(2)}`;

// Percentage saved, preferring the coupon's own `value`; falls back to deriving
// it from the discount amount vs. the list price. Returns null when no reliable
// percent is available.
const couponPercent = (q: Quote) => {
  const value = q.coupon?.value;
  if (typeof value === "number" && value > 0) return Math.round(value);
  if (q.listPrice > 0 && q.discount > 0) {
    return Math.round((q.discount / q.listPrice) * 100);
  }
  return null;
};

// "Discount applied" line for the dashboard buy-another-account box. Always
// shows the saved USD amount and, when known, the percent — the amount is
// never rendered as a percent (e.g. "Rabatt: –35% (–$87.15)").
const discountLabel = (q: Quote) => {
  const amt = fmtUsd(q.discount);
  const pct = couponPercent(q);
  return pct != null
    ? `Rabatt: –${pct}% (–${amt})`
    : `Rabatt angewendet: –${amt}`;
};

const SUPPORT_MAILTO = "mailto:support@safunded.com";

// Kleine Inline-Icons (16px) im Stil des Dashboards – dünne Striche, currentColor.
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M5 15V5a2 2 0 0 1 2-2h8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
    <path
      d="M5 12.5 10 17.5 19 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
    <path
      d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
    <path
      d="M4 4 20 20M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-2.9 3.5M6.4 7.9A16 16 0 0 0 2.5 12S6 18.5 12 18.5c.8 0 1.5-.1 2.2-.3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9.8 9.9a3 3 0 0 0 4.3 4.2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const iconBtn =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-muted transition-all hover:bg-white/[0.07] hover:text-white";

/**
 * MT5-Zugangsdaten-Karte: Login, Passwort (standardmäßig maskiert, per Auge-Icon
 * einblendbar) und Server – jede Zeile mit kleinem Kopieren-Button. Erscheint nur,
 * wenn serverseitig Zugangsdaten gefunden wurden.
 */
function CredentialsCard({
  login,
  password,
  server,
}: {
  login: string | null;
  password: string | null;
  server: string | null;
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (field: string, value: string | null) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      setTimeout(() => setCopied((c) => (c === field ? null : c)), 1500);
    } catch {
      /* Zwischenablage nicht verfügbar – still ignorieren. */
    }
  };

  const rows: {
    key: string;
    label: string;
    value: string | null;
    display: string;
  }[] = [
    { key: "login", label: "Login", value: login, display: login ?? "—" },
    {
      key: "password",
      label: "Passwort",
      value: password,
      display: revealed ? password ?? "—" : "••••••••••",
    },
    { key: "server", label: "Server", value: server, display: server ?? "—" },
  ];

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
        Deine MT5-Zugangsdaten
      </p>
      <dl className="mt-4 divide-y divide-white/[0.06]">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <dt className="text-xs uppercase tracking-[0.14em] text-faint">
              {row.label}
            </dt>
            <dd className="flex min-w-0 items-center gap-2">
              <span className="truncate font-mono text-sm text-white">
                {row.display}
              </span>
              {row.key === "password" ? (
                <button
                  type="button"
                  onClick={() => setRevealed((v) => !v)}
                  aria-label={
                    revealed ? "Passwort verbergen" : "Passwort anzeigen"
                  }
                  className={iconBtn}
                >
                  {revealed ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => copy(row.key, row.value)}
                aria-label={`${row.label} kopieren`}
                title={copied === row.key ? "Kopiert" : `${row.label} kopieren`}
                className={iconBtn}
              >
                {copied === row.key ? <CheckIcon /> : <CopyIcon />}
              </button>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-faint">
        Logge dich damit in MetaTrader&nbsp;5 ein. Teile diese Daten mit
        niemandem.
      </p>
    </div>
  );
}

export default function DashboardClient({
  accounts,
  plans,
}: {
  accounts: DashboardAccount[];
  plans: PlanTile[];
}) {
  // Which account's live dashboard is currently expanded.
  const [openTrackingId, setOpenTrackingId] = useState<string | null>(null);
  // Which account's Order-ID is currently revealed (hidden behind a link until
  // the user taps it).
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  // Buy-another-account section state.
  const [selectedPlan, setSelectedPlan] = useState<string>(
    plans.find((p) => p.id === "50k")?.id ?? plans[0]?.id ?? "50k"
  );
  const [couponCode, setCouponCode] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteStatus, setQuoteStatus] = useState<QuoteStatus>("idle");

  // Live crypto price preview: re-quote (debounced) whenever the code or the
  // selected plan changes. The final price is always computed server-side by
  // Validopay — nothing is derived or hardcoded here.
  useEffect(() => {
    const code = couponCode.trim();
    if (!selectedPlan || !code) {
      setQuote(null);
      setQuoteStatus("idle");
      return;
    }

    let cancelled = false;
    setQuoteStatus("checking");
    const handle = setTimeout(async () => {
      try {
        const q = (await getQuote(selectedPlan, code)) as Quote;
        if (cancelled) return;
        const valid = Number(q?.discount) > 0 || Boolean(q?.coupon);
        setQuote(q);
        setQuoteStatus(valid ? "valid" : "invalid");
      } catch {
        if (cancelled) return;
        setQuote(null);
        setQuoteStatus("error");
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [couponCode, selectedPlan]);

  // Beide Zahlwege (Karte und Krypto) laufen über genau einen gegateten
  // Kauf-Einstieg: die Checkout-Seite mit Clickwrap-Zustimmung (AgreementGate).
  // Hier wird KEINE Zahlung und KEINE Validopay-Order ausgelöst — der Button
  // leitet nur mit vorausgewähltem Plan + Coupon auf /checkout weiter. Die
  // Stripe-Session bzw. Validopay-Order entsteht dort erst nach gespeicherter
  // Zustimmung zur aktuellen Vertragsversion. Kritisch für Krypto, da die
  // Zahlung unwiderruflich ist.
  function goToCheckout() {
    if (!selectedPlan) return;
    const code = couponCode.trim();
    const query = new URLSearchParams({ plan: selectedPlan });
    if (code) query.set("coupon", code);
    window.location.href = `/checkout?${query.toString()}`;
  }

  return (
    <>
      {/* ───────────────────────── Meine Konten ───────────────────────── */}
      <section className="mt-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Meine Konten
        </p>

        {accounts.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <h2 className="font-display text-xl font-semibold text-white">
              Noch kein Konto vorhanden
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Sobald du unten ein Konto kaufst, erscheint es hier mit Status,
              Live-Dashboard und Zugangsdaten.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {accounts.map((acc) => {
              const isSetup = !acc.tracking_token;
              const trackingOpen = openTrackingId === acc.account_id;
              const orderOpen = openOrderId === acc.account_id;
              const hasCreds = acc.has_credentials === true;

              return (
                <div
                  key={acc.account_id}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-display text-lg font-semibold text-white">
                          {acc.account_plan_name}
                        </h2>
                        {isSetup ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
                            Wird eingerichtet
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                            Aktiv
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-muted">
                        {acc.account_size ?? "—"}
                        {acc.account_amount_paid
                          ? ` · bezahlt ${acc.account_amount_paid}`
                          : ""}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-faint">
                        Order-ID
                      </p>
                      {orderOpen ? (
                        <button
                          type="button"
                          onClick={() => setOpenOrderId(null)}
                          title="Order-ID ausblenden"
                          className="mt-0.5 max-w-[10rem] break-all font-mono text-xs text-muted transition-colors hover:text-accent"
                        >
                          {acc.order_id}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOpenOrderId(acc.account_id)}
                          className="mt-0.5 inline-block text-xs font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          Order-ID anzeigen
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hinweis solange die Zugangsdaten noch nicht da sind.
                      Verschwindet automatisch, sobald die Logindaten (hasCreds)
                      eingerichtet sind. */}
                  {!hasCreds ? (
                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                      <span
                        className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed text-amber-100/90">
                        Die Einrichtung deines Accounts kann bis zu 12&nbsp;Stunden
                        dauern – im besten Fall sind es nur wenige Minuten. Sobald
                        deine Zugangsdaten bereitstehen, erscheinen sie hier
                        automatisch. Bei Problemen melde dich unter{" "}
                        <a
                          href={SUPPORT_MAILTO}
                          className="font-semibold text-amber-200 underline underline-offset-2 hover:text-amber-100"
                        >
                          support@safunded.com
                        </a>
                        .
                      </p>
                    </div>
                  ) : null}

                  {/* Aktionen */}
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {acc.tracking_token ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenTrackingId(trackingOpen ? null : acc.account_id)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
                      >
                        {trackingOpen ? "Live-Dashboard ausblenden" : "Live-Dashboard"}
                      </button>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-faint">
                        Tracking folgt
                      </span>
                    )}

                    {!hasCreds ? (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-faint">
                        Zugangsdaten folgen
                      </span>
                    ) : null}

                    <a
                      href={SUPPORT_MAILTO}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
                    >
                      Support
                    </a>
                  </div>

                  {/* Zugangsdaten (MT5) */}
                  {hasCreds ? (
                    <CredentialsCard
                      login={acc.mt5_login}
                      password={acc.mt5_password}
                      server={acc.mt5_server}
                    />
                  ) : null}

                  {/* Live-Dashboard (Tracking-Widget für dieses Konto) */}
                  {trackingOpen && acc.tracking_token ? (
                    <div className="mt-5">
                      <TrackingWidget token={acc.tracking_token} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──────────────────── Weiteres Konto kaufen ──────────────────── */}
      <section className="mt-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Weiteres Konto kaufen
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {plans.map((p) => {
            const active = p.id === selectedPlan;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlan(p.id)}
                aria-pressed={active}
                className={`rounded-2xl border p-5 text-center transition-all ${
                  active
                    ? "border-accent/60 bg-accent/[0.06] shadow-glow"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >
                <span className="block font-display text-xl font-semibold text-white">
                  {p.id.toUpperCase()}
                </span>
                <span className="mt-1.5 block text-sm font-semibold text-white">
                  {p.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Regel-Box — gilt für alle Pläne, daher eine Box unter den Kacheln.
            Optik wie die Plan-Karten der Landingpage: Label links, Wert rechts. */}
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
            Konto-Regeln
          </p>
          <dl className="mt-4 space-y-2.5 border-t border-white/[0.07] pt-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted">Gewinnbeteiligung</dt>
              <dd className="font-mono text-accent">bis zu 80%</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Max. Tagesverlust</dt>
              <dd className="font-mono text-white">5%</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Max. Gesamtverlust</dt>
              <dd className="font-mono text-white">10%</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Min. Trading-Tage</dt>
              <dd className="font-mono text-white">3 Tage</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted">Auszahlungszyklus</dt>
              <dd className="font-mono text-white">2 Wochen</dd>
            </div>
          </dl>
        </div>

        {/* Rabattcode (gilt für den Krypto-Weg; live serverseitig berechnet) */}
        <div className="mt-4">
          <label
            htmlFor="dashboardCoupon"
            className="block text-xs uppercase tracking-wide text-faint"
          >
            Rabattcode
          </label>
          <input
            id="dashboardCoupon"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Rabattcode"
            autoComplete="off"
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          {quoteStatus === "checking" && (
            <p className="mt-2 text-xs text-faint">Code wird geprüft …</p>
          )}
          {quoteStatus === "error" && (
            <p className="mt-2 text-xs text-rose-400">
              Preis konnte nicht ermittelt werden. Bitte erneut versuchen.
            </p>
          )}
          {quoteStatus === "invalid" && (
            <p className="mt-2 text-xs text-rose-400">
              Dieser Code ist ungültig.
            </p>
          )}
          {quoteStatus === "valid" && quote && (
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-white">
                {fmtUsd(quote.finalPrice)}
              </span>
              <span className="text-sm text-faint line-through">
                {fmtUsd(quote.listPrice)}
              </span>
              <span className="text-xs text-accent">
                {discountLabel(quote)}
              </span>
            </div>
          )}
        </div>

        {/* Zwei Zahlbuttons — beide leiten auf den gegateten Checkout weiter.
            Erst dort wird nach gespeicherter Vertragszustimmung die Zahlung
            (Stripe-Session bzw. Validopay-Order) gestartet. */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={goToCheckout}
            className="cta-shimmer inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mit Karte zahlen
          </button>
          <button
            type="button"
            onClick={goToCheckout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mit Krypto zahlen (Validopay)
          </button>
        </div>

        <p className="mt-3 text-xs text-faint">
          Weiter zum Checkout — die Zahlung wird erst nach Zustimmung zum
          Kundenvertrag gestartet.
        </p>
      </section>
    </>
  );
}
