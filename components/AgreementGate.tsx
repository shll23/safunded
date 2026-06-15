// components/AgreementGate.tsx
// Clickwrap-Schritt im Signup/Onboarding: zeigt den Vertrag, verlangt die
// Zustimmung und schaltet erst dann "Weiter zum Kauf" frei. Nach Erfolg wird
// onAccepted() aufgerufen (Eltern-Komponente geht dann zum Checkout).
//
// Styling bewusst neutral/minimal gehalten (Tailwind-Klassen) -> an euer
// Design anpassen. Token-Holen: nutzt den Supabase-Client aus eurem Frontend.

"use client";

import { useState } from "react";
import { CURRENT_AGREEMENT } from "@/lib/agreement";
import { createClient } from "@/lib/supabase/client"; // euer bestehender Browser-Client

export default function AgreementGate({
  onAccepted,
  lang = "de",
}: {
  onAccepted: () => void;
  lang?: "de" | "en";
}) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const label = lang === "en" ? CURRENT_AGREEMENT.labelEn : CURRENT_AGREEMENT.labelDe;
  const linkText = lang === "en" ? "Open agreement (PDF)" : "Vertrag öffnen (PDF)";
  const cta = lang === "en" ? "Agree & continue" : "Zustimmen & weiter";

  async function handleAccept() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setError(lang === "en" ? "Please sign in again." : "Bitte erneut anmelden.");
        return;
      }
      const res = await fetch("/api/agreement/accept", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError(lang === "en" ? "Could not record acceptance." : "Zustimmung konnte nicht gespeichert werden.");
        return;
      }
      onAccepted();
    } catch {
      setError(lang === "en" ? "Network error." : "Netzwerkfehler.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 p-5 space-y-4">
      <a
        href={CURRENT_AGREEMENT.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-600 underline"
      >
        {linkText}
      </a>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1"
        />
        <span className="text-sm text-gray-800">{label}</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        disabled={!checked || loading}
        onClick={handleAccept}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium disabled:opacity-40"
      >
        {loading ? "…" : cta}
      </button>
    </div>
  );
}
