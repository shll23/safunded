// validopay-checkout.js
// -------------------------------------------------------------------
// Helfer fuer den "Mit Krypto zahlen (Validopay)"-Weg im SAFunded-Checkout.
// Legt eine Validopay-Bestellung an und leitet den Kunden zur Bezahlseite.
//
// Einbindung: Diese Funktion aufrufen, wenn der Kunde im Checkout
// "Mit Krypto zahlen" waehlt (statt des Stripe-Flows).
//
// Voraussetzungen:
//   - Der Kunde ist eingeloggt (Supabase-Session vorhanden).
//   - Plan-Auswahl + USD-Preis (inkl. Rabattlogik) stehen fest.

const VALIDOPAY_API = "https://api.validopay.com";

/**
 * Legt eine Krypto-Bestellung an und leitet zur Validopay-Bezahlseite weiter.
 *
 * @param {object} args
 * @param {string} args.supabaseUserId  - user.id des eingeloggten Kunden
 * @param {string} args.plan            - "25k" | "50k" | "100k"
 * @param {string} args.planName        - Anzeigename, z.B. "Instant Funded 50K"
 * @param {number} args.usdAmount       - tatsaechlich zu zahlender USD-Betrag
 *                                         (NACH Rabatt, z.B. 161.85 mit LAUNCH35)
 */
export async function payWithCrypto({ supabaseUserId, plan, planName, usdAmount }) {
  if (!supabaseUserId) throw new Error("Nicht eingeloggt – bitte zuerst anmelden.");
  if (!plan || !usdAmount) throw new Error("Plan oder Betrag fehlt.");

  const res = await fetch(`${VALIDOPAY_API}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usdAmount,
      label: `SAFunded ${planName || plan}`,
      meta: {
        supabaseUserId,
        plan,
        planName: planName || `SAFunded ${plan}`,
        usdAmount,
      },
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Bestellung konnte nicht angelegt werden (${res.status}). ${txt}`);
  }

  const order = await res.json();
  // Weiterleitung zur Validopay-Bezahlseite (QR, Adresse, Live-Status).
  window.location.href = `${VALIDOPAY_API}/pay.html?id=${order.id}`;
}
