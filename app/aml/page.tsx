import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, UL, LI, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "AML & Anti-Fraud Policy — SAFunded",
};

export default function AmlPage() {
  return (
    <LegalShell title="AML & Anti-Fraud Policy">
      <H3>3.1 Zweck</H3>
      <P>
        Diese AML- und Anti-Fraud-Policy beschreibt die Grundsätze, mit denen
        SAFunded Geldwäsche, Terrorismusfinanzierung, Zahlungsbetrug,
        Identitätsmissbrauch und sonstigen Missbrauch der Plattform verhindern
        und aufdecken will. Ziel ist ein faires, sicheres und regelkonformes
        Performance-Programm.
      </P>

      <H3>3.2 Geltungsbereich</H3>
      <P>
        Diese Policy gilt für alle Nutzer, Accounts, Käufe, Auszahlungsanfragen
        und Transaktionen im Zusammenhang mit SAFunded sowie für sämtliche
        eingesetzten Zahlungsdienstleister (Stripe und Validopay).
      </P>

      <H3>3.3 Risikobasierter Ansatz</H3>
      <P>
        SAFunded verfolgt einen risikobasierten Ansatz. Prüfungstiefe und
        Maßnahmen richten sich nach dem erkannten Risiko eines Nutzers, einer
        Zahlung oder einer Auszahlung. Bei erhöhtem Risiko können verstärkte
        Sorgfaltsmaßnahmen, zusätzliche Nachweise oder erweiterte Prüfungen
        verlangt werden.
      </P>

      <H3>3.4 Identitätsprüfung / KYC</H3>
      <P>
        SAFunded kann vor einer Auszahlung sowie bei Auffälligkeiten jederzeit
        eine Identitätsprüfung verlangen. Hierzu können amtliche
        Ausweisdokumente, Adressnachweise, Zahlungsnachweise, Nachweise zur
        Herkunft der eingesetzten Mittel und weitere Informationen angefordert
        werden. Name des Account-Inhabers, des Zahlenden und des
        Auszahlungsempfängers müssen übereinstimmen.
      </P>

      <H3>3.5 Prüfung von Zahlungs- und Auszahlungsdaten</H3>
      <P>
        SAFunded prüft Zahlungs- und Auszahlungsdaten auf Plausibilität,
        Übereinstimmung und Auffälligkeiten. Zahlungen müssen vom rechtmäßigen
        Konto- bzw. Karteninhaber stammen. Drittzahlungen können abgelehnt,
        zurückgehalten oder einer gesonderten Prüfung unterzogen werden.
      </P>

      <H3>3.6 Stripe- und Validopay-Zahlungen</H3>
      <P>
        Zahlungen werden über Stripe (Karten-/Standardzahlungen) und Validopay
        (Krypto-Zahlungen) abgewickelt. Es gelten ergänzend die Bedingungen und
        Compliance-Anforderungen der jeweiligen Zahlungsdienstleister. SAFunded
        kann Transaktionen anhalten oder ablehnen, wenn diese gegen Vorgaben der
        Zahlungsdienstleister, gegen geltendes Recht oder gegen diese Policy
        verstoßen.
      </P>

      <H3>3.7 Chargebacks</H3>
      <P>
        Unberechtigte Rückbuchungen (Chargebacks) gelten als Missbrauch. Bei
        Chargeback-Missbrauch kann SAFunded Accounts sperren, Auszahlungen
        zurückhalten und Ansprüche geltend machen. Ein Chargeback nach einem
        Regelverstoß oder nach Nutzung des Accounts begründet keinen
        Erstattungsanspruch.
      </P>

      <H3>3.8 Payout-Monitoring</H3>
      <P>
        Auszahlungsanfragen werden vor Bearbeitung auf Regelkonformität,
        KYC-Status, Betrugsindikatoren und AML-Risiken geprüft. Auffällige
        Anfragen können zurückgehalten und vertieft untersucht werden.
      </P>

      <H3>3.9 Trading-Monitoring</H3>
      <P>
        SAFunded überwacht die Handelsaktivität auf Muster, die auf Manipulation,
        verbotene Strategien oder die künstliche Erfüllung von
        Payout-Voraussetzungen hindeuten. Geprüft werden können u. a.
        Haltedauer, Frequenz, Strategie, Ausführungslogik und Marktkontext.
      </P>

      <H3>3.10 IP-, Geräte- und Standortprüfung</H3>
      <P>
        SAFunded kann IP-Adressen, Geräteinformationen und Standortdaten erheben
        und auswerten, um Mehrfach-Accounts, koordinierten Missbrauch, Standort-
        und Sanktionsrisiken sowie die Nutzung von VPN/Proxy zur Verschleierung
        zu erkennen.
      </P>

      <H3>3.11 Restricted Countries, Sanktionen</H3>
      <P>
        SAFunded akzeptiert keine Nutzer aus oder mit Aufenthalt in{" "}
        <B>Ukraine, Iran, Israel und Afghanistan</B>. SAFunded kann diese Liste
        aus rechtlichen, regulatorischen, AML-, sanktions-, zahlungsanbieter-
        oder risikobezogenen Gründen erweitern. SAFunded kann Standort-,
        Zahlungs- und KYC-Daten prüfen und Registrierungen, Käufe, Accounts und
        Auszahlungen ablehnen, wenn ein Bezug zu einem eingeschränkten Land
        besteht.
      </P>

      <H3>3.12 Fraud Red Flags</H3>
      <P>Als Verdachtsindikatoren gelten insbesondere:</P>
      <UL>
        <LI>mehrere Accounts mit identischen Zahlungsdaten,</LI>
        <LI>mehrere Accounts mit identischen IP-/Geräte-Mustern,</LI>
        <LI>widersprüchliche oder unplausible KYC-Daten,</LI>
        <LI>Nutzung fremder Zahlungsdaten oder gestohlener Karten,</LI>
        <LI>Chargebacks nach Regelverstoß,</LI>
        <LI>ungewöhnliche oder eilige Auszahlungsanfragen,</LI>
        <LI>künstlich erzeugte profitable Tage,</LI>
        <LI>Hedging zwischen Accounts,</LI>
        <LI>Scalping-, Martingale- oder Grid-Muster,</LI>
        <LI>Nutzung nicht genehmigter Bots/EAs,</LI>
        <LI>technische Manipulation,</LI>
        <LI>Nutzung von VPN/Proxy zur Verschleierung,</LI>
        <LI>Hinweise auf einen Bezug zu einem Restricted Country,</LI>
        <LI>Identitätsmissbrauch,</LI>
        <LI>nicht genehmigte Drittzahlungen.</LI>
      </UL>

      <H3>3.13 Maßnahmen bei Verdacht</H3>
      <P>
        Bei begründetem Verdacht kann SAFunded insbesondere: zusätzliche
        Nachweise anfordern, Accounts pausieren oder sperren, Auszahlungen
        zurückhalten oder ablehnen, Käufe rückabwickeln, Accounts beenden und –
        soweit gesetzlich vorgesehen – Behörden informieren.
      </P>

      <H3>3.14 Dokumentation</H3>
      <P>
        SAFunded dokumentiert relevante Prüfungen, Auffälligkeiten und Maßnahmen
        im erforderlichen Umfang und bewahrt diese Unterlagen für die gesetzlich
        vorgesehenen bzw. angemessenen Zeiträume auf.
      </P>

      <H3>3.15 Datenschutz</H3>
      <P>
        Die Verarbeitung personenbezogener Daten im Rahmen dieser Policy erfolgt
        nach Maßgabe der Datenschutzerklärung von SAFunded und der geltenden
        Datenschutzgesetze.
      </P>

      <H3>3.16 Kontakt</H3>
      <P>Fragen zu dieser Policy: info@safunded.com</P>
    </LegalShell>
  );
}
