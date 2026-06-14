import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPlan } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";
import { isConsentComplete, recordPurchaseConsent } from "@/lib/consent";

/**
 * POST /api/create-checkout-session
 * Body: { planId: "25k" | "50k" | "100k", consent: { acceptedTerms, acceptedImmediateProvision } }
 *
 * Flow:
 *  1. Require an authenticated customer.
 *  2. Validate planId.
 *  3. Require both mandatory consents (AGB/Risk/Refund + immediate provision).
 *  4. Record the consent (timestamp + terms version) on the Supabase account.
 *  5. Resolve the matching Stripe Price ID from environment variables.
 *  6. Create a Stripe Checkout Session, attaching the consent proof to the order.
 *  7. Return { url } for the client to redirect to.
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
    let body: { planId?: string; consent?: unknown; couponCode?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { planId } = body;
    const couponCode =
      typeof body.couponCode === "string" ? body.couponCode.trim() : "";

    // --- Validate plan ------------------------------------------------------
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

    // --- Require all mandatory consents -------------------------------------
    const consent = body.consent as
      | {
          acceptedTerms?: boolean;
          acceptedImmediateProvision?: boolean;
          acceptedRisk?: boolean;
        }
      | undefined;
    if (!isConsentComplete(consent)) {
      return NextResponse.json(
        {
          error:
            "Bitte bestätige die rechtlichen Dokumente, die sofortige Bereitstellung sowie die Risikohinweise, bevor du fortfährst.",
        },
        { status: 400 }
      );
    }

    // --- Record consent as a compliance proof (account + order) -------------
    const { consentAcceptedAt, termsVersion } = await recordPurchaseConsent(
      supabase,
      consent!
    );

    // --- Resolve Stripe Price ID --------------------------------------------
    // priceEnvKey maps to one of STRIPE_25K_PRICE_ID / STRIPE_50K_PRICE_ID / STRIPE_100K_PRICE_ID
    const priceId = process.env[plan.priceEnvKey];
    if (!priceId) {
      console.error(
        `[SAFunded] Missing Stripe Price ID env var: ${plan.priceEnvKey}`
      );
      return NextResponse.json(
        {
          error:
            "This account is not available for purchase right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("[SAFunded] STRIPE_SECRET_KEY is not configured.");
      return NextResponse.json(
        { error: "Checkout is not configured." },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    // --- Resolve the discount server-side -----------------------------------
    // The customer enters the discount code exactly once (dashboard or checkout
    // page) and it is forwarded here. We look the code up in Stripe and attach
    // the matching promotion code to the session, so the reduced price is
    // already applied when the customer lands on Stripe — no re-entry needed.
    // If the code can't be resolved (typo, crypto-only code, expired) we fall
    // back to letting the customer enter one on Stripe instead of failing.
    const discounts: { promotion_code: string }[] = [];
    if (couponCode) {
      try {
        const promo = await stripe.promotionCodes.list({
          code: couponCode,
          active: true,
          limit: 1,
        });
        const match = promo.data[0];
        if (match) {
          discounts.push({ promotion_code: match.id });
        } else {
          console.warn(
            `[SAFunded] No active Stripe promotion code matched the entered code.`
          );
        }
      } catch (err) {
        console.error("[SAFunded] Failed to resolve promotion code:", err);
      }
    }
    const discountApplied = discounts.length > 0;

    // --- Create Checkout Session -------------------------------------------
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      // Link the order back to the customer for compliance / fulfilment.
      client_reference_id: user.id,
      customer_email: user.email ?? undefined,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan.id}`,
      cancel_url: `${appUrl}/cancel?plan=${plan.id}`,
      // When a valid code was forwarded, the discount is already attached so the
      // customer sees the reduced price immediately and cannot (and need not)
      // enter a code again. Stripe rejects `discounts` together with
      // `allow_promotion_codes`, so the manual promo field is only offered when
      // no discount could be pre-applied.
      ...(discountApplied
        ? { discounts }
        : { allow_promotion_codes: true }),
      metadata: {
        planId: plan.id,
        planName: plan.name,
        simulatedCapital: plan.simulatedCapital,
        userId: user.id,
        // The code as entered, for traceability on the order.
        couponCode: couponCode || "",
        // Consent compliance proof stored on the order.
        consent_accepted_at: consentAcceptedAt,
        terms_version: termsVersion,
        consent_accepted_terms: "true",
        consent_accepted_immediate_provision: "true",
        consent_accepted_risk: "true",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Could not create a checkout session." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[SAFunded] create-checkout-session error:", err);
    return NextResponse.json(
      { error: "Something went wrong while starting checkout." },
      { status: 500 }
    );
  }
}
