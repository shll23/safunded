import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getPlan } from "@/lib/plans";
import { createAdmin } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { getAccountCompliance, recordConfirmationSent, markAccountActive } from "@/lib/compliance";

// nodemailer + raw-body signature verification require the Node.js runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Formats an amount in the smallest currency unit (e.g. cents) for display. */
function formatAmount(amountTotal: number | null, currency: string | null) {
  if (amountTotal == null || !currency) return null;
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountTotal / 100);
  } catch {
    return `${(amountTotal / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

function formatDate(unixSeconds: number | null): string {
  const date = unixSeconds ? new Date(unixSeconds * 1000) : new Date();
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(date);
}

/**
 * POST /api/stripe-webhook
 *
 * Stripe webhook endpoint. On `checkout.session.completed` it sends the
 * customer the order-confirmation e-mail (durable medium per § 312f BGB) and
 * records the compliance proof (confirmation_email_sent_at + terms_version) on
 * the Supabase account.
 *
 * Configure the endpoint URL in the Stripe Dashboard and set the signing secret
 * as STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[SAFunded] STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Raw body is required for signature verification.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[SAFunded] Stripe signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge other events without acting on them.
    return NextResponse.json({ received: true });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};

    const userId = session.client_reference_id ?? metadata.userId ?? "";
    const email =
      session.customer_details?.email ?? session.customer_email ?? "";

    if (!email) {
      console.error(
        `[SAFunded] Stripe session ${session.id} has no customer e-mail; cannot send confirmation.`
      );
      return NextResponse.json({ received: true });
    }

    const plan = metadata.planId ? getPlan(metadata.planId) : undefined;
    const productName = metadata.planName ?? plan?.name ?? "SAFunded Account";
    const price =
      formatAmount(session.amount_total, session.currency) ??
      plan?.price ??
      "—";

    const admin = createAdmin();

    // Prefer the consent proof attached to the order; fall back to the account.
    let consentAcceptedAt = metadata.consent_accepted_at || undefined;
    let termsVersion = metadata.terms_version || undefined;

    if (admin && userId) {
      const account = await getAccountCompliance(admin, userId);
      // Idempotency: skip if this order was already confirmed.
      if (account?.lastConfirmationOrderId === session.id) {
        return NextResponse.json({ received: true, duplicate: true });
      }
      consentAcceptedAt = consentAcceptedAt ?? account?.consentAcceptedAt;
      termsVersion = termsVersion ?? account?.termsVersion;

      // Activate the account for the buyer so the dashboard reflects it. Keyed
      // by the buyer's Supabase Auth user id (= the id the dashboard queries).
      await markAccountActive(admin, userId, {
        planId: metadata.planId ?? plan?.id,
        planName: productName,
        accountSize: metadata.simulatedCapital ?? plan?.simulatedCapital,
        accountId: userId,
        activatedAt: new Date().toISOString(),
        // Persist the actually paid amount (amount_total, after any promotion
        // code) so the dashboard mirrors the e-mail rather than the list price.
        amountPaid: price,
      });
    }

    const sent = await sendOrderConfirmationEmail({
      to: email,
      customerName: session.customer_details?.name ?? undefined,
      productName,
      accountSize: metadata.simulatedCapital ?? plan?.simulatedCapital,
      price,
      orderDate: formatDate(session.created),
      orderId: session.id,
      accountId: userId || "—",
      consentAcceptedAt,
      termsVersion,
      provider: "stripe",
    });

    if (sent && admin && userId) {
      await recordConfirmationSent(admin, userId, {
        orderId: session.id,
        provider: "stripe",
        termsVersion,
        sentAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[SAFunded] stripe-webhook handler error:", err);
    // Returning 500 lets Stripe retry the delivery.
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }
}
