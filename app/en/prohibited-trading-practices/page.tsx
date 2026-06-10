import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Prohibited Trading Practices — SAFunded",
  alternates: legalAlternates("prohibited-trading-practices"),
};

export default function ProhibitedTradingPracticesEnPage() {
  return (
    <LegalShell title="Prohibited Trading Practices" lang="en">
      <H3>11.1 Categories</H3>
      <P>
        SAFunded distinguishes between <B>permitted</B>,{" "}
        <B>restricted (permitted with limitations)</B>,{" "}
        <B>permitted only after approval</B> and <B>prohibited</B> practices.
      </P>
      <P>
        <B>Permitted:</B> rule-compliant discretionary trading of the approved
        instruments; weekend and overnight holding (at one’s own risk);
        transparent, rule-compliant Copy Trading.
      </P>
      <P>
        <B>Restricted (permitted with limitations):</B> News Trading outside the
        blocked 5-minute window; short-term trades, insofar as they do not
        constitute systematic scalping within the meaning of these rules.
      </P>
      <P>
        <B>Permitted only after approval:</B> use of Expert Advisors, bots,
        scripts or automated systems. Approval must be obtained before use;
        SAFunded may review the strategy, technical functioning and risk logic
        and may subsequently prohibit approved systems.
      </P>
      <P>
        <B>Prohibited:</B> scalping; martingale; grid trading; hedging; latency
        arbitrage; tick arbitrage; reverse arbitrage; exploitation of price or
        platform errors; technical manipulation; unapproved bots/EAs/scripts;
        HFT or mass order placement; server/system overload; exploitation of
        non-market prices; News Trading within the blocked 5-minute window;
        multi-account abuse; identity abuse; account sharing; KYC circumvention;
        payment fraud; chargeback abuse; Copy Trading to circumvent the rules;
        coordinated counter-positions; wash trading; artificial generation of
        profitable days; bonus or payout manipulation; use of stolen cards or
        third-party payment data; use of third-party identity data; any strategy
        that contradicts the purpose of a fair performance program.
      </P>

      <H3>11.2 Scalping</H3>
      <P>
        Very short-term trades that systematically target minimal price
        movements, technical execution advantages, latency, spread anomalies or
        tick movements are prohibited. SAFunded evaluates trades according to
        holding time, pattern, frequency, strategy, execution logic and market
        context. Not every short-term trade is automatically a violation;
        prohibited is systematic scalping within the meaning of these rules.
      </P>

      <H3>11.3 Martingale / Grid</H3>
      <P>
        Martingale, progressive loss doubling, aggressive averaging down against
        losing positions, grid systems without recognisable risk limitation and
        comparable strategies are prohibited. SAFunded may evaluate strategies on
        the basis of trading patterns.
      </P>

      <H3>11.4 Copy Trading</H3>
      <P>
        Copy Trading across several accounts is generally permitted as long as it
        is transparent, rule-compliant and not abusive. Prohibited is Copy
        Trading if it leads to hedging, coordinated counter-positions,
        multi-account abuse, identity abuse or unfair advantage, or is used to
        circumvent drawdown, payout or minimum-day rules. The trader remains
        fully responsible.
      </P>

      <H3>11.5 Hedging</H3>
      <P>
        Hedging is prohibited, in particular between several accounts of the same
        trader, between coordinated accounts of different traders, between
        SAFunded accounts and external accounts for the purpose of risk
        shifting, as well as through opposing positions to circumvent risk or
        payout rules.
      </P>

      <H3>11.6 Consequences</H3>
      <P>
        Violations may lead to disqualification, payout refusal, blocking,
        closure or termination of the account as well as the assertion of
        claims.
      </P>
    </LegalShell>
  );
}
