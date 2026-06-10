"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, LanguageToggle } from "@/components/Header";
import { getPlan } from "@/lib/plans";

const checkboxClass =
  "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 bg-white/[0.03] text-accent accent-accent focus:ring-2 focus:ring-accent/40";

const legalLinkClass = "text-accent underline-offset-2 hover:underline";

function CheckoutInner() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const plan = planId ? getPlan(planId) : undefined;

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedImmediate, setAcceptedImmediate] = useState(false);
  const [loading, setLoading] = useState<"stripe" | "confirmo" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bothAccepted = acceptedTerms && acceptedImmediate;

  if (!plan) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-10">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
          Kein Konto ausgewählt
        </h1>
        <p className="mt-3 text-sm text-muted">
          Bitte wähle zuerst eine Kontogröße aus, um mit dem Checkout
          fortzufahren.
        </p>
        <Link
          href="/#accounts"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright"
        >
          Konten ansehen
        </Link>
      </div>
    );
  }

  async function pay(provider: "stripe" | "confirmo") {
    if (!plan || !bothAccepted) return;
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
          // Beide Pflicht-Zustimmungen werden serverseitig erneut geprüft und
          // mit Zeitstempel + Textversion als Compliance-Nachweis gespeichert.
          consent: {
            acceptedTerms,
            acceptedImmediateProvision: acceptedImmediate,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Checkout konnte nicht gestartet werden.");
        setLoading(null);
        return;
      }

      window.location.href = data.url as string;
    } catch {
      setError("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
      setLoading(null);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
        Checkout
      </h1>
      <p className="mt-2 text-sm text-muted">
        Schließe deinen Kauf ab. Es handelt sich um eine digitale Dienstleistung
        mit simuliertem Trading.
      </p>

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
            Einmalige Gebühr
          </span>
          <span className="font-display text-xl font-semibold text-white">
            {plan.price}
          </span>
        </div>
      </div>

      {/* Pflicht-Zustimmungen */}
      <div className="mt-7 space-y-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <input
            type="checkbox"
            className={checkboxClass}
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span className="text-sm leading-relaxed text-muted">
            Ich habe die{" "}
            <Link href="/agb" target="_blank" className={legalLinkClass}>
              AGB
            </Link>
            , die{" "}
            <Link
              href="/risikohinweise"
              target="_blank"
              className={legalLinkClass}
            >
              Risikohinweise
            </Link>{" "}
            und die{" "}
            <Link
              href="/refund-policy"
              target="_blank"
              className={legalLinkClass}
            >
              Refund Policy
            </Link>{" "}
            gelesen und akzeptiere sie.
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
            Ich verlange ausdrücklich, dass SAFunded mit der Bereitstellung der
            digitalen Leistung sofort beginnt. Mir ist bekannt, dass mein{" "}
            <Link href="/widerruf" target="_blank" className={legalLinkClass}>
              Widerrufsrecht
            </Link>{" "}
            mit vollständiger Vertragserfüllung erlischt.
          </span>
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-5 text-xs text-rose-400">
          {error}
        </p>
      )}

      {/* Bezahl-Buttons — deaktiviert, bis beide Checkboxen aktiv sind */}
      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => pay("stripe")}
          disabled={!bothAccepted || loading !== null}
          aria-busy={loading === "stripe"}
          className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading === "stripe"
            ? "Weiterleitung zu Stripe …"
            : "Mit Karte bezahlen (Stripe)"}
        </button>
        <button
          type="button"
          onClick={() => pay("confirmo")}
          disabled={!bothAccepted || loading !== null}
          aria-busy={loading === "confirmo"}
          className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading === "confirmo"
            ? "Weiterleitung zu Confirmo …"
            : "Mit Krypto bezahlen (Confirmo)"}
        </button>
      </div>

      {!bothAccepted && (
        <p className="mt-3 text-center text-xs text-faint">
          Bitte bestätige beide Punkte, um die Zahlung freizuschalten.
        </p>
      )}
    </div>
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
        <p className="mt-6 text-center text-xs text-faint">
          Zahlungen werden über Stripe (Karte) und Confirmo (Krypto)
          abgewickelt. Trading ist mit Risiken verbunden.
        </p>
      </div>
    </main>
  );
}
