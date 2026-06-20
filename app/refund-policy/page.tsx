import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Refund Policy — SAFunded",
};

export default function RefundPolicyPage() {
  return (
    <LegalShell title="Refund Policy">
      <H3>8.1 Gegenstand</H3>
      <P>
        SAFunded verkauft digitale Dienstleistungen und Account-Zugänge. Nach
        Aktivierung und Bereitstellung des digitalen Accounts kann eine
        Rückerstattung – soweit rechtlich zulässig – ausgeschlossen oder
        eingeschränkt sein.
      </P>

      <H3>8.2 Kein Erstattungsanspruch in bestimmten Fällen</H3>
      <P>
        Keine Rückerstattung besteht insbesondere bei: Regelverstoß; falschen
        Angaben; Identitätsmissbrauch; Zahlungsbetrug; Chargeback-Missbrauch;
        Nutzung des Accounts mit anschließendem Regelverstoß.
      </P>

      <H3>8.3 Erstattung bei Nichtbereitstellung oder Fehler von SAFunded</H3>
      <P>
        Eine Rückerstattung kommt in Betracht, wenn SAFunded die digitale
        Leistung nicht bereitstellt oder ein klarer, von SAFunded zu vertretender
        technischer Fehler vorliegt.
      </P>

      <H3>8.4 Externe Gebühren</H3>
      <P>
        Externe Gebühren von Stripe, Validopay, Banken oder Blockchain-Netzwerken
        können nicht erstattungsfähig sein.
      </P>

      <H3>8.5 Verbraucherrechte</H3>
      <P>
        Zwingende Verbraucherrechte, insbesondere ein etwaiges gesetzliches
        Widerrufsrecht, bleiben unberührt. Das Verhältnis von Widerrufsrecht und
        sofortiger Bereitstellung digitaler Leistungen ergibt sich aus den AGB
        (Abschnitte 12 und 13) und der gesonderten Widerrufsbelehrung.
      </P>
    </LegalShell>
  );
}
