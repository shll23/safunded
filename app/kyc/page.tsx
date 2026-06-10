import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { P } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "KYC / Verification Policy — SAFunded",
};

export default function KycPage() {
  return (
    <LegalShell title="KYC / Verification Policy">
      <P>
        (1) SAFunded kann insbesondere vor einer Auszahlung sowie bei
        Auffälligkeiten eine Identitäts- und Compliance-Prüfung verlangen. (2)
        Angefordert werden können Identitätsdokumente, Adressnachweise,
        Zahlungsnachweise, Herkunftsnachweise und weitere Informationen. (3)
        Name des Traders, des Account-Inhabers, des Zahlenden und des
        Auszahlungsempfängers müssen übereinstimmen. (4) Drittzahlungen können
        abgelehnt werden. (5) Falsche Angaben führen zur Sperrung. (6) Ohne
        erfolgreiche KYC- und Compliance-Prüfung erfolgt keine Auszahlung. (7)
        SAFunded kann Payouts zurückhalten, solange Daten fehlen oder Risiken
        bestehen.
      </P>
    </LegalShell>
  );
}
