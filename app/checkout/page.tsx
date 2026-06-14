"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, LanguageToggle } from "@/components/Header";
import { useLanguage } from "@/lib/i18n";
import { getPlan } from "@/lib/plans";
import { createClient } from "@/lib/supabase/client";
import { payWithCrypto } from "@/lib/validopay-checkout";

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
  const [loading, setLoading] = useState<
    "stripe" | "confirmo" | "validopay" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const allAccepted = acceptedTerms && acceptedImmediate && acceptedRisk;

  if (!plan) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10">
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

  async function pay(provider: "stripe" | "confirmo") {
    if (!plan || !allAccepted) return;
    setLoading(provider);
    setError(null);

    const endpoint =
      provider === "stripe"
        ? "/api/create-checkout-session"
        : "/api/create-confirmo-invoice";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          // Alle Pflicht-Zustimmungen werden serverseitig erneut geprüft und
          // mit Zeitstempel + Textversion als Compliance-Nachweis gespeichert.
          consent: {
            acceptedTerms,
            acceptedImmediateProvision: acceptedImmediate,
            acceptedRisk,
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
  // Der zu zahlende Betrag ist exakt der rabattierte Launch-Preis (LAUNCH35),
  // identisch zur Anzeige im Checkout.
  async function payValidopay() {
    if (!plan || !allAccepted) return;
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
        planName: plan.name,
        usdAmount: plan.launchPriceValue,
      });
      // Bei Erfolg leitet payWithCrypto selbst per window.location weiter.
    } catch (err) {
      setError(err instanceof Error ? err.message : c.genericError);
      setLoading(null);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
        {c.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{c.subtitle}</p>

      {/* Konto-Zusammenfassung */}
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
          <span className="flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold text-white">
              {plan.launchPrice}
            </span>
            <span className="text-sm text-faint line-through">{plan.price}</span>
          </span>
        </div>
        <p className="mt-2 text-right text-[11px] text-accent">
          {t.pricing.withCode}
        </p>
      </div>

      {/* Pflicht-Zustimmungen / mandatory consents */}
      <div className="mt-7 space-y-4">
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
      </div>

      {error && (
        <p role="alert" className="mt-5 text-xs text-rose-400">
          {error}
        </p>
      )}

      {/* Bezahl-Buttons — deaktiviert, bis alle Checkboxen aktiv sind */}
      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => pay("stripe")}
          disabled={!allAccepted || loading !== null}
          aria-busy={loading === "stripe"}
          className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading === "stripe" ? c.payStripeLoading : c.payStripe}
        </button>
        <button
          type="button"
          onClick={() => pay("confirmo")}
          disabled={!allAccepted || loading !== null}
          aria-busy={loading === "confirmo"}
          className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading === "confirmo" ? c.payConfirmoLoading : c.payConfirmo}
        </button>
        <button
          type="button"
          onClick={() => payValidopay()}
          disabled={!allAccepted || loading !== null}
          aria-busy={loading === "validopay"}
          className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading === "validopay" ? c.payValidopayLoading : c.payValidopay}
        </button>
      </div>

      {!allAccepted && (
        <p className="mt-3 text-center text-xs text-faint">{c.acceptHint}</p>
      )}
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
      <div className="w-full max-w-md">
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
