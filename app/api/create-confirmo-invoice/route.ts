import { NextResponse } from "next/server";
import { getPlan } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";
import { isConsentComplete, recordPurchaseConsent } from "@/lib/consent";

/**
 * POST /api/create-confirmo-invoice
 * Body: { planId: "25k" | "50k" | "100k", consent: { acceptedTerms, acceptedImmediateProvision } }
 *
 * Creates a Confirmo (crypto) payment invoice for the selected account and
 * returns { url } to redirect the customer to the hosted Confirmo checkout.
 *
 * Mirrors the Stripe flow: the customer must be authenticated and must have
 * given both mandatory consents, which are recorded (timestamp + terms version)
 * on the Supabase account and attached to the order as a compliance proof.
 *
 * Confirmo API v3 reference: POST https://confirmo.net/api/v3/invoices
 * (Bearer auth; response contains the hosted invoice `url`).
 */
export async function POST(req: Request) {
  try {
    // --- Require authentication --------------------------------------------
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    // --- Parse body ---------------------------------------------------------
    let body: { planId?: string; consent?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { planId } = body;
    if (!planId) {
      return NextResponse.json({ error: "Missing planId." }, { status: 400 });
    }

    const plan = getPlan(planId);
    if (!plan) {
      return NextResponse.json(
        { error: `Invalid plan: ${planId}` },
        { status: 400 }
      );
    }

    // --- Require both mandatory consents ------------------------------------
    const consent = body.consent as
      | { acceptedTerms?: boolean; acceptedImmediateProvision?: boolean }
      | undefined;
    if (!isConsentComplete(consent)) {
      return NextResponse.json(
        {
          error:
            "Bitte bestätige die AGB/Risikohinweise/Refund Policy sowie die sofortige Bereitstellung, bevor du fortfährst.",
        },
        { status: 400 }
      );
    }

    // --- Confirmo configuration --------------------------------------------
    const apiKey = process.env.CONFIRMO_API_KEY;
    if (!apiKey) {
      console.error("[SAFunded] CONFIRMO_API_KEY is not configured.");
      return NextResponse.json(
        {
          error:
            "Crypto checkout is not available right now. Please try again later or pay by card.",
        },
        { status: 500 }
      );
    }

    // --- Record consent as a compliance proof (account + order) -------------
    const { consentAcceptedAt, termsVersion } = await recordPurchaseConsent(
      supabase,
      consent!
    );

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const settlementCurrency = process.env.CONFIRMO_SETTLEMENT_CURRENCY ?? "BTC";
    // Display prices in lib/plans.ts are quoted in USD.
    const invoiceCurrency = process.env.CONFIRMO_INVOICE_CURRENCY ?? "USD";

    // --- Create Confirmo invoice -------------------------------------------
    const res = await fetch("https://confirmo.net/api/v3/invoices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoice: {
          amount: plan.priceValue,
          currencyFrom: invoiceCurrency,
        },
        settlement: { currency: settlementCurrency },
        product: {
          name: plan.name,
          description: `SAFunded ${plan.simulatedCapital} — ${plan.accountType}`,
        },
        reference: `safunded:${user.id}:${plan.id}`,
        returnUrl: `${appUrl}/success?plan=${plan.id}`,
        notifyUrl: `${appUrl}/api/confirmo-webhook`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[SAFunded] Confirmo invoice creation failed:", res.status, detail);
      return NextResponse.json(
        { error: "Could not start the crypto checkout. Please try again." },
        { status: 502 }
      );
    }

    const invoice = (await res.json()) as { url?: string; id?: string };
    if (!invoice.url) {
      return NextResponse.json(
        { error: "Could not create a crypto invoice." },
        { status: 502 }
      );
    }

    // The consent proof is also stored on the Supabase account above; we log the
    // order linkage here so the invoice id can be reconciled with the consent.
    console.info(
      `[SAFunded] Confirmo invoice ${invoice.id ?? "?"} for user ${user.id}, ` +
        `consent_accepted_at=${consentAcceptedAt}, terms_version=${termsVersion}`
    );

    return NextResponse.json({ url: invoice.url });
  } catch (err) {
    console.error("[SAFunded] create-confirmo-invoice error:", err);
    return NextResponse.json(
      { error: "Something went wrong while starting checkout." },
      { status: 500 }
    );
  }
}
