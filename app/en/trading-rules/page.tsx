import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Trading Rules — SAFunded",
  alternates: legalAlternates("trading-rules"),
};

export default function TradingRulesEnPage() {
  return (
    <LegalShell title="Trading Rules" lang="en">
      <H3>5.1 Application</H3>
      <P>
        These Trading Rules apply to all simulated accounts on SAFunded and
        supplement the Terms &amp; Conditions.
      </P>

      <H3>5.2 Trading platform and times</H3>
      <P>
        (1) MT5 (MetaTrader 5) is used. (2) The relevant daily reset/reference
        time is UTC+2 (Berlin-Prague time).
      </P>

      <H3>5.3 Permitted instruments</H3>
      <P>
        (1) In principle, the following are tradable: Forex, precious metals (in
        particular gold), indices as well as other CFDs or instrument-like
        products available via MT5 and approved by SAFunded. (2){" "}
        <B>Single stocks are not tradable.</B> (3) SAFunded may restrict tradable
        instruments depending on the account model, platform, risk or technical
        reasons.
      </P>

      <H3>5.4 Leverage</H3>
      <P>
        (1) The standard leverage is <B>1:100</B>. (2) SAFunded may apply
        different leverage depending on the instrument, account model, risk
        class or market conditions and may adjust leverage for risk, fairness,
        technical or regulatory reasons. (3) Higher leverage increases the risk
        of drawdown violations.
      </P>

      <H3>5.5 Weekend Trading</H3>
      <P>
        (1) Weekend Trading is generally permitted; positions may be held over
        the weekend. (2) The trader bears the risk of gaps, slippage, spread
        widening, reduced liquidity, market openings and exceptional market
        conditions. (3) SAFunded may restrict individual instruments, periods or
        market conditions for technical, regulatory, risk or fairness reasons.
      </P>

      <H3>5.6 Overnight Holding</H3>
      <P>
        (1) Overnight Holding is permitted; positions may be held overnight. (2)
        The trader remains responsible for swaps, spreads, gaps, slippage and
        drawdown risks. (3) Overnight positions are fully included in the
        drawdown and risk monitoring.
      </P>

      <H3>5.7 News Trading</H3>
      <P>
        (1) Within a window of <B>5 minutes before and 5 minutes after</B>{" "}
        relevant high-impact news, positions may neither be opened nor closed
        nor modified, insofar as SAFunded defines the respective news as
        relevant. (2) SAFunded determines high-impact news on the basis of
        recognised economic calendars, internal risk assessment and/or platform
        data. (3) Violations may lead to disqualification, payout refusal or
        account termination.
      </P>

      <H3>5.8 Prohibited and restricted strategies</H3>
      <P>
        Scalping, martingale, grid and hedging are prohibited; EAs/bots are only
        permitted after approval; Copy Trading is permitted under the conditions
        of section 11. Otherwise, the section “Prohibited Trading Practices”
        applies.
      </P>
    </LegalShell>
  );
}
