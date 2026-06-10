/**
 * ============================================================================
 *  SAFunded — SITE URL HELPER
 * ============================================================================
 *  Single source of truth for the public base URL of the app.
 *
 *  IMPORTANT: Always use this to build absolute URLs for auth redirects
 *  (emailRedirectTo, password reset, OAuth, …) and outbound links. Do NOT
 *  rely on `window.location.origin`, the incoming request host, or the
 *  Netlify-provided `URL` / `DEPLOY_PRIME_URL` variables — otherwise users
 *  who sign up on https://safunded.com receive links pointing at the raw
 *  Netlify subdomain (e.g. main--safunded.netlify.app).
 *
 *  `NEXT_PUBLIC_APP_URL` is prefixed with NEXT_PUBLIC_, so it is inlined into
 *  the client bundle and is safe to read in both client and server code.
 * ============================================================================
 */

/** The public base URL of the app, without a trailing slash. */
export function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://safunded.com"
  );
}
