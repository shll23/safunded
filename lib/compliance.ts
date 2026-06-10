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
