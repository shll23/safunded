import crypto from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Compliance + account helpers for the post-purchase flow.
 *
 * The consent given at checkout (consent_accepted_at + terms_version) is stored
 * on the customer's Supabase account in `user_metadata` (see lib/consent.ts).
 * After the confirmation e-mail is sent we additionally record
 * `confirmation_email_sent_at` and the referenced `terms_version` on the same
 * account, plus the order id/provider so repeated webhook deliveries do not send
 * duplicate e-mails.
 *
 * Accounts are stored as an `accounts[]` array on `user_metadata` so a customer
 * can own several funded accounts in parallel (FTMO model). Each purchase
 * appends one object; the old flat per-account fields are no longer written.
 */

export interface AccountCompliance {
  email?: string;
  consentAcceptedAt?: string;
  termsVersion?: string;
  lastConfirmationOrderId?: string;
}

/**
 * One funded account a customer owns. Stored as an element of the `accounts[]`
 * array in Supabase `user_metadata`. MT5 credentials and the tracking token are
 * filled in manually by an admin (via SQL) after provisioning, so they start as
 * `null`.
 */
export interface Account {
  /** Unique per purchase, e.g. "acc_<time>_<random>". */
  account_id: string;
  /** Provider order id — the idempotency key for this purchase. */
  order_id: string;
  /** Plan key, e.g. "50k". */
  plan: string;
  account_plan_id: string;
  /** Human-readable plan name, e.g. "Instant Funded 50K". */
  account_plan_name: string;
  /** Simulated account size, e.g. "$50,000". */
  account_size: string | null;
  account_status: string;
  /**
   * Formatted amount actually paid, e.g. "$259.35" / "259,35 €". For Stripe this
   * is the session's `amount_total` (after any promotion/discount code), not the
   * list price, so a discounted purchase is represented correctly.
   */
  account_amount_paid: string | null;
  payment_provider: string;
  /** Opaque token for the live-tracking widget; set manually once linked. */
  tracking_token: string | null;
  mt5_login: string | null;
  mt5_password: string | null;
  mt5_server: string | null;
  created_at: string;
  account_activated_at: string;
}

/** Generates a unique account id, e.g. "acc_lz3k1_a1b2c3d4". */
function makeAccountId(): string {
  return "acc_" + Date.now().toString(36) + "_" + crypto.randomBytes(4).toString("hex");
}

/** Reads the customer's accounts[] array from their Supabase user metadata. */
export function readAccounts(
  meta: Record<string, unknown> | null | undefined
): Account[] {
  const list = (meta ?? {}).accounts;
  return Array.isArray(list) ? (list.filter(Boolean) as Account[]) : [];
}

/**
 * Appends a new funded account to the customer's accounts[] array after a
 * fulfilled purchase, keyed by the buyer's Supabase Auth user id (= the id the
 * dashboard queries).
 *
 * Idempotent over `orderId`: if an account with the same order_id already
 * exists, nothing is added — so a doubly-delivered webhook never creates a
 * duplicate account. `updateUserById` shallow-merges top-level user_metadata
 * keys, so the customer's master data (consent, name, e-mail) is preserved.
 */
export async function appendAccount(
  admin: SupabaseClient,
  userId: string,
  opts: {
    orderId: string;
    planId: string;
    planName: string;
    accountSize?: string | null;
    /** Formatted amount actually paid, if known. */
    amountPaid?: string | null;
    paymentProvider: string;
  }
): Promise<{ created: boolean; account?: Account }> {
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data?.user) {
    console.error(
      `[SAFunded] Could not load account ${userId} to append a funded account:`,
      error?.message
    );
    return { created: false };
  }

  const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
  const accounts = readAccounts(meta);

  // Idempotency: an account for this order already exists.
  if (accounts.some((a) => a.order_id === opts.orderId)) {
    return { created: false };
  }

  const nowIso = new Date().toISOString();
  const account: Account = {
    account_id: makeAccountId(),
    order_id: opts.orderId,
    plan: opts.planId,
    account_plan_id: opts.planId,
    account_plan_name: opts.planName,
    account_size: opts.accountSize ?? null,
    account_status: "active",
    account_amount_paid: opts.amountPaid ?? null,
    payment_provider: opts.paymentProvider,
    tracking_token: null, // filled in manually
    mt5_login: null, // filled in manually
    mt5_password: null, // filled in manually
    mt5_server: null, // filled in manually
    created_at: nowIso,
    account_activated_at: nowIso,
  };

  const { error: updErr } = await admin.auth.admin.updateUserById(userId, {
    user_metadata: { accounts: [...accounts, account] },
  });
  if (updErr) {
    console.error(
      `[SAFunded] Failed to append funded account for ${userId}:`,
      updErr.message
    );
    return { created: false };
  }

  return { created: true, account };
}

/** Reads the e-mail and stored consent metadata for a Supabase user. */
export async function getAccountCompliance(
  admin: SupabaseClient,
  userId: string
): Promise<AccountCompliance | null> {
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data?.user) {
    console.error(
      `[SAFunded] Could not load account ${userId} for compliance:`,
      error?.message
    );
    return null;
  }

  const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
  return {
    email: data.user.email ?? undefined,
    consentAcceptedAt:
      typeof meta.consent_accepted_at === "string"
        ? meta.consent_accepted_at
        : undefined,
    termsVersion:
      typeof meta.terms_version === "string" ? meta.terms_version : undefined,
    lastConfirmationOrderId:
      typeof meta.last_confirmation_order_id === "string"
        ? meta.last_confirmation_order_id
        : undefined,
  };
}

/**
 * Records that the confirmation e-mail for `orderId` has been sent, storing the
 * timestamp and referenced terms version on the account. Used both as the
 * compliance proof and for idempotency (skip if the same order id is seen
 * again).
 */
export async function recordConfirmationSent(
  admin: SupabaseClient,
  userId: string,
  opts: {
    orderId: string;
    provider: "stripe" | "confirmo";
    termsVersion?: string;
    sentAt: string;
  }
): Promise<void> {
  const { error } = await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      confirmation_email_sent_at: opts.sentAt,
      terms_version: opts.termsVersion,
      last_confirmation_order_id: opts.orderId,
      last_confirmation_provider: opts.provider,
    },
  });

  if (error) {
    console.error(
      `[SAFunded] Failed to record confirmation for account ${userId}:`,
      error.message
    );
  }
}
