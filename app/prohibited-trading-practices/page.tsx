import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Prohibited Trading Practices — SAFunded",
};

export default function ProhibitedTradingPracticesPage() {
  return (
    <LegalShell title="Prohibited Trading Practices">
      <H3>11.1 Kategorien</H3>
      <P>
        SAFunded unterscheidet zwischen <B>erlaubten</B>,{" "}
        <B>eingeschränkt erlaubten</B>, <B>nur nach Approval erlaubten</B> und{" "}
        <B>verbotenen</B> Praktiken.
      </P>
      <P>
        <B>Erlaubt:</B> regelkonformes diskretionäres Trading der freigegebenen
        Instrumente; Weekend- und Overnight-Holding (mit eigenem Risiko);
        transparentes, regelkonformes Copy Trading.
      </P>
      <P>
        <B>Eingeschränkt erlaubt:</B> News Trading außerhalb des gesperrten
        5-Minuten-Fensters; kurzfristige Trades, soweit sie kein systematisches
        Scalping im Sinne dieser Regeln darstellen.
      </P>
      <P>
        <B>Nur nach Approval erlaubt:</B> Einsatz von Expert Advisors, Bots,
        Skripten oder automatisierten Systemen. Vor Nutzung ist eine Genehmigung
        einzuholen; SAFunded darf Strategie, technische Funktionsweise und
        Risikologik prüfen und genehmigte Systeme nachträglich untersagen.
      </P>
      <P>
        <B>Verboten:</B> Scalping; Martingale; Grid Trading; Hedging;
        Latenz-Arbitrage; Tick-Arbitrage; Reverse Arbitrage; Ausnutzung von
        Preis- oder Plattformfehlern; technische Manipulation; nicht genehmigte
        Bots/EAs/Skripte; HFT bzw. massenhafte Orderplatzierung; Server-/
        Systemüberlastung; Ausnutzung nicht marktgerechter Kurse; News Trading im
        gesperrten 5-Minuten-Fenster; Multi-Account-Abuse; Identitätsmissbrauch;
        Kontoweitergabe; KYC-Umgehung; Zahlungsbetrug; Chargeback-Missbrauch;
        Copy Trading zur Regelumgehung; koordinierte Gegenpositionen; Wash
        Trading; künstliche Erzeugung profitabler Tage; Bonus- oder
        Payout-Manipulation; Nutzung gestohlener Karten oder fremder
        Zahlungsdaten; Nutzung fremder Identitätsdaten; jede Strategie, die dem
        Zweck eines fairen Performance-Programms widerspricht.
      </P>

      <H3>11.2 Scalping</H3>
      <P>
        Sehr kurzfristige Trades, die systematisch auf minimale Preisbewegungen,
        technische Ausführungsvorteile, Latenz, Spread-Anomalien oder
        Tick-Bewegungen abzielen, sind verboten. SAFunded bewertet Trades nach
        Haltedauer, Muster, Frequenz, Strategie, Ausführungslogik und
        Marktkontext. Nicht jeder kurzfristige Trade ist automatisch ein
        Verstoß; verboten ist systematisches Scalping im Sinne dieser Regeln.
      </P>

      <H3>11.3 Martingale / Grid</H3>
      <P>
        Martingale, progressive Verlustverdopplung, aggressives Nachkaufen gegen
        Verlustpositionen, Grid-Systeme ohne erkennbare Risikobegrenzung und
        vergleichbare Strategien sind verboten. SAFunded kann Strategien anhand
        von Handelsmustern bewerten.
      </P>

      <H3>11.4 Copy Trading</H3>
      <P>
        Copy Trading über mehrere Accounts ist grundsätzlich erlaubt, solange es
        transparent, regelkonform und nicht missbräuchlich ist. Verboten ist
        Copy Trading, wenn es zu Hedging, koordinierten Gegenpositionen,
        Multi-Account-Abuse, Identitätsmissbrauch oder unfairer
        Vorteilserlangung führt oder zur Umgehung von Drawdown-, Payout- oder
        Mindesttage-Regeln genutzt wird. Der Trader bleibt vollständig
        verantwortlich.
      </P>

      <H3>11.5 Hedging</H3>
      <P>
        Hedging ist verboten, insbesondere zwischen mehreren Accounts desselben
        Traders, zwischen koordinierten Accounts verschiedener Trader, zwischen
        SAFunded-Accounts und externen Accounts zur Risikoverschiebung sowie
        durch entgegengesetzte Positionen zur Umgehung von Risiko- oder
        Payout-Regeln.
      </P>

      <H3>11.6 Folgen</H3>
      <P>
        Verstöße können zu Disqualifikation, Payout-Ablehnung, Sperrung,
        Schließung oder Beendigung des Accounts sowie zur Geltendmachung von
        Ansprüchen führen.
      </P>
    </LegalShell>
  );
}
