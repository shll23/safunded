import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { P, B } from "@/components/legal/typography";
import { legalAlternates } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Risk Disclosure — SAFunded",
  alternates: legalAlternates("risikohinweise"),
};

export default function RisikohinweiseEnPage() {
  return (
    <LegalShell title="Risk Disclosure" lang="en">
      <P>
        (1) Trading involves significant risk. (2) Even simulated trading can
        lead to financial decisions, stress and psychological pressure. (3) The
        fees for the digital programs can be completely lost. (4) SAFunded makes{" "}
        <B>no profit promises</B> and gives <B>no guarantee of a payout</B>. (5)
        Past performance is no guarantee of future results. (6) Markets are
        volatile. (7) Overnight and weekend trading can cause gaps, slippage,
        spread widening and liquidity risks. (8) Leverage of 1:100 significantly
        increases the risks. (9) Traders trade on their own responsibility. (10)
        SAFunded does not provide investment advice. (11) Participation should
        only take place if the rules and risks have been fully understood.
      </P>
    </LegalShell>
  );
}
