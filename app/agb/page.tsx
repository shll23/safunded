import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB) — SAFunded",
};

export default function AgbPage() {
  return (
    <LegalShell title="Allgemeine Geschäftsbedingungen (AGB)">
      <H3>1. Anbieter und Geltungsbereich</H3>
      <P>
        (1) Anbieter ist AB Digital Management, vertreten durch Alex Taino
        Blass, Hauptstraße 6, 72622 Nürtingen, Deutschland (nachfolgend
        „SAFunded"). (2) Diese AGB gelten für alle über die Plattform SAFunded
        (safunded.com) angebotenen Leistungen und für das Vertragsverhältnis
        zwischen SAFunded und dem Nutzer. (3) Abweichenden Bedingungen des
        Nutzers wird widersprochen.
      </P>

      <H3>2. Definitionen</H3>
      <P>
        „Plattform" bezeichnet die Website und die digitalen Dienste von
        SAFunded. „Account" bezeichnet einen simulierten Trading-Account auf
        MT5. „Instant Funded Account" bezeichnet ein Programm, bei dem nach
        Erwerb unmittelbar ein simulierter Account mit definiertem Referenzwert
        bereitgestellt wird. „Account-Referenzwert" bezeichnet den der
        Berechnung von Verlust- und Gewinngrenzen zugrunde liegenden Wert des
        jeweiligen Account-Modells. „Payout/Belohnung" bezeichnet eine mögliche
        leistungsabhängige Zahlung nach erfolgreicher Erfüllung aller
        Voraussetzungen. „Reset-Zeit" bezeichnet die tägliche Bezugszeit UTC+2
        (Berlin-Prag-Zeit).
      </P>

      <H3>3. Beschreibung der Leistungen</H3>
      <P>
        (1) SAFunded bietet digitale Prop-Trading-Programme, simulierte
        Trading-Accounts, Trader-Dashboards, Performance-Regeln, Account-Zugänge
        und Instant-Funded-Account-Modelle an. (2) Aktuell angeboten werden u.
        a. die Account-Modelle 25k, 50k und 100k Instant Funded Account.
        SAFunded kann weitere Account-Modelle einführen.
      </P>

      <H3>4. Simuliertes Trading und digitale Dienstleistung</H3>
      <P>
        (1) Sämtliches Trading auf SAFunded findet in einer{" "}
        <B>simulierten Umgebung</B> statt. Es wird kein echtes Kapital des
        Nutzers eingezahlt, gehalten oder gehandelt. Angezeigte Kontostände sind
        fiktive Referenzwerte zur Leistungsmessung und stellen keine Einlage,
        kein Guthaben und kein Handelskapital dar. (2) Der Nutzer erwirbt eine
        digitale Dienstleistung in Form des Zugangs zu Software, Simulation und
        damit verbundenen Auswertungs- und Programmleistungen.
      </P>

      <H3>
        5. Keine Anlageberatung, keine Finanzberatung, keine Vermögensverwaltung
      </H3>
      <P>
        SAFunded erbringt <B>keine</B> Anlageberatung, Finanzberatung,
        Vermögensverwaltung, kein Einlagengeschäft und bietet kein
        Investmentprodukt an. SAFunded fordert nicht zum Handel mit echtem
        Kapital auf. Es bestehen keine Gewinngarantien.
      </P>

      <H3>6. Registrierung und Account-Erstellung</H3>
      <P>
        (1) Für die Nutzung ist eine Registrierung mit zutreffenden,
        vollständigen Angaben erforderlich. (2) Der Nutzer hat seine Zugangsdaten
        geheim zu halten. (3) Pro Person ist nur die nach den Regeln zulässige
        Zahl an Accounts gestattet.
      </P>

      <H3>7. Mindestalter und Geschäftsfähigkeit</H3>
      <P>
        Die Nutzung setzt Volljährigkeit (mindestens 18 Jahre) und
        unbeschränkte Geschäftsfähigkeit voraus.
      </P>

      <H3>8. Restricted Countries</H3>
      <P>
        Nutzer aus oder mit Aufenthalt in{" "}
        <B>Ukraine, Iran, Israel und Afghanistan</B> dürfen keine Accounts
        eröffnen oder nutzen. SAFunded kann diese Liste aus rechtlichen,
        regulatorischen, AML-, sanktions-, zahlungsanbieter- oder risikobezogenen
        Gründen erweitern und Registrierungen, Käufe, Accounts sowie
        Auszahlungen entsprechend ablehnen.
      </P>

      <H3>9. Pflichten des Nutzers</H3>
      <P>
        Der Nutzer verpflichtet sich, zutreffende Angaben zu machen, die Regeln
        einzuhalten, keine verbotenen Handelspraktiken anzuwenden, keine
        Mehrfach- oder Identitätsmissbräuche zu begehen und geltendes Recht zu
        beachten.
      </P>

      <H3>10. Zahlungsbedingungen (Stripe und Confirmo)</H3>
      <P>
        (1) Zahlungen erfolgen über Stripe und Confirmo. (2) Zahlungen müssen vom
        rechtmäßigen Konto- bzw. Karteninhaber stammen; Drittzahlungen können
        abgelehnt oder geprüft werden. (3) Chargeback-Missbrauch und
        Zahlungsbetrug sind verboten und führen zur Sperrung. (4) Bei
        Zahlungsstreitigkeiten kann SAFunded Accounts pausieren oder sperren. (5)
        Rückerstattungen richten sich nach der Refund Policy.
      </P>

      <H3>11. Bereitstellung digitaler Leistungen</H3>
      <P>
        Die digitale Leistung (Account-Zugang) wird nach erfolgreichem
        Zahlungseingang bereitgestellt, regelmäßig unmittelbar bzw. zeitnah.
      </P>

      <H3>12. Widerrufsrecht bei digitalen Leistungen</H3>
      <P>
        Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu.
        Über dessen Voraussetzungen, Fristen und Folgen wird gesondert in der
        Widerrufsbelehrung informiert.
      </P>

      <H3>13. Erlöschen des Widerrufsrechts</H3>
      <P>
        Bei digitalen Inhalten/Dienstleistungen erlischt das Widerrufsrecht,
        wenn SAFunded mit der Ausführung begonnen hat, nachdem der Verbraucher
        ausdrücklich zugestimmt hat, dass mit der Ausführung vor Ablauf der
        Widerrufsfrist begonnen wird, und der Verbraucher seine Kenntnis davon
        bestätigt hat, dass er durch seine Zustimmung das Widerrufsrecht
        verliert, soweit dies gesetzlich zulässig ist.
      </P>

      <H3>14. Refund Policy</H3>
      <P>
        Es gilt ergänzend die Refund Policy (siehe Abschnitt 8 dieses
        Dokuments).
      </P>

      <H3>15.–28. Trading- und Payout-Regeln</H3>
      <P>
        Es gelten die Trading Rules (Abschnitt 5), die Instant Funded Account
        Rules (Abschnitt 6) und die Payout Policy (Abschnitt 7) dieses
        Dokuments, insbesondere: Maximum Daily Loss 5 %, Maximum Loss/Overall
        Drawdown 10 %, erlaubtes Weekend Trading und Overnight Holding mit
        eigenem Risiko, News-Trading-Beschränkung im 5-Minuten-Fenster,
        Scalping-Verbot, Martingale-/Grid-Verbot, Copy Trading erlaubt ohne
        Hedging, EAs/Bots nur nach Approval, Payout frühestens nach 14
        Kalendertagen, mindestens 3 profitable Tage mit jeweils mindestens 1 %
        des Account-Referenzwertes, Profit Split 80 % zugunsten des Traders sowie
        Payout-Bearbeitung innerhalb von 24 Stunden nach erfolgreicher Prüfung.
      </P>

      <H3>29. AML-/Anti-Fraud-Prüfung</H3>
      <P>Es gilt die AML- &amp; Anti-Fraud-Policy (Abschnitt 3).</P>

      <H3>30. KYC vor Auszahlung</H3>
      <P>
        Eine Auszahlung setzt eine erfolgreiche KYC- und Compliance-Prüfung
        voraus (Abschnitt 10).
      </P>

      <H3>31. Verbotene Handelspraktiken</H3>
      <P>
        Es gilt der Abschnitt „Prohibited Trading Practices" (Abschnitt 11).
      </P>

      <H3>32. Account-Sperrung und Beendigung</H3>
      <P>
        SAFunded kann Accounts bei Regelverstößen, Missbrauch, falschen Angaben,
        Betrugs- oder AML-Risiken pausieren, sperren, disqualifizieren oder
        beenden.
      </P>

      <H3>33. Payout-Ablehnung bei Regelverstoß</H3>
      <P>
        Bei Regelverstoß, Manipulation, falschen Angaben oder Missbrauch besteht
        kein Anspruch auf Auszahlung.
      </P>

      <H3>34. Zahlungsbetrug und Chargebacks</H3>
      <P>
        Zahlungsbetrug und Chargeback-Missbrauch führen zur sofortigen Sperrung
        und können Schadensersatzansprüche auslösen.
      </P>

      <H3>35. Haftungsbeschränkung</H3>
      <P>
        (1) SAFunded haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit
        sowie bei der Verletzung von Leben, Körper und Gesundheit. (2) Bei leicht
        fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung
        auf den vertragstypischen, vorhersehbaren Schaden begrenzt. (3) Im
        Übrigen ist die Haftung ausgeschlossen, soweit gesetzlich zulässig.
      </P>

      <H3>36. Verfügbarkeit der Plattform</H3>
      <P>
        Ein ununterbrochener Betrieb wird nicht geschuldet. Wartungen,
        Störungen, höhere Gewalt oder Maßnahmen Dritter können die Verfügbarkeit
        einschränken.
      </P>

      <H3>37. Änderungen der Regeln und Dienste</H3>
      <P>
        SAFunded kann Regeln, Instrumente, Hebel, Account-Modelle und Dienste aus
        sachlichen Gründen (Risiko, Fairness, Technik, Recht) anpassen.
        Wesentliche Änderungen werden in geeigneter Weise mitgeteilt.
      </P>

      <H3>38. Kommunikation per E-Mail</H3>
      <P>
        Die Kommunikation erfolgt vorrangig per E-Mail. Der Nutzer hält eine
        gültige E-Mail-Adresse vor.
      </P>

      <H3>39. Geistiges Eigentum</H3>
      <P>
        Alle Rechte an Plattform, Inhalten, Marken und Software verbleiben bei
        SAFunded bzw. den Rechteinhabern.
      </P>

      <H3>40. Datenschutz</H3>
      <P>Es gilt die Datenschutzerklärung (Abschnitt 12).</P>

      <H3>41. Anwendbares Recht</H3>
      <P>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Zwingende
        Verbraucherschutzvorschriften des Aufenthaltsstaates des Verbrauchers
        bleiben unberührt.
      </P>

      <H3>42. Gerichtsstand</H3>
      <P>
        Soweit zulässig ist Gerichtsstand der Sitz von SAFunded. Zwingende
        gesetzliche Gerichtsstände bleiben unberührt.
      </P>

      <H3>43. Salvatorische Klausel</H3>
      <P>
        Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der
        übrigen Bestimmungen unberührt.
      </P>

      <H3>44. Schlussbestimmungen</H3>
      <P>
        Mündliche Nebenabreden bestehen nicht. Änderungen bedürfen der Textform.
      </P>
    </LegalShell>
  );
}
