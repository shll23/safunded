import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, UL, LI } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — SAFunded",
  alternates: legalAlternates("datenschutz"),
};

export default function DatenschutzEnPage() {
  return (
    <LegalShell title="Privacy Policy" lang="en">
      <H3>12.1 Controller</H3>
      <P>
        SaFunded UG (i.G), Marbachweg 1, 72622 Nürtingen,
        Germany, info@safunded.com.
      </P>

      <H3>12.2 Data processed</H3>
      <P>
        Account data, payment data, KYC data, trading data, technical data, IP
        addresses, device information, communication data and compliance data.
      </P>

      <H3>12.3 Purposes</H3>
      <P>
        Account creation, contract performance, payment processing, KYC/AML/fraud
        review, payout review, trading-rule review, support, security, abuse
        detection and fulfilment of legal obligations.
      </P>

      <H3>12.4 Legal bases</H3>
      <UL>
        <LI>
          Art. 6 (1) lit. b GDPR (contract performance and pre-contractual
          measures),
        </LI>
        <LI>
          Art. 6 (1) lit. c GDPR (legal obligations, including AML/compliance),
        </LI>
        <LI>
          Art. 6 (1) lit. f GDPR (legitimate interests, including security,
          fraud prevention),
        </LI>
        <LI>
          where applicable, Art. 6 (1) lit. a GDPR (consent), insofar as
          relevant.
        </LI>
      </UL>

      <H3>12.5 Recipients / processors</H3>
      <P>
        Payment service providers (Stripe, Validopay) and the trading platform
        (MT5) as well as technical service providers, insofar as necessary for
        the stated purposes. Data transfers take place on the basis of the
        respective applicable legal bases and safeguards.
      </P>

      <H3>12.6 Storage period</H3>
      <P>
        Data is stored for as long as this is necessary for the stated purposes
        or as long as statutory retention obligations exist.
      </P>

      <H3>12.7 Data subject rights</H3>
      <P>
        Information, rectification, erasure, restriction of processing, data
        portability, objection as well as the right to lodge a complaint with a
        supervisory authority.
      </P>

      <H3>12.8 Contact</H3>
      <P>Data protection enquiries: info@safunded.com.</P>
    </LegalShell>
  );
}
