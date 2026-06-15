// lib/agreementGate.js
// Backstop fuer die Provisionierung: stellt sicher, dass NIE ein Konto aktiviert
// wird, ohne dass der Kunde dem aktuellen Vertrag zugestimmt hat.
//
// Primaeres Gate ist der Onboarding-Schritt (ohne Zustimmung kein Kauf-Button).
// Dies hier ist die zweite Sicherung in provision.js, falls je etwas durchrutscht.

const { createClient } = require("@supabase/supabase-js");
const { CURRENT_AGREEMENT } = require("./agreement"); // ggf. .ts -> in JS spiegeln

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// true, wenn der User der aktuellen Vertragsversion zugestimmt hat.
async function hasAcceptedCurrentAgreement(userId) {
  const { data, error } = await admin
    .from("agreement_acceptances")
    .select("id")
    .eq("user_id", userId)
    .eq("agreement_type", CURRENT_AGREEMENT.type)
    .eq("agreement_version", CURRENT_AGREEMENT.version)
    .limit(1);
  if (error) {
    console.error("acceptance check failed:", error);
    return false; // im Zweifel NICHT aktivieren
  }
  return Array.isArray(data) && data.length > 0;
}

module.exports = { hasAcceptedCurrentAgreement };
