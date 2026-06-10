import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Instant Funded Account Rules — SAFunded",
};

export default function InstantFundedAccountRulesPage() {
  return (
    <LegalShell title="Instant Funded Account Rules">
      <H3>6.1 Grundsatz</H3>
      <P>
        Beim Instant Funded Account wird nach Erwerb unmittelbar ein simulierter
        Account mit definiertem Account-Referenzwert (25k, 50k, 100k; weitere
        Modelle möglich) bereitgestellt.
      </P>

      <H3>6.2 Maximum Daily Loss (5 %)</H3>
      <P>
        (1) Der maximale tägliche Verlust beträgt{" "}
        <B>5 % des jeweiligen Account-Referenzwertes</B>. (2) In die Berechnung
        können Equity, Balance, offene Positionen, Floating P/L, Kommissionen,
        Swaps, Gebühren und sonstige handelsbezogene Kosten einbezogen werden.
        (3) Offene Positionen zählen mit; ein Verstoß liegt auch dann vor, wenn
        die Grenze nur temporär durch offene Positionen verletzt wird. (4) Die
        tägliche Reset-Zeit ist UTC+2 (Berlin-Prag-Zeit). (5) Ein Verstoß kann
        zur Sperrung, Schließung, Disqualifikation oder Beendigung des Accounts
        führen.
      </P>

      <H3>6.3 Maximum Loss / Overall Drawdown (10 %)</H3>
      <P>
        (1) Der maximale Gesamtverlust beträgt{" "}
        <B>10 % des jeweiligen Account-Referenzwertes</B>; diese Grenze darf zu
        keinem Zeitpunkt verletzt werden. (2) In die Berechnung können Equity,
        Balance, offene Positionen, Floating P/L, Kommissionen, Swaps, Gebühren
        und handelsbezogene Kosten einbezogen werden. (3) Ein temporärer Verstoß
        genügt. (4) Ein Verstoß kann zur sofortigen Beendigung des Accounts und
        zum Verlust eines Payout-Anspruchs führen.
      </P>

      <H3>6.4 Payout-Voraussetzung: Mindestlaufzeit 14 Tage</H3>
      <P>
        (1) Ein Payout kann frühestens nach <B>14 Kalendertagen</B> beantragt
        werden. (2) Die Frist beginnt mit Aktivierung des Accounts bzw. der
        ersten möglichen Nutzung. (3) Eine Payout-Anfrage ist nur möglich, wenn
        alle Regeln eingehalten wurden. (4) Die Prüfung erfolgt innerhalb von 24
        Stunden nach vollständiger Einreichung und erfolgreicher
        Compliance-Prüfung. (5) Ein Payout ist kein automatischer Anspruch,
        sondern steht unter dem Vorbehalt der vollständigen Regel-, KYC-, AML-,
        Anti-Fraud- und Compliance-Prüfung.
      </P>

      <H3>6.5 Payout-Voraussetzung: 3 profitable Tage mit je ≥ 1 %</H3>
      <P>
        (1) Erforderlich sind mindestens <B>3 profitable Handelstage</B>, an
        denen jeweils mindestens <B>1 % Gewinn</B> erzielt wurde. (2) Ein
        profitabler Tag ist ein Handelstag, an dem der Account mindestens 1 % des
        jeweiligen Account-Referenzwertes als Gewinn erreicht (25k/50k/100k
        jeweils 1 % des zugehörigen Referenzwertes). (3) Mehrere Trades eines
        Tages dürfen zusammengezählt werden. (4) Es gibt keinen separaten
        Mindestpayout-Betrag; entscheidend sind die Erfüllung der
        Regelvoraussetzungen und der 80 %-Profit-Split. (5) SAFunded darf prüfen,
        ob ein profitabler Tag durch echte Handelsaktivität entstanden ist;
        künstliche, manipulative oder regelumgehende Aktivitäten können
        ausgeschlossen werden. (6) Offene Positionen werden für die
        Payout-Bewertung nur berücksichtigt, soweit sie nach den
        SAFunded-Regeln hierfür relevant sind; SAFunded kann zur Wahrung eines
        fairen Programms auf realisierte Ergebnisse abstellen.
      </P>

      <H3>6.6 Profit Split (80 %)</H3>
      <P>
        (1) Nach erfolgreicher Payout-Prüfung erhält der Trader <B>80 %</B> des
        anerkannten auszuzahlenden Gewinnanteils; SAFunded behält 20 % ein. (2)
        Payouts erfolgen nur nach erfolgreicher KYC-, AML-, Anti-Fraud- und
        Regelprüfung. (3) Bei Regelverstoß, Manipulation, falschen Angaben,
        Identitätsmissbrauch oder sonstigem Missbrauch besteht kein
        Auszahlungsanspruch.
      </P>

      <H3>6.7 Bearbeitungszeit (24 Stunden)</H3>
      <P>
        (1) Nach erfolgreicher Prüfung werden Payouts innerhalb von{" "}
        <B>24 Stunden</B> bearbeitet. (2) Die Frist beginnt erst, wenn alle
        Unterlagen, KYC-Daten, Zahlungsdaten und Compliance-Informationen
        vollständig vorliegen. (3) Bei Auffälligkeiten, unvollständigen Angaben
        oder Verdacht auf Regelverstoß kann sich die Bearbeitung verzögern;
        SAFunded darf Payouts zurückhalten, ablehnen oder weiter prüfen.
      </P>

      <H3>6.8 Gebühren</H3>
      <P>
        (1) SAFunded erhebt keine zusätzlichen Payout-Gebühren. (2) Externe
        Zahlungsanbieter, Banken, Blockchain-Netzwerke oder Drittanbieter können
        eigene Gebühren erheben; hierfür ist SAFunded nicht verantwortlich.
      </P>
    </LegalShell>
  );
}
