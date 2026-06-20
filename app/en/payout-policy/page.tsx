import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Payout Policy — SAFunded",
  alternates: legalAlternates("payout-policy"),
};

export default function PayoutPolicyEnPage() {
  return (
    <LegalShell title="Payout Policy" lang="en">
      <H3>7.1 Principle</H3>
      <P>
        A payout is a performance-based reward after successful, complete
        fulfilment of all requirements. There is no automatic and no guaranteed
        entitlement.
      </P>

      <H3>7.2 Requirements</H3>
      <P>
        The following are cumulatively required: compliance with all trading and
        account rules; a minimum duration of 14 calendar days; at least 3
        profitable days with ≥ 1% of the account reference value each; a
        successful KYC, AML and anti-fraud review; complete and accurate payment
        / payout data.
      </P>

      <H3>7.3 Profit split and payout</H3>
      <P>
        The recognised profit share is split in the ratio 80% (trader) / 20%
        (SAFunded). Payouts are made via the supported methods (Stripe/Validopay
        or the respective payout channels offered).
      </P>

      <H3>7.4 Processing and deadlines</H3>
      <P>
        Processing takes place within 24 hours after complete submission and
        successful review. External third-party fees are not the responsibility
        of SAFunded.
      </P>

      <H3>7.5 Withholding and refusal</H3>
      <P>
        SAFunded may withhold, refuse or review payouts in greater depth in the
        event of a rule violation, manipulation, fraud or AML risks, incomplete
        information or missing KYC.
      </P>
    </LegalShell>
  );
}
