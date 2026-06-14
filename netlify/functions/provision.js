// SAFunded-seitiger Freischaltungs-Endpunkt fuer Validopay.  (v2 — Mehrkonten)
// ------------------------------------------------------------------
// Ablage: netlify/functions/provision.js  (erreichbar unter /api/provision).
//
// NEU in v2: Jede bestaetigte Zahlung legt ein NEUES Konto im accounts[]-Array
// des Users an (statt die alten flachen Felder zu ueberschreiben). Ein User
// kann so mehrere Konten parallel besitzen (FTMO-Modell).
//
// Idempotenz: ueber order_id. Existiert im accounts[]-Array bereits ein Konto
// mit dieser order_id, passiert nichts Zweites (kein Doppelkonto bei Retry).
//
// Sicherheit: HMAC-SHA256 ueber den ROHEN Body, zeitkonstanter Vergleich.

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const SECRET = process.env.VALIDOPAY_WEBHOOK_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const PLAN_SIZE = { '25k': '$25,000', '50k': '$50,000', '100k': '$100,000' };
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

function makeAccountId() {
  return 'acc_' + Date.now().toString(36) + '_' + crypto.randomBytes(4).toString('hex');
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

  const { data: userRes, error: getErr } = await supabase.auth.admin.getUserById(supabaseUserId);
  if (getErr || !userRes || !userRes.user) {
    return { statusCode: 404, body: 'User nicht gefunden' };
  }
  const meta = userRes.user.user_metadata || {};

  // accounts[] sicherstellen.
  const accounts = Array.isArray(meta.accounts) ? meta.accounts.slice() : [];

  // Idempotenz: existiert schon ein Konto mit dieser order_id?
  if (accounts.some((a) => a && a.order_id === orderId)) {
    return { statusCode: 200, body: JSON.stringify({ ok: true, idempotent: true }) };
  }

  const planKey = String(plan).toLowerCase();
  const nowIso = new Date().toISOString();

  const newAccount = {
    account_id: makeAccountId(),
    order_id: orderId,
    plan: planKey,
    account_plan_id: planKey,
    account_plan_name: PLAN_NAME[planKey] || planKey,
    account_size: PLAN_SIZE[planKey] || null,
    account_status: 'active',
    account_amount_paid: usdAmount != null ? `${Number(usdAmount).toFixed(2)} $` : null,
    payment_provider: 'validopay',
    last_confirmation_txid: txid || null,
    tracking_token: null,   // wird manuell nachgetragen
    mt5_login: null,        // wird manuell nachgetragen
    mt5_password: null,     // wird manuell nachgetragen
    mt5_server: null,       // wird manuell nachgetragen
    created_at: nowIso,
    account_activated_at: nowIso,
  };

  accounts.push(newAccount);

  const newMeta = {
    ...meta,
    accounts,
    // Komfortfelder fuer "zuletzt gekauft" (nicht-autoritativ, nur Info):
    last_confirmation_provider: 'validopay',
    last_confirmation_order_id: orderId,
    last_confirmation_txid: txid || null,
  };

  const { error: updErr } = await supabase.auth.admin.updateUserById(supabaseUserId, {
    user_metadata: newMeta,
  });
  if (updErr) {
    return { statusCode: 500, body: 'Update fehlgeschlagen: ' + updErr.message };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      provisioned: true,
      userId: supabaseUserId,
      accountId: newAccount.account_id,
      plan: planKey,
      totalAccounts: accounts.length,
    }),
  };
};
