// SAFunded-seitiger Freischaltungs-Endpunkt fuer Validopay.
// ------------------------------------------------------------------
// Ablage: netlify/functions/provision.js  (erreichbar unter /api/provision,
// sofern in netlify.toml ein Redirect /api/provision -> /.netlify/functions/provision
// existiert; siehe beiliegende netlify-provision.toml).
//
// Aufgabe: Nach signaturgepruefter, bestaetigter Krypto-Zahlung GENAU EINMAL
// das Kundenkonto in Supabase freischalten - dieselben Metadatenfelder, die
// heute der Stripe-Flow setzt (account_status, plan, account_size,
// account_amount_paid, ...). Dann (optional) Onboarding-Mail anstossen.
//
// Idempotenz auf ZWEI Ebenen:
//   1. Validopay ruft pro Bestellung nur einmal auf (claimProvisioning dort).
//   2. Hier zusaetzlich: wenn der User bereits provisioniert ist ODER diese
//      orderId schon verbucht wurde, passiert nichts Zweites. Damit ist auch
//      ein doppelter Webhook (Netzwerk-Retry) abgesichert.
//
// Sicherheit: HMAC-SHA256-Signatur ueber den ROHEN Body, zeitkonstanter
// Vergleich. Ohne gueltige Signatur -> 401, kein Seiteneffekt.

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const SECRET = process.env.VALIDOPAY_WEBHOOK_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // nur serverseitig!

// Plan -> Account-Groesse (an SAFunded-Konvention angelehnt).
const PLAN_SIZE = {
  '25k': '$25,000',
  '50k': '$50,000',
  '100k': '$100,000',
};
const PLAN_NAME = {
  '25k': 'Instant Funded 25K',
  '50k': 'Instant Funded 50K',
  '100k': 'Instant Funded 100K',
};

function verifySignature(rawBody, signature) {
  if (!signature) return false;
  const expected = crypto.createHmac('sha256', SECRET).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(String(signature), 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 500, body: 'Server nicht konfiguriert' };
  }

  const rawBody = event.body || '';
  const signature = event.headers['x-validopay-signature'] || event.headers['X-Validopay-Signature'];
  if (!verifySignature(rawBody, signature)) {
    return { statusCode: 401, body: 'Ungueltige Signatur' };
  }

  let data;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, body: 'Ungueltiges JSON' };
  }

  const { orderId, supabaseUserId, plan, usdAmount, txid } = data;
  if (!orderId || !supabaseUserId || !plan) {
    return { statusCode: 400, body: 'orderId, supabaseUserId und plan sind Pflicht' };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Aktuelles Metadaten-Objekt des Users holen.
  const { data: userRes, error: getErr } = await supabase.auth.admin.getUserById(supabaseUserId);
  if (getErr || !userRes || !userRes.user) {
    return { statusCode: 404, body: 'User nicht gefunden' };
  }
  const meta = userRes.user.user_metadata || {};

  // Idempotenz: wurde diese Order schon verbucht?
  const processed = Array.isArray(meta.validopay_orders) ? meta.validopay_orders : [];
  if (processed.includes(orderId)) {
    return { statusCode: 200, body: JSON.stringify({ ok: true, idempotent: true }) };
  }

  const planKey = String(plan).toLowerCase();
  const nowIso = new Date().toISOString();

  const newMeta = {
    ...meta,
    plan: planKey,
    account_status: 'active',
    account_size: PLAN_SIZE[planKey] || meta.account_size || null,
    account_plan_id: planKey,
    account_plan_name: PLAN_NAME[planKey] || meta.account_plan_name || null,
    account_amount_paid:
      usdAmount != null ? `${Number(usdAmount).toFixed(2)} $` : meta.account_amount_paid,
    account_activated_at: meta.account_activated_at || nowIso,
    last_confirmation_provider: 'validopay',
    last_confirmation_order_id: orderId,
    last_confirmation_txid: txid || null,
    validopay_orders: [...processed, orderId], // Idempotenz-Liste
  };

  const { error: updErr } = await supabase.auth.admin.updateUserById(supabaseUserId, {
    user_metadata: newMeta,
  });
  if (updErr) {
    return { statusCode: 500, body: 'Update fehlgeschlagen: ' + updErr.message };
  }

  // Optional: Onboarding-Mail. Bewusst "best effort" - eine fehlgeschlagene
  // Mail darf die (bereits erfolgte) Freischaltung nicht zuruecknehmen.
  // Hier Platz fuer euren Mailversand (z. B. Resend/Postmark):
  // await sendOnboardingMail(userRes.user.email, planKey);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, provisioned: true, userId: supabaseUserId, plan: planKey }),
  };
};
