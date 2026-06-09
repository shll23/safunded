import Stripe from "stripe";

/**
 * Server-side Stripe client.
 *
 * >>> INSERT YOUR KEY: set STRIPE_SECRET_KEY in your environment (.env.local).
 *     Never commit a real secret key. See .env.example.
 */
if (!process.env.STRIPE_SECRET_KEY) {
  // Surfaced at build/run time so a missing key fails loudly rather than silently.
  console.warn(
    "[SAFunded] STRIPE_SECRET_KEY is not set. Checkout will not work until it is configured."
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
  typescript: true,
});
