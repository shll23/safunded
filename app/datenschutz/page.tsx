import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, UL, LI } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — SAFunded",
};

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung">
      <H3>12.1 Verantwortlicher</H3>
      <P>
        SaFunded UG (i.G), Marbachweg 1, 72622 Nürtingen,
        Deutschland, info@safunded.com.
      </P>

      <H3>12.2 Verarbeitete Daten</H3>
      <P>
        Account-Daten, Zahlungsdaten, KYC-Daten, Trading-Daten, technische
        Daten, IP-Adressen, Geräteinformationen, Kommunikationsdaten und
        Compliance-Daten.
      </P>

      <H3>12.3 Zwecke</H3>
      <P>
        Account-Erstellung, Vertragsdurchführung, Zahlungsabwicklung, KYC-/AML-/
        Fraud-Prüfung, Payout-Prüfung, Trading-Regelprüfung, Support,
        Sicherheit, Missbrauchserkennung und Erfüllung rechtlicher Pflichten.
      </P>

      <H3>12.4 Rechtsgrundlagen</H3>
      <UL>
        <LI>
          Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung und vorvertragliche
          Maßnahmen),
        </LI>
        <LI>
          Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtungen, u. a.
          AML/Compliance),
        </LI>
        <LI>
          Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen, u. a. Sicherheit,
          Betrugsprävention),
        </LI>
        <LI>
          ggf. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), soweit einschlägig.
        </LI>
      </UL>

      <H3>12.5 Empfänger / Auftragsverarbeiter</H3>
      <P>
        Zahlungsdienstleister (Stripe, Validopay) und die Trading-Plattform (MT5)
        sowie technische Dienstleister, soweit für die genannten Zwecke
        erforderlich. Datenübermittlungen erfolgen auf Grundlage der jeweils
        einschlägigen Rechtsgrundlagen und Garantien.
      </P>

      <H3>12.6 Speicherdauer</H3>
      <P>
        Daten werden gespeichert, solange dies für die genannten Zwecke
        erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
      </P>

      <H3>12.7 Betroffenenrechte</H3>
      <P>
        Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
        Datenübertragbarkeit, Widerspruch sowie das Recht auf Beschwerde bei
        einer Aufsichtsbehörde.
      </P>

      <H3>12.8 Kontakt</H3>
      <P>Anfragen zum Datenschutz: info@safunded.com.</P>
    </LegalShell>
  );
}
