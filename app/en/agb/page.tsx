import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions (AGB) — SAFunded",
  alternates: legalAlternates("agb"),
};

export default function AgbEnPage() {
  return (
    <LegalShell title="General Terms & Conditions (AGB)" lang="en">
      <H3>1. Provider and scope</H3>
      <P>
        (1) The provider is AB Digital Management, represented by Alex Taino
        Blass, Hauptstraße 6, 72622 Nürtingen, Germany (hereinafter
        “SAFunded”). (2) These Terms &amp; Conditions apply to all services
        offered via the SAFunded platform (safunded.com) and to the contractual
        relationship between SAFunded and the user. (3) Deviating terms of the
        user are hereby rejected.
      </P>

      <H3>2. Definitions</H3>
      <P>
        “Platform” means the website and the digital services of SAFunded.
        “Account” means a simulated trading account on MT5. “Instant Funded
        Account” means a program in which, after purchase, a simulated account
        with a defined reference value is provided immediately. “Account
        reference value” means the value of the respective account model
        underlying the calculation of loss and profit limits. “Payout/reward”
        means a possible performance-based payment after successful fulfilment
        of all requirements. “Reset time” means the daily reference time UTC+2
        (Berlin-Prague time).
      </P>

      <H3>3. Description of the services</H3>
      <P>
        (1) SAFunded offers digital prop-trading programs, simulated trading
        accounts, trader dashboards, performance rules, account access and
        Instant Funded Account models. (2) Currently offered are, among others,
        the account models 25k, 50k and 100k Instant Funded Account. SAFunded
        may introduce further account models.
      </P>

      <H3>4. Simulated trading and digital service</H3>
      <P>
        (1) All trading on SAFunded takes place in a{" "}
        <B>simulated environment</B>. No real capital of the user is deposited,
        held or traded. Displayed account balances are fictitious reference
        values for performance measurement and do not constitute a deposit,
        credit balance or trading capital. (2) The user purchases a digital
        service in the form of access to software, simulation and the related
        evaluation and program services.
      </P>

      <H3>
        5. No investment advice, no financial advice, no asset management
      </H3>
      <P>
        SAFunded provides <B>no</B> investment advice, financial advice, asset
        management, no deposit business and offers no investment product.
        SAFunded does not encourage trading with real capital. There are no
        profit guarantees.
      </P>

      <H3>6. Registration and account creation</H3>
      <P>
        (1) Use requires registration with accurate, complete information. (2)
        The user must keep their access data confidential. (3) Only the number
        of accounts permitted under the rules is allowed per person.
      </P>

      <H3>7. Minimum age and legal capacity</H3>
      <P>
        Use requires that the user is of legal age (at least 18 years) and has
        unrestricted legal capacity.
      </P>

      <H3>8. Restricted Countries</H3>
      <P>
        Users from or residing in{" "}
        <B>Ukraine, Iran, Israel and Afghanistan</B> may not open or use
        accounts. SAFunded may expand this list for legal, regulatory, AML,
        sanctions, payment-provider or risk-related reasons and refuse
        registrations, purchases, accounts and payouts accordingly.
      </P>

      <H3>9. Obligations of the user</H3>
      <P>
        The user undertakes to provide accurate information, to comply with the
        rules, not to use any prohibited trading practices, not to commit any
        multiple-account or identity abuse and to observe applicable law.
      </P>

      <H3>10. Payment terms (Stripe and Confirmo)</H3>
      <P>
        (1) Payments are made via Stripe and Confirmo. (2) Payments must
        originate from the legitimate account or card holder; third-party
        payments may be refused or reviewed. (3) Chargeback abuse and payment
        fraud are prohibited and lead to a block. (4) In the event of payment
        disputes, SAFunded may pause or block accounts. (5) Refunds are governed
        by the Refund Policy.
      </P>

      <H3>11. Provision of digital services</H3>
      <P>
        The digital service (account access) is provided after successful
        receipt of payment, generally immediately or promptly.
      </P>

      <H3>12. Right of withdrawal for digital services</H3>
      <P>
        Consumers are generally entitled to a statutory right of withdrawal. Its
        requirements, deadlines and consequences are explained separately in the
        withdrawal instructions.
      </P>

      <H3>13. Expiry of the right of withdrawal</H3>
      <P>
        In the case of digital content/services, the right of withdrawal expires
        if SAFunded has begun performance after the consumer has expressly
        consented that performance begins before the expiry of the withdrawal
        period and the consumer has confirmed their knowledge that, by giving
        their consent, they lose the right of withdrawal, insofar as this is
        legally permissible.
      </P>

      <H3>14. Refund Policy</H3>
      <P>
        The Refund Policy applies in addition (see section 8 of this document).
      </P>

      <H3>15.–28. Trading and payout rules</H3>
      <P>
        The Trading Rules (section 5), the Instant Funded Account Rules (section
        6) and the Payout Policy (section 7) of this document apply, in
        particular: Maximum Daily Loss 5%, Maximum Loss/Overall Drawdown 10%,
        permitted Weekend Trading and Overnight Holding at one’s own risk,
        News-Trading restriction within the 5-minute window, scalping
        prohibition, martingale/grid prohibition, Copy Trading permitted without
        hedging, EAs/bots only after approval, payout at the earliest after 14
        calendar days, at least 3 profitable days with at least 1% of the
        account reference value each, Profit Split 80% in favour of the trader,
        and payout processing within 24 hours after successful review.
      </P>

      <H3>29. AML / anti-fraud review</H3>
      <P>The AML &amp; Anti-Fraud Policy applies (section 3).</P>

      <H3>30. KYC before payout</H3>
      <P>
        A payout requires a successful KYC and compliance review (section 10).
      </P>

      <H3>31. Prohibited trading practices</H3>
      <P>The section “Prohibited Trading Practices” applies (section 11).</P>

      <H3>32. Account suspension and termination</H3>
      <P>
        SAFunded may pause, block, disqualify or terminate accounts in the event
        of rule violations, abuse, false information, fraud or AML risks.
      </P>

      <H3>33. Payout refusal in case of rule violation</H3>
      <P>
        In the event of a rule violation, manipulation, false information or
        abuse, there is no entitlement to a payout.
      </P>

      <H3>34. Payment fraud and chargebacks</H3>
      <P>
        Payment fraud and chargeback abuse lead to immediate suspension and may
        trigger claims for damages.
      </P>

      <H3>35. Limitation of liability</H3>
      <P>
        (1) SAFunded is liable without limitation in cases of intent and gross
        negligence as well as for injury to life, body and health. (2) In the
        case of slightly negligent breach of essential contractual obligations,
        liability is limited to the foreseeable damage typical for the contract.
        (3) Otherwise, liability is excluded to the extent permitted by law.
      </P>

      <H3>36. Availability of the platform</H3>
      <P>
        Uninterrupted operation is not owed. Maintenance, malfunctions, force
        majeure or measures by third parties may limit availability.
      </P>

      <H3>37. Changes to the rules and services</H3>
      <P>
        SAFunded may adjust rules, instruments, leverage, account models and
        services for objective reasons (risk, fairness, technology, law).
        Significant changes will be communicated in an appropriate manner.
      </P>

      <H3>38. Communication by email</H3>
      <P>
        Communication takes place primarily by email. The user maintains a valid
        email address.
      </P>

      <H3>39. Intellectual property</H3>
      <P>
        All rights to the platform, content, trademarks and software remain with
        SAFunded or the respective rights holders.
      </P>

      <H3>40. Data protection</H3>
      <P>The Privacy Policy applies (section 12).</P>

      <H3>41. Applicable law</H3>
      <P>
        German law applies, excluding the UN Convention on Contracts for the
        International Sale of Goods. Mandatory consumer-protection provisions of
        the consumer’s state of residence remain unaffected.
      </P>

      <H3>42. Place of jurisdiction</H3>
      <P>
        To the extent permitted, the place of jurisdiction is the registered
        office of SAFunded. Mandatory statutory places of jurisdiction remain
        unaffected.
      </P>

      <H3>43. Severability clause</H3>
      <P>
        Should a provision be invalid, the validity of the remaining provisions
        remains unaffected.
      </P>

      <H3>44. Final provisions</H3>
      <P>
        There are no verbal side agreements. Changes require text form.
      </P>

      <H3 id="geographic-restrictions">
        45. Geographic Restrictions / Excluded Countries and Regions
      </H3>
      <P>
        45.1 SAFunded&rsquo;s offering is not directed at persons who are
        resident or habitually resident in, or who are nationals of, the
        countries or regions listed below. Registration, purchase, and the
        provision of an account are excluded for such persons.
      </P>
      <P>
        45.2 For reasons of compliance with international sanctions and embargo
        provisions (in particular those of the European Union and the United
        Nations) as well as anti-money-laundering requirements, the following are
        excluded: North Korea, Iran, Syria, Cuba, the Russian Federation,
        Belarus, Myanmar, Sudan, South Sudan, Venezuela, Afghanistan, and Iraq,
        as well as Crimea, Sevastopol, and the regions of Donetsk, Kherson,
        Luhansk, and Zaporizhzhia.
      </P>
      <P>
        45.3 For regulatory reasons and on the basis of an internal risk and
        compliance decision by the provider, the following are additionally
        excluded: the United States of America (including its territories),
        India, Indonesia, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan,
        Uzbekistan, Bhutan, Anguilla, Antigua and Barbuda, Saint Kitts and Nevis,
        Saint Lucia, Saint Vincent and the Grenadines, the Cook Islands, and
        Vanuatu. The exclusion of the United States is made in particular with
        regard to U.S. financial market regulation.
      </P>
      <P>
        45.4 By making a purchase, the user warrants that they are not subject to
        any of the restrictions set out in 45.2 and 45.3, and that they will not
        provide any incorrect information (for example regarding residence or
        nationality) in this respect.
      </P>
      <P>
        45.5 If, notwithstanding these restrictions, a payment is received from
        an excluded person, no account will be provided. In such a case, the
        amount paid will be refunded in full to the payer; no further claim to
        performance shall exist.
      </P>
      <P>
        45.6 The provider is entitled to amend the above list insofar as the
        underlying sanctions, legal, or regulatory situation changes.
      </P>
    </LegalShell>
  );
}
