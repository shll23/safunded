"use client";

import { useEffect, useState } from "react";
import TrackingWidget from "@/components/TrackingWidget";
import { getQuote, payWithCrypto } from "@/lib/validopay-checkout";

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
  discount: number;
  coupon: unknown;
};

type QuoteStatus = "idle" | "checking" | "valid" | "invalid" | "error";

// USD display helper: whole prices stay clean ("$399"), cents shown when present.
const fmtUsd = (n: number) =>
  `$${Number.isInteger(n) ? String(n) : Number(n).toFixed(2)}`;

const SUPPORT_MAILTO = "mailto:support@safunded.com";

export default function DashboardClient({
  userId,
  accounts,
  plans,
}: {
  userId: string;
  accounts: DashboardAccount[];
  plans: PlanTile[];
}) {
  // Which account's live dashboard / credentials panel is currently expanded.
  const [openTrackingId, setOpenTrackingId] = useState<string | null>(null);
  const [openCredsId, setOpenCredsId] = useState<string | null>(null);

  // Buy-another-account section state.
  const [selectedPlan, setSelectedPlan] = useState<string>(
    plans.find((p) => p.id === "50k")?.id ?? plans[0]?.id ?? "50k"
  );
  const [couponCode, setCouponCode] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteStatus, setQuoteStatus] = useState<QuoteStatus>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // "Mit Karte zahlen" — reuse the existing Stripe checkout flow, which captures
  // the mandatory consents and starts the Stripe-hosted session (where a
  // promotion code can be redeemed).
  function payWithCard() {
    if (!selectedPlan) return;
    window.location.href = `/checkout?plan=${encodeURIComponent(selectedPlan)}`;
  }

  // "Mit Krypto zahlen" — create a Validopay order inline and redirect to the
  // pay page. The price is computed server-side from plan + code.
  async function payWithCryptoClick() {
    if (!selectedPlan || loading) return;
    setLoading(true);
    setError(null);
    try {
      await payWithCrypto({
        supabaseUserId: userId,
        plan: selectedPlan,
        couponCode: couponCode.trim() || undefined,
      });
      // On success payWithCrypto redirects via window.location itself.
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Etwas ist schiefgelaufen. Bitte versuche es erneut."
      );
      setLoading(false);
    }
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
              const credsOpen = openCredsId === acc.account_id;
              const hasCreds = Boolean(acc.mt5_login);

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
                      <p className="mt-0.5 break-all font-mono text-xs text-muted">
                        {acc.order_id}
                      </p>
                    </div>
                  </div>

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

                    {hasCreds ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenCredsId(credsOpen ? null : acc.account_id)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
                      >
                        {credsOpen ? "Zugangsdaten ausblenden" : "Zugangsdaten"}
                      </button>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-faint">
                        Zugangsdaten folgen
                      </span>
                    )}

                    <a
                      href={SUPPORT_MAILTO}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
                    >
                      Support
                    </a>
                  </div>

                  {/* Zugangsdaten (MT5) */}
                  {credsOpen && hasCreds ? (
                    <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-3">
                      <div className="bg-ink/40 p-4">
                        <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                          MT5 Login
                        </dt>
                        <dd className="mt-1 break-all font-mono text-sm text-white">
                          {acc.mt5_login}
                        </dd>
                      </div>
                      <div className="bg-ink/40 p-4">
                        <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                          Passwort
                        </dt>
                        <dd className="mt-1 break-all font-mono text-sm text-white">
                          {acc.mt5_password ?? "—"}
                        </dd>
                      </div>
                      <div className="bg-ink/40 p-4">
                        <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                          Server
                        </dt>
                        <dd className="mt-1 break-all font-mono text-sm text-white">
                          {acc.mt5_server ?? "—"}
                        </dd>
                      </div>
                    </dl>
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
                <span className="mt-1.5 flex items-center justify-center gap-2 text-sm">
                  <span className="text-faint line-through">{p.price}</span>
                  <span aria-hidden="true" className="text-faint">→</span>
                  <span className="font-semibold text-accent">{p.launchPrice}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Regel-Zeile */}
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-xs text-muted">
          <span className="font-semibold text-white">Regeln:</span> 5% Tagesverlust
          · 10% Gesamtverlust · 80% Split · min. 14 Tage · Auszahlung alle 2 Wochen
        </p>

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
            placeholder="Rabattcode (z. B. LAUNCH35)"
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
                –{quote.discount}% mit Krypto
              </span>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-xs text-rose-400">
            {error}
          </p>
        )}

        {/* Zwei Zahlbuttons */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={payWithCard}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mit Karte zahlen
          </button>
          <button
            type="button"
            onClick={payWithCryptoClick}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Wird vorbereitet …" : "Mit Krypto zahlen"}
          </button>
        </div>
      </section>
    </>
  );
}
