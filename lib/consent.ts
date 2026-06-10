import type { SupabaseClient } from "@supabase/supabase-js";
import { TERMS_VERSION } from "@/lib/legal";

/**
 * Shape of the consent flags the checkout client submits. Both must be `true`
 * before a purchase may proceed — they map to the two mandatory checkboxes:
 *  - acceptedTerms: AGB + Risikohinweise + Refund Policy gelesen und akzeptiert
 *  - acceptedImmediateProvision: ausdrückliches Verlangen der sofortigen
 *    Bereitstellung + Kenntnis des Erlöschens des Widerrufsrechts
 */
export interface ConsentInput {
  acceptedTerms?: boolean;
  acceptedImmediateProvision?: boolean;
}

export interface RecordedConsent {
  /** ISO 8601 timestamp of when the consent was recorded (server authority). */
  consentAcceptedAt: string;
  /** Version of the legal texts that were accepted. */
  termsVersion: string;
}

/** Returns true only if both mandatory consents were given. */
export function isConsentComplete(consent: ConsentInput | undefined): boolean {
  return Boolean(consent?.acceptedTerms && consent?.acceptedImmediateProvision);
}

/**
 * Records the purchase consent as a compliance proof on the customer's Supabase
 * account (user_metadata). The server stamps the timestamp itself so it cannot
 * be spoofed by the client. The returned values are additionally attached to
 * the order/payment metadata by the caller, so the proof lives both on the
 * account and on the order.
 */
export async function recordPurchaseConsent(
  supabase: SupabaseClient,
  consent: ConsentInput
): Promise<RecordedConsent> {
  const consentAcceptedAt = new Date().toISOString();

  await supabase.auth.updateUser({
    data: {
      consent_accepted_at: consentAcceptedAt,
      terms_version: TERMS_VERSION,
      consent_accepted_terms: consent.acceptedTerms === true,
      consent_accepted_immediate_provision:
        consent.acceptedImmediateProvision === true,
    },
  });

  return { consentAcceptedAt, termsVersion: TERMS_VERSION };
}
