import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Instant Funded Account Rules — SAFunded",
  alternates: legalAlternates("instant-funded-account-rules"),
};

export default function InstantFundedAccountRulesEnPage() {
  return (
    <LegalShell title="Instant Funded Account Rules" lang="en">
      <H3>6.1 Principle</H3>
      <P>
        With the Instant Funded Account, a simulated account with a defined
        account reference value (25k, 50k, 100k; further models possible) is
        provided immediately after purchase.
      </P>

      <H3>6.2 Maximum Daily Loss (5%)</H3>
      <P>
        (1) The maximum daily loss is{" "}
        <B>5% of the respective account reference value</B>. (2) The calculation
        may include equity, balance, open positions, floating P/L, commissions,
        swaps, fees and other trading-related costs. (3) Open positions count;
        a violation also exists if the limit is only temporarily breached by
        open positions. (4) The daily reset time is UTC+2 (Berlin-Prague time).
        (5) A violation may lead to the blocking, closure, disqualification or
        termination of the account.
      </P>

      <H3>6.3 Maximum Loss / Overall Drawdown (10%)</H3>
      <P>
        (1) The maximum overall loss is{" "}
        <B>10% of the respective account reference value</B>; this limit may not
        be breached at any time. (2) The calculation may include equity,
        balance, open positions, floating P/L, commissions, swaps, fees and
        trading-related costs. (3) A temporary violation is sufficient. (4) A
        violation may lead to the immediate termination of the account and the
        loss of any payout entitlement.
      </P>

      <H3>6.4 Payout requirement: minimum duration 14 days</H3>
      <P>
        (1) A payout can be requested at the earliest after{" "}
        <B>14 calendar days</B>. (2) The period begins with the activation of the
        account or the first possible use. (3) A payout request is only possible
        if all rules have been complied with. (4) The review takes place within
        24 hours after complete submission and successful compliance review. (5)
        A payout is not an automatic entitlement, but is subject to the complete
        rule, KYC, AML, anti-fraud and compliance review.
      </P>

      <H3>6.5 Payout requirement: 3 profitable days with ≥ 1% each</H3>
      <P>
        (1) At least <B>3 profitable trading days</B> are required, on each of
        which at least <B>1% profit</B> was achieved. (2) A profitable day is a
        trading day on which the account achieves at least 1% of the respective
        account reference value as profit (25k/50k/100k each 1% of the
        associated reference value). (3) Several trades of one day may be added
        together. (4) There is no separate minimum payout amount; what is
        decisive is the fulfilment of the rule requirements and the 80% profit
        split. (5) SAFunded may check whether a profitable day arose through
        genuine trading activity; artificial, manipulative or rule-circumventing
        activities may be excluded. (6) Open positions are only taken into
        account for the payout assessment insofar as they are relevant for this
        according to the SAFunded rules; SAFunded may rely on realised results
        to preserve a fair program.
      </P>

      <H3>6.6 Profit Split (80%)</H3>
      <P>
        (1) After a successful payout review, the trader receives <B>80%</B> of
        the recognised payable profit share; SAFunded retains 20%. (2) Payouts
        are made only after a successful KYC, AML, anti-fraud and rule review.
        (3) In the event of a rule violation, manipulation, false information,
        identity abuse or other abuse, there is no payout entitlement.
      </P>

      <H3>6.7 Processing time (24 hours)</H3>
      <P>
        (1) After a successful review, payouts are processed within{" "}
        <B>24 hours</B>. (2) The period only begins once all documents, KYC data,
        payment data and compliance information are complete. (3) In the event
        of irregularities, incomplete information or suspicion of a rule
        violation, processing may be delayed; SAFunded may withhold, refuse or
        further review payouts.
      </P>

      <H3>6.8 Fees</H3>
      <P>
        (1) SAFunded does not charge any additional payout fees. (2) External
        payment providers, banks, blockchain networks or third parties may
        charge their own fees; SAFunded is not responsible for these.
      </P>
    </LegalShell>
  );
}
