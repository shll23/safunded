import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { P } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "KYC / Verification Policy — SAFunded",
  alternates: legalAlternates("kyc"),
};

export default function KycEnPage() {
  return (
    <LegalShell title="KYC / Verification Policy" lang="en">
      <P>
        (1) SAFunded may require an identity and compliance review, in
        particular before a payout as well as in the event of irregularities.
        (2) Identity documents, proof of address, proof of payment, proof of
        origin and further information may be requested. (3) The names of the
        trader, the account holder, the payer and the payout recipient must
        match. (4) Third-party payments may be refused. (5) False information
        leads to a block. (6) Without a successful KYC and compliance review, no
        payout is made. (7) SAFunded may withhold payouts as long as data is
        missing or risks exist.
      </P>
    </LegalShell>
  );
}
