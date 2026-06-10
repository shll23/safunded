import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { P, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Risk Disclosure / Risikohinweise — SAFunded",
};

export default function RisikohinweisePage() {
  return (
    <LegalShell title="Risk Disclosure / Risikohinweise">
      <P>
        (1) Trading ist mit erheblichen Risiken verbunden. (2) Auch simuliertes
        Trading kann zu finanziellen Entscheidungen, Stress und psychologischem
        Druck führen. (3) Die Gebühren für die digitalen Programme können
        vollständig verloren gehen. (4) SAFunded gibt{" "}
        <B>keine Gewinnversprechen</B> und <B>keine Garantie auf einen Payout</B>
        . (5) Vergangene Performance ist keine Garantie für künftige Ergebnisse.
        (6) Märkte sind volatil. (7) Overnight- und Weekend-Trading können Gaps,
        Slippage, Spread-Ausweitungen und Liquiditätsrisiken verursachen. (8)
        Ein Hebel von 1:100 erhöht die Risiken erheblich. (9) Trader handeln
        eigenverantwortlich. (10) SAFunded erbringt keine Anlageberatung. (11)
        Eine Teilnahme sollte nur erfolgen, wenn die Regeln und Risiken
        vollständig verstanden wurden.
      </P>
    </LegalShell>
  );
}
