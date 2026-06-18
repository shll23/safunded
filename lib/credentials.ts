/**
 * Server-side fetch of a customer's MT5 login credentials.
 *
 * Mirrors the live-tracking mechanism: the same opaque customer token that the
 * dashboard already uses for live stats is exchanged at the same upstream
 * (safcheck.de) for the account's MT5 credentials. Unlike the live-tracking
 * widget — which fetches client-side through the `/api/tracking/*` rewrite — the
 * credentials contain the master password, so this call is made server-side from
 * the dashboard's React Server Component. The token therefore never lands in the
 * browser for this request and the upstream domain stays out of the client.
 */

const CREDENTIALS_BASE = "https://safcheck.de/api/public/accounts";

export interface Mt5Credentials {
  /** Whether MT5 credentials are available for this account yet. */
  hasCredentials: boolean;
  /** MT5 login number as a string, or null when not yet available. */
  login: string | null;
  /** MT5 master password, or "" when not yet available. */
  password: string;
  /** MT5 server name, or null when not yet available. */
  server: string | null;
}

/**
 * Fetches the MT5 credentials for one account by its tracking token.
 *
 * Returns `null` on any network/HTTP error so the dashboard simply falls back to
 * the "Zugangsdaten folgen" state instead of failing the whole page.
 */
export async function fetchCredentials(
  token: string
): Promise<Mt5Credentials | null> {
  try {
    const res = await fetch(
      `${CREDENTIALS_BASE}/${encodeURIComponent(token)}/credentials`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      login?: unknown;
      server?: unknown;
      master_password?: unknown;
      has_credentials?: unknown;
    };

    const hasCredentials = json.has_credentials === true;
    if (!hasCredentials) {
      return { hasCredentials: false, login: null, password: "", server: null };
    }

    return {
      hasCredentials: true,
      login: json.login != null ? String(json.login) : null,
      server: typeof json.server === "string" ? json.server : null,
      password:
        typeof json.master_password === "string" ? json.master_password : "",
    };
  } catch {
    return null;
  }
}
