import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPlan } from "@/lib/plans";

/**
 * POST /api/create-checkout-session
 * Body: { planId: "25k" | "50k" | "100k" }
 *
 * Flow:
 *  1. Validate planId.
 *  2. Resolve the matching Stripe Price ID from environment variables.
 *  3. Create a Stripe Checkout Session.
 *  4. Return { url } for the client to redirect to.
 */
export async function POST(req: Request) {
  try {
    // --- Parse body ---------------------------------------------------------
    let body: { planId?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { planId } = body;

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

    // --- Create Checkout Session -------------------------------------------
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan.id}`,
      cancel_url: `${appUrl}/cancel?plan=${plan.id}`,
      metadata: {
        planId: plan.id,
        planName: plan.name,
        simulatedCapital: plan.simulatedCapital,
      },
      // EDIT-ME: enable if you want to collect billing address / tax, etc.
      // billing_address_collection: "required",
      // automatic_tax: { enabled: true },
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
