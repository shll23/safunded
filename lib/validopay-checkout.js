// validopay-checkout.js  (v2 — mit Coupon-Unterstützung)
// -------------------------------------------------------------------
// Helfer für den "Mit Krypto zahlen (Validopay)"-Weg im SAFunded-Checkout.
//
// NEU in v2: Der Preis wird NICHT mehr vom Frontend übergeben, sondern
// serverseitig aus Plan + Coupon berechnet (manipulationssicher). Das
// Frontend schickt nur plan + couponCode.
//
// Zwei Funktionen:
//   getQuote(plan, couponCode)  -> { listPrice, finalPrice, discount, coupon }
//        für die Live-Preisanzeige im Checkout.
//   payWithCrypto({ supabaseUserId, plan, couponCode })
//        legt die Bestellung an und leitet zur Bezahlseite weiter.

const VALIDOPAY_API = "https://api.validopay.com";

export async function getQuote(plan, couponCode) {
  const res = await fetch(`${VALIDOPAY_API}/api/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan, couponCode: couponCode || null }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Preis konnte nicht ermittelt werden (${res.status}). ${txt}`);
  }
  return res.json();
}

export async function payWithCrypto({ supabaseUserId, plan, couponCode }) {
  if (!supabaseUserId) throw new Error("Nicht eingeloggt – bitte zuerst anmelden.");
  if (!plan) throw new Error("Kein Plan gewählt.");

  const res = await fetch(`${VALIDOPAY_API}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      plan,
      couponCode: couponCode || null,
      meta: { supabaseUserId },
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Bestellung konnte nicht angelegt werden (${res.status}). ${txt}`);
  }

  const order = await res.json();
  window.location.href = `${VALIDOPAY_API}/pay.html?id=${order.id}`;
}
