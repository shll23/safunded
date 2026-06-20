import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, UL, LI, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "AML & Anti-Fraud Policy — SAFunded",
  alternates: legalAlternates("aml"),
};

export default function AmlEnPage() {
  return (
    <LegalShell title="AML & Anti-Fraud Policy" lang="en">
      <H3>3.1 Purpose</H3>
      <P>
        This AML and Anti-Fraud Policy describes the principles by which
        SAFunded seeks to prevent and detect money laundering, terrorist
        financing, payment fraud, identity abuse and other abuse of the
        platform. The aim is a fair, secure and rule-compliant performance
        program.
      </P>

      <H3>3.2 Scope</H3>
      <P>
        This policy applies to all users, accounts, purchases, payout requests
        and transactions in connection with SAFunded as well as to all payment
        service providers used (Stripe and Validopay).
      </P>

      <H3>3.3 Risk-based approach</H3>
      <P>
        SAFunded pursues a risk-based approach. The depth of review and the
        measures depend on the identified risk of a user, a payment or a payout.
        In the event of increased risk, enhanced due-diligence measures,
        additional evidence or extended reviews may be required.
      </P>

      <H3>3.4 Identity verification / KYC</H3>
      <P>
        SAFunded may require an identity verification at any time before a payout
        as well as in the event of irregularities. For this purpose, official
        identification documents, proof of address, proof of payment, proof of
        the origin of the funds used and further information may be requested.
        The names of the account holder, the payer and the payout recipient must
        match.
      </P>

      <H3>3.5 Review of payment and payout data</H3>
      <P>
        SAFunded checks payment and payout data for plausibility, consistency and
        irregularities. Payments must originate from the legitimate account or
        card holder. Third-party payments may be refused, withheld or subjected
        to a separate review.
      </P>

      <H3>3.6 Stripe and Validopay payments</H3>
      <P>
        Payments are processed via Stripe (card/standard payments) and Validopay
        (crypto payments). The terms and compliance requirements of the
        respective payment service providers apply in addition. SAFunded may
        halt or refuse transactions if they violate the requirements of the
        payment service providers, applicable law or this policy.
      </P>

      <H3>3.7 Chargebacks</H3>
      <P>
        Unjustified chargebacks count as abuse. In the event of chargeback
        abuse, SAFunded may block accounts, withhold payouts and assert claims. A
        chargeback after a rule violation or after use of the account does not
        give rise to any refund entitlement.
      </P>

      <H3>3.8 Payout monitoring</H3>
      <P>
        Payout requests are checked for rule compliance, KYC status, fraud
        indicators and AML risks before processing. Suspicious requests may be
        withheld and investigated in greater depth.
      </P>

      <H3>3.9 Trading monitoring</H3>
      <P>
        SAFunded monitors trading activity for patterns that indicate
        manipulation, prohibited strategies or the artificial fulfilment of
        payout requirements. Holding time, frequency, strategy, execution logic
        and market context, among other things, may be reviewed.
      </P>

      <H3>3.10 IP, device and location review</H3>
      <P>
        SAFunded may collect and evaluate IP addresses, device information and
        location data in order to detect multiple accounts, coordinated abuse,
        location and sanctions risks as well as the use of VPN/proxy for
        concealment.
      </P>

      <H3>3.11 Restricted Countries, sanctions</H3>
      <P>
        SAFunded does not accept users from or residing in{" "}
        <B>Ukraine, Iran, Israel and Afghanistan</B>. SAFunded may expand this
        list for legal, regulatory, AML, sanctions, payment-provider or
        risk-related reasons. SAFunded may review location, payment and KYC data
        and refuse registrations, purchases, accounts and payouts if there is a
        connection to a restricted country.
      </P>

      <H3>3.12 Fraud Red Flags</H3>
      <P>The following in particular count as indicators of suspicion:</P>
      <UL>
        <LI>multiple accounts with identical payment data,</LI>
        <LI>multiple accounts with identical IP/device patterns,</LI>
        <LI>contradictory or implausible KYC data,</LI>
        <LI>use of third-party payment data or stolen cards,</LI>
        <LI>chargebacks after a rule violation,</LI>
        <LI>unusual or hasty payout requests,</LI>
        <LI>artificially generated profitable days,</LI>
        <LI>hedging between accounts,</LI>
        <LI>scalping, martingale or grid patterns,</LI>
        <LI>use of unapproved bots/EAs,</LI>
        <LI>technical manipulation,</LI>
        <LI>use of VPN/proxy for concealment,</LI>
        <LI>indications of a connection to a Restricted Country,</LI>
        <LI>identity abuse,</LI>
        <LI>unapproved third-party payments.</LI>
      </UL>

      <H3>3.13 Measures in case of suspicion</H3>
      <P>
        In the event of justified suspicion, SAFunded may in particular: request
        additional evidence, pause or block accounts, withhold or refuse
        payouts, reverse purchases, terminate accounts and — to the extent
        provided for by law — inform the authorities.
      </P>

      <H3>3.14 Documentation</H3>
      <P>
        SAFunded documents relevant reviews, irregularities and measures to the
        extent necessary and retains these records for the periods provided for
        by law or appropriate.
      </P>

      <H3>3.15 Data protection</H3>
      <P>
        The processing of personal data within the scope of this policy takes
        place in accordance with the SAFunded Privacy Policy and the applicable
        data protection laws.
      </P>

      <H3>3.16 Contact</H3>
      <P>Questions about this policy: info@safunded.com</P>
    </LegalShell>
  );
}
