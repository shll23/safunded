import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H2, P, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Impressum — SAFunded",
};

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <P>
        <B>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</B>
      </P>
      <P>
        SaFunded UG (i.G)
        <br />
        Marbachweg 1
        <br />
        72622 Nürtingen
        <br />
        Deutschland
      </P>

      <H2>Kontakt</H2>
      <P>E-Mail: info@safunded.com</P>

      <H2>Rechtsform</H2>
      <P>Unternehmergesellschaft (haftungsbeschränkt) in Gründung.</P>

      <H2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H2>
      <P>
        SaFunded UG (i.G)
        <br />
        Marbachweg 1
        <br />
        72622 Nürtingen
        <br />
        Deutschland
      </P>

      <H2>EU-Streitschlichtung</H2>
      <P>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:
        https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie
        oben in diesem Impressum.
      </P>

      <H2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</H2>
      <P>
        Wir sind nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </P>

      <H2>Haftung für Inhalte</H2>
      <P>
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
        Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
        unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
        der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
        entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </P>

      <H2>Haftung für Links</H2>
      <P>
        Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter,
        auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
        diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden
        wir derartige Links umgehend entfernen.
      </P>

      <H2>Urheberrecht</H2>
      <P>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Beiträge Dritter sind als solche
        gekennzeichnet.
      </P>
    </LegalShell>
  );
}
