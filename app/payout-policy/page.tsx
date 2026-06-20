import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Payout Policy — SAFunded",
};

export default function PayoutPolicyPage() {
  return (
    <LegalShell title="Payout Policy">
      <H3>7.1 Grundsatz</H3>
      <P>
        Ein Payout ist eine leistungsabhängige Belohnung nach erfolgreicher,
        vollständiger Erfüllung aller Voraussetzungen. Es besteht kein
        automatischer und kein garantierter Anspruch.
      </P>

      <H3>7.2 Voraussetzungen</H3>
      <P>
        Kumulativ erforderlich sind: Einhaltung aller Trading- und
        Account-Regeln; Mindestlaufzeit von 14 Kalendertagen; mindestens 3
        profitable Tage mit je ≥ 1 % des Account-Referenzwertes; erfolgreiche
        KYC-, AML- und Anti-Fraud-Prüfung; vollständige und zutreffende
        Zahlungs-/Auszahlungsdaten.
      </P>

      <H3>7.3 Profit Split und Auszahlung</H3>
      <P>
        Der anerkannte Gewinnanteil wird im Verhältnis 80 % (Trader) / 20 %
        (SAFunded) aufgeteilt. Auszahlungen erfolgen über die unterstützten
        Methoden (Stripe/Validopay bzw. die jeweils angebotenen Auszahlungswege).
      </P>

      <H3>7.4 Bearbeitung und Fristen</H3>
      <P>
        Die Bearbeitung erfolgt innerhalb von 24 Stunden nach vollständiger
        Einreichung und erfolgreicher Prüfung. Externe Gebühren Dritter sind
        nicht durch SAFunded zu vertreten.
      </P>

      <H3>7.5 Zurückhaltung und Ablehnung</H3>
      <P>
        SAFunded kann Payouts zurückhalten, ablehnen oder vertieft prüfen bei
        Regelverstoß, Manipulation, Betrugs- oder AML-Risiken, unvollständigen
        Angaben oder fehlender KYC.
      </P>
    </LegalShell>
  );
}
