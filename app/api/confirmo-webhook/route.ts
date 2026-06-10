import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getPlan } from "@/lib/plans";
import { createAdmin } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { getAccountCompliance, recordConfirmationSent, markAccountActive } from "@/lib/compliance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Statuses that count as a settled, confirmed payment. */
const PAID_STATUSES = new Set(["paid", "confirmed"]);

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}

/**
 * Verifies the Confirmo callback signature when a callback password is
 * configured. Confirmo signs the raw request body with HMAC-SHA256 and sends
 * the hex digest in the `bp-signature` header. If CONFIRMO_CALLBACK_PASSWORD is
 * not set we cannot verify and proceed (a warning is logged).
 */
function verifySignature(rawBody: string, header: string | null): boolean {
  const password = process.env.CONFIRMO_CALLBACK_PASSWORD;
  if (!password) {
    console.warn(
      "[SAFunded] CONFIRMO_CALLBACK_PASSWORD not set — skipping Confirmo signature verification."
    );
    return true;
  }
  if (!header) return false;

  const expected = crypto
    .createHmac("sha256", password)
    .update(rawBody)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * POST /api/confirmo-webhook
 *
 * Confirmo (crypto) callback endpoint. On a confirmed/paid invoice it sends the
 * customer the order-confirmation e-mail (durable medium per § 312f BGB) and
 * records the compliance proof on the Supabase account.
 *
 * The invoice `reference` is set to `safunded:<userId>:<planId>` when the
 * invoice is created, which lets us resolve the account and product here.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();

  if (!verifySignature(rawBody, req.headers.get("bp-signature"))) {
    console.error("[SAFunded] Confirmo signature verification failed.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let payload: {
    status?: string;
    reference?: string;
    id?: string;
    invoiceId?: string;
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const status = (payload.status ?? "").toLowerCase();
  if (!PAID_STATUSES.has(status)) {
    // Not yet settled — acknowledge and wait for the paid/confirmed callback.
    return NextResponse.json({ received: true, status });
  }

  try {
    // reference = "safunded:<userId>:<planId>"
    const parts = (payload.reference ?? "").split(":");
    const userId = parts[0] === "safunded" ? parts[1] : "";
    const planId = parts[0] === "safunded" ? parts[2] : "";
    const orderId = payload.id ?? payload.invoiceId ?? payload.reference ?? "—";

    if (!userId) {
      console.error(
        `[SAFunded] Confirmo callback without a resolvable user (reference="${payload.reference}").`
      );
      return NextResponse.json({ received: true });
    }

    const admin = createAdmin();
    if (!admin) {
      // Without the admin client we cannot resolve the customer e-mail.
      return NextResponse.json(
        { error: "Server not configured." },
        { status: 500 }
      );
    }

    const account = await getAccountCompliance(admin, userId);
    if (!account?.email) {
      console.error(
        `[SAFunded] No e-mail on account ${userId}; cannot send Confirmo confirmation.`
      );
      return NextResponse.json({ received: true });
    }

    // Idempotency: skip if this order was already confirmed.
    if (account.lastConfirmationOrderId === orderId) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const plan = getPlan(planId);

    // Activate the account for the buyer so the dashboard reflects it. Keyed by
    // the buyer's Supabase Auth user id (= the id the dashboard queries).
    await markAccountActive(admin, userId, {
      planId: plan?.id ?? planId,
      planName: plan?.name ?? "SAFunded Account",
      accountSize: plan?.simulatedCapital,
      accountId: userId,
      activatedAt: new Date().toISOString(),
      amountPaid: plan?.price,
    });

    const sent = await sendOrderConfirmationEmail({
      to: account.email,
      productName: plan?.name ?? "SAFunded Account",
      accountSize: plan?.simulatedCapital,
      price: plan?.price ?? "—",
      orderDate: formatDate(new Date()),
      orderId,
      accountId: userId,
      consentAcceptedAt: account.consentAcceptedAt,
      termsVersion: account.termsVersion,
      provider: "confirmo",
    });

    if (sent) {
      await recordConfirmationSent(admin, userId, {
        orderId,
        provider: "confirmo",
        termsVersion: account.termsVersion,
        sentAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[SAFunded] confirmo-webhook handler error:", err);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }
}
