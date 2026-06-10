import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund Policy — SAFunded",
  alternates: legalAlternates("refund-policy"),
};

export default function RefundPolicyEnPage() {
  return (
    <LegalShell title="Refund Policy" lang="en">
      <H3>8.1 Subject matter</H3>
      <P>
        SAFunded sells digital services and account access. After activation and
        provision of the digital account, a refund may — to the extent legally
        permissible — be excluded or restricted.
      </P>

      <H3>8.2 No refund entitlement in certain cases</H3>
      <P>
        In particular, there is no refund in the event of: a rule violation;
        false information; identity abuse; payment fraud; chargeback abuse; use
        of the account followed by a rule violation.
      </P>

      <H3>8.3 Refund in case of non-provision or fault of SAFunded</H3>
      <P>
        A refund may be considered if SAFunded does not provide the digital
        service or if there is a clear technical error for which SAFunded is
        responsible.
      </P>

      <H3>8.4 External fees</H3>
      <P>
        External fees from Stripe, Confirmo, banks or blockchain networks may
        not be refundable.
      </P>

      <H3>8.5 Consumer rights</H3>
      <P>
        Mandatory consumer rights, in particular any statutory right of
        withdrawal, remain unaffected. The relationship between the right of
        withdrawal and the immediate provision of digital services results from
        the Terms &amp; Conditions (sections 12 and 13) and the separate
        withdrawal instructions.
      </P>
    </LegalShell>
  );
}
