import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Compliance helpers for the post-purchase confirmation flow.
 *
 * The consent given at checkout (consent_accepted_at + terms_version) is stored
 * on the customer's Supabase account in `user_metadata` (see lib/consent.ts).
 * After the confirmation e-mail is sent we additionally record
 * `confirmation_email_sent_at` and the referenced `terms_version` on the same
 * account, plus the order id/provider so repeated webhook deliveries do not send
 * duplicate e-mails.
 */

export interface AccountCompliance {
  email?: string;
  consentAcceptedAt?: string;
  termsVersion?: string;
  lastConfirmationOrderId?: string;
}

/** The active-account state persisted on a Supabase account after purchase. */
export interface AccountState {
  /** "active" once a purchase has been fulfilled; otherwise undefined. */
  status?: string;
  /** Plan id, e.g. "50k". */
  planId?: string;
  /** Human-readable plan name, e.g. "Instant Funded 50K". */
  planName?: string;
  /** Simulated account size, e.g. "$50,000". */
  accountSize?: string;
  /** Account id surfaced to the customer (the Supabase Auth user id). */
  accountId?: string;
  /** ISO 8601 timestamp of when the account was activated. */
  activatedAt?: string;
  /**
   * Formatted amount the customer actually paid, e.g. "299,00 €". This is the
   * session's `amount_total` (after any promotion/discount code), not the list
   * price, so a discounted purchase is represented correctly.
   */
  amountPaid?: string;
}

/** Reads the active-account state from a Supabase user's metadata. */
export function readAccountState(
  meta: Record<string, unknown> | null | undefined
): AccountState {
  const m = meta ?? {};
  const str = (v: unknown) => (typeof v === "string" ? v : undefined);
  return {
    status: str(m.account_status),
    planId: str(m.account_plan_id),
    planName: str(m.account_plan_name),
    accountSize: str(m.account_size),
    accountId: str(m.account_id),
    activatedAt: str(m.account_activated_at),
    amountPaid: str(m.account_amount_paid),
  };
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

/**
 * Marks the customer's account as active after a fulfilled purchase, storing the
 * plan, account size, account id and an activation timestamp on the same
 * Supabase account (user_metadata) that the consent/confirmation proofs live on.
 *
 * The dashboard loads exactly these fields back for the logged-in user (keyed by
 * the same Supabase Auth user id) to render the real account state. `updateUserById`
 * merges top-level user_metadata keys, so existing consent/confirmation fields
 * are preserved.
 */
export async function markAccountActive(
  admin: SupabaseClient,
  userId: string,
  opts: {
    planId?: string;
    planName?: string;
    accountSize?: string;
    accountId: string;
    activatedAt: string;
    /** Formatted amount actually paid (session `amount_total`), if known. */
    amountPaid?: string;
  }
): Promise<void> {
  const { error } = await admin.auth.admin.updateUserById(userId, {
    user_metadata: {
      account_status: "active",
      account_plan_id: opts.planId,
      account_plan_name: opts.planName,
      account_size: opts.accountSize,
      account_id: opts.accountId,
      account_activated_at: opts.activatedAt,
      account_amount_paid: opts.amountPaid,
    },
  });

  if (error) {
    console.error(
      `[SAFunded] Failed to activate account for ${userId}:`,
      error.message
    );
  }
}
