"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, LanguageToggle } from "@/components/Header";
import AgreementGate from "@/components/AgreementGate";
import { useLanguage } from "@/lib/i18n";
import { getPlan } from "@/lib/plans";
import { createClient } from "@/lib/supabase/client";
import { getQuote, payWithCrypto } from "@/lib/validopay-checkout";

// USD display helper: keep whole prices clean ("$399") and show cents when
// present ("$259.35"). Used for the live coupon quote.
const fmtUsd = (n: number) =>
  `$${Number.isInteger(n) ? String(n) : Number(n).toFixed(2)}`;

// Percentage saved, preferring the coupon's own `value`; falls back to deriving
// it from the discount amount vs. the list price. Returns null when no reliable
// percent is available — the discount amount is then shown on its own.
const couponPercent = (q: { coupon: { value?: number } | null; discount: number; listPrice: number }) => {
  const value = q.coupon?.value;
  if (typeof value === "number" && value > 0) return Math.round(value);
  if (q.listPrice > 0 && q.discount > 0) {
    return Math.round((q.discount / q.listPrice) * 100);
  }
  return null;
};

type Quote = {
  listPrice: number;
  finalPrice: number;
  discount: number; // discount amount in USD
  coupon: { value?: number } | null; // coupon.value is the percent off
};

type QuoteStatus = "idle" | "checking" | "valid" | "invalid" | "error";

const checkboxClass =
  "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 bg-white/[0.03] text-accent accent-accent focus:ring-2 focus:ring-accent/40";

const legalLinkClass = "text-accent underline-offset-2 hover:underline";

function CheckoutInner() {
  const { t, lang } = useLanguage();
  const c = t.checkout;
  // Legal links follow the active language (German "/<slug>", English "/en/<slug>").
  const legalHref = (slug: string) => (lang === "en" ? `/en/${slug}` : `/${slug}`);

  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const plan = planId ? getPlan(planId) : undefined;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedImmediate, setAcceptedImmediate] = useState(false);
  const [acceptedRisk, setAcceptedRisk] = useState(false);
  const [acceptedGeo, setAcceptedGeo] = useState(false);
  // Clickwrap-Zustimmung zum Kundenvertrag (separates Audit-Log, NICHT in
  // user_metadata). Wird erst nach erfolgreichem onAccepted() der AgreementGate
  // true und ist Pflicht, bevor ein Kauf ausgeloest werden darf.
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [loading, setLoading] = useState<"stripe" | "validopay" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Discount code. Forwarded once from the previous step (dashboard / plan
  // selection) via the `coupon` query param, so it does not have to be typed
  // again here. The price preview is computed server-side by Validopay
  // (getQuote); for Stripe the same code is applied server-side when the
  // checkout session is created.
  const [couponCode, setCouponCode] = useState(
    () => searchParams.get("coupon")?.trim() ?? ""
  );
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteStatus, setQuoteStatus] = useState<QuoteStatus>("idle");

  // Live price preview: whenever the entered code changes, ask Validopay for a
  // fresh quote (debounced). A coupon counts as valid when it actually lowers
  // the price; otherwise the entered code is reported as invalid.
  useEffect(() => {
    const code = couponCode.trim();
    if (!plan || !code) {
      setQuote(null);
      setQuoteStatus("idle");
      return;
    }

    let cancelled = false;
    setQuoteStatus("checking");
    const handle = setTimeout(async () => {
      try {
        const q = (await getQuote(plan.id, code)) as Quote;
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
  }, [couponCode, plan]);

  const allAccepted = acceptedTerms && acceptedImmediate && acceptedRisk && acceptedGeo;
  // Kauf erst moeglich, wenn zusaetzlich der Kundenvertrag per Clickwrap
  // zugestimmt wurde (onAccepted der AgreementGate gefeuert). Ohne Zustimmung
  // kein Kauf.
  const canPay = allAccepted && agreementAccepted;

  // Builds the "discount applied" line. Always shows the saved USD amount and,
  // when the percent is known, the percentage too — the amount is never
  // rendered as a percent.
  const discountLabel = (q: Quote) => {
    const amt = fmtUsd(q.discount);
    const pct = couponPercent(q);
    return pct != null
      ? c.coupon.applied.replace("{pct}", String(pct)).replace("{amt}", amt)
      : c.coupon.appliedAmount.replace("{amt}", amt);
  };

  if (!plan) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
          {c.noPlan.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{c.noPlan.desc}</p>
        <Link
          href="/#accounts"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright"
        >
          {c.noPlan.cta}
        </Link>
      </div>
    );
  }

  async function pay(provider: "stripe") {
    if (!plan || !canPay) return;
    setLoading(provider);
    setError(null);

    const endpoint = "/api/create-checkout-session";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          // Der eingegebene Rabattcode wird serverseitig auf die Stripe-Session
          // angewendet, sodass der Kunde bei Stripe bereits den reduzierten
          // Preis sieht und nichts erneut eingeben muss.
          couponCode: couponCode.trim() || undefined,
          // Alle Pflicht-Zustimmungen werden serverseitig erneut geprüft und
          // mit Zeitstempel + Textversion als Compliance-Nachweis gespeichert.
          consent: {
            acceptedTerms,
            acceptedImmediateProvision: acceptedImmediate,
            acceptedRisk,
            acceptedGeo,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? c.couldNotStart);
        setLoading(null);
        return;
      }

      window.location.href = data.url as string;
    } catch {
      setError(c.genericError);
      setLoading(null);
    }
  }

  // Krypto-Zahlung über Validopay. Anders als Stripe/Confirmo wird hier kein
  // eigener API-Endpoint angesprochen: der Helfer legt die Bestellung direkt
  // bei Validopay an und leitet auf die Bezahlseite (QR + Adresse) weiter.
  // Der zu zahlende Betrag wird serverseitig aus Plan + Rabattcode berechnet —
  // das Frontend übergibt nur den eingegebenen Code, keinen Betrag.
  async function payValidopay() {
    if (!plan || !canPay) return;
    setLoading("validopay");
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // payWithCrypto würde ohnehin abbrechen; hier sofort verständlich melden.
        throw new Error(
          lang === "en"
            ? "Please sign in first to pay with crypto."
            : "Bitte zuerst anmelden, um mit Krypto zu bezahlen."
        );
      }

      await payWithCrypto({
        supabaseUserId: user.id,
        plan: plan.id,
        couponCode: couponCode.trim() || undefined,
      });
      // Bei Erfolg leitet payWithCrypto selbst per window.location weiter.
    } catch (err) {
      setError(err instanceof Error ? err.message : c.genericError);
      setLoading(null);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ─── Linke Spalte (Desktop): Titel + Bestellübersicht ─── */}
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
            {c.title}
          </h1>
          <p className="mt-2 text-sm text-muted">{c.subtitle}</p>

          {/* Konto-Zusammenfassung. Standardmäßig wird der Listenpreis gezeigt;
              ein Rabatt erscheint erst, wenn ein gültiger Code per getQuote
              bestätigt wurde. */}
          <div className="mt-6 rounded-2xl border border-accent/20 bg-accent/[0.06] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{plan.name}</span>
              <span className="font-mono text-sm font-semibold text-accent">
                {plan.simulatedCapital}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-xs uppercase tracking-wide text-faint">
                {c.oneTimeFee}
              </span>
              {quoteStatus === "valid" && quote ? (
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-white">
                    {fmtUsd(quote.finalPrice)}
                  </span>
                  <span className="text-sm text-faint line-through">
                    {fmtUsd(quote.listPrice)}
                  </span>
                </span>
              ) : (
                <span className="font-display text-xl font-semibold text-white">
                  {plan.price}
                </span>
              )}
            </div>
            {quoteStatus === "valid" && quote && (
              <p className="mt-2 text-right text-[11px] text-accent">
                {discountLabel(quote)}
              </p>
            )}
          </div>
        </div>

        {/* ─── Rechte Spalte (Desktop): Zustimmungen + Code + Zahlbuttons ─── */}
        <div>
          {/* Pflicht-Zustimmungen / mandatory consents */}
          <div className="space-y-4">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span className="text-sm leading-relaxed text-muted">
                {c.consentTerms.pre}
                {c.consentTerms.links.map((link, i) => {
                  const isLast = i === c.consentTerms.links.length - 1;
                  const isSecondLast = i === c.consentTerms.links.length - 2;
                  return (
                    <span key={link.slug}>
                      <Link
                        href={legalHref(link.slug)}
                        target="_blank"
                        className={legalLinkClass}
                      >
                        {link.label}
                      </Link>
                      {isLast ? null : isSecondLast ? c.consentTerms.conjunction : ", "}
                    </span>
                  );
                })}
                {c.consentTerms.post}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={acceptedImmediate}
                onChange={(e) => setAcceptedImmediate(e.target.checked)}
              />
              <span className="text-sm leading-relaxed text-muted">
                {c.consentImmediate.pre}
                <Link href={legalHref("widerruf")} target="_blank" className={legalLinkClass}>
                  {c.consentImmediate.withdrawal}
                </Link>
                {c.consentImmediate.post}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={acceptedRisk}
                onChange={(e) => setAcceptedRisk(e.target.checked)}
              />
              <span className="text-sm leading-relaxed text-muted">
                {c.consentRisk}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={acceptedGeo}
                onChange={(e) => setAcceptedGeo(e.target.checked)}
              />
              <span className="text-sm leading-relaxed text-muted">
                {c.consentGeo.pre}
                <Link
                  href={`${legalHref("agb")}#${
                    lang === "en"
                      ? "geographic-restrictions"
                      : "geografische-beschraenkungen"
                  }`}
                  target="_blank"
                  className={legalLinkClass}
                >
                  {c.consentGeo.section}
                </Link>
                {c.consentGeo.post}
              </span>
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-5 text-xs text-rose-400">
              {error}
            </p>
          )}

          {/* Rabattcode — wird genau einmal eingegeben und für beide Zahlwege
              verwendet: serverseitig bei Stripe angewendet und an Validopay
              übergeben. Die Preisvorschau wird live serverseitig berechnet;
              im Frontend wird nichts hartkodiert. Ohne gültigen Code bleibt der
              Listenpreis stehen. */}
          <div className="mt-6">
            <label
              htmlFor="couponCode"
              className="block text-xs uppercase tracking-wide text-faint"
            >
              {c.coupon.label}
            </label>
            <input
              id="couponCode"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder={c.coupon.placeholder}
              autoComplete="off"
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-faint focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
            />

            {quoteStatus === "checking" && (
              <p className="mt-2 text-xs text-faint">{c.coupon.checking}</p>
            )}
            {quoteStatus === "error" && (
              <p className="mt-2 text-xs text-rose-400">{c.coupon.error}</p>
            )}
            {quoteStatus === "invalid" && (
              <p className="mt-2 text-xs text-rose-400">{c.coupon.invalid}</p>
            )}
            {quoteStatus === "valid" && quote && (
              <p className="mt-2 text-xs text-accent">
                {discountLabel(quote)}
              </p>
            )}
          </div>

          {/* Kundenvertrag (Clickwrap) — verpflichtender Onboarding-Schritt
              VOR dem Kauf. Erst wenn der Kunde hier zustimmt (onAccepted),
              werden die Bezahl-Buttons freigeschaltet. Die Zustimmung wird
              serverseitig in das separate Audit-Log geschrieben (nicht in
              user_metadata). */}
          <div className="mt-6">
            {agreementAccepted ? (
              <p className="rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-sm text-accent">
                {lang === "en"
                  ? "Customer Agreement accepted."
                  : "Kundenvertrag zugestimmt."}
              </p>
            ) : (
              <AgreementGate
                lang={lang}
                onAccepted={() => setAgreementAccepted(true)}
              />
            )}
          </div>

          {/* Bezahl-Buttons — deaktiviert, bis alle Checkboxen aktiv sind und
              der Kundenvertrag zugestimmt wurde. Genau zwei Zahlwege: Stripe
              (Karte) und Validopay (Krypto). */}
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => pay("stripe")}
              disabled={!canPay || loading !== null}
              aria-busy={loading === "stripe"}
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {loading === "stripe" ? c.payStripeLoading : c.payStripe}
            </button>
            <button
              type="button"
              onClick={() => payValidopay()}
              disabled={!canPay || loading !== null}
              aria-busy={loading === "validopay"}
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading === "validopay" ? c.payValidopayLoading : c.payValidopay}
            </button>
          </div>

          {!canPay && (
            <p className="mt-3 text-center text-xs text-faint">{c.acceptHint}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckoutFootnote() {
  const { t } = useLanguage();
  return (
    <p className="mt-6 text-center text-xs text-faint">{t.checkout.footnote}</p>
  );
}

export default function CheckoutPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-md lg:max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <LanguageToggle />
        </div>
        <Suspense fallback={null}>
          <CheckoutInner />
        </Suspense>
        <CheckoutFootnote />
      </div>
    </main>
  );
}
