import { createClient as createAdminClient } from "@supabase/supabase-js";

/**
 * Supabase admin (service-role) client.
 *
 * Used from server-side webhook handlers (Stripe / Confirmo) where there is no
 * logged-in user session, so we cannot use the cookie-based SSR client. The
 * service-role key bypasses RLS and may NEVER be exposed to the browser — it is
 * read from the server-only SUPABASE_SERVICE_ROLE_KEY environment variable.
 *
 * Returns `null` (rather than throwing) if the configuration is missing so a
 * webhook can still acknowledge the event instead of crash-looping.
 */
export function createAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error(
      "[SAFunded] Supabase admin client is not configured (missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)."
    );
    return null;
  }

  return createAdminClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
