import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { H3, P, B } from "@/components/legal/typography";

export const metadata: Metadata = {
  title: "Trading Rules — SAFunded",
};

export default function TradingRulesPage() {
  return (
    <LegalShell title="Trading Rules">
      <H3>5.1 Geltung</H3>
      <P>
        Diese Trading Rules gelten für alle simulierten Accounts auf SAFunded
        und ergänzen die AGB.
      </P>

      <H3>5.2 Handelsplattform und Zeiten</H3>
      <P>
        (1) Es wird MT5 (MetaTrader 5) genutzt. (2) Maßgebliche tägliche Reset-/
        Bezugszeit ist UTC+2 (Berlin-Prag-Zeit).
      </P>

      <H3>5.3 Erlaubte Instrumente</H3>
      <P>
        (1) Grundsätzlich handelbar sind Forex, Edelmetalle (insbesondere Gold),
        Indizes sowie weitere über MT5 verfügbare und von SAFunded freigegebene
        CFDs oder instrumentenähnliche Produkte. (2){" "}
        <B>Einzelaktien sind nicht handelbar.</B> (3) SAFunded kann handelbare
        Instrumente je nach Account-Modell, Plattform, Risiko- oder technischen
        Gründen einschränken.
      </P>

      <H3>5.4 Leverage</H3>
      <P>
        (1) Der Standard-Hebel beträgt <B>1:100</B>. (2) SAFunded kann je nach
        Instrument, Account-Modell, Risikoklasse oder Marktbedingungen
        abweichende Hebel anwenden und den Hebel aus Risiko-, Fairness-,
        technischen oder regulatorischen Gründen anpassen. (3) Ein höherer Hebel
        erhöht das Risiko von Drawdown-Verstößen.
      </P>

      <H3>5.5 Weekend Trading</H3>
      <P>
        (1) Weekend Trading ist grundsätzlich erlaubt; Positionen dürfen über das
        Wochenende gehalten werden. (2) Der Trader trägt das Risiko von Gaps,
        Slippage, Spread-Ausweitungen, reduzierter Liquidität, Marktöffnungen
        und außergewöhnlichen Marktbedingungen. (3) SAFunded kann einzelne
        Instrumente, Zeiträume oder Marktbedingungen aus technischen,
        regulatorischen, Risiko- oder Fairness-Gründen einschränken.
      </P>

      <H3>5.6 Overnight Holding</H3>
      <P>
        (1) Overnight Holding ist erlaubt; Positionen dürfen über Nacht gehalten
        werden. (2) Der Trader bleibt verantwortlich für Swaps, Spreads, Gaps,
        Slippage und Drawdown-Risiken. (3) Overnight-Positionen werden
        vollständig in die Drawdown- und Risikoüberwachung einbezogen.
      </P>

      <H3>5.7 News Trading</H3>
      <P>
        (1) Innerhalb eines Fensters von <B>5 Minuten vor und 5 Minuten nach</B>{" "}
        relevanten High-Impact-News dürfen Positionen weder eröffnet noch
        geschlossen noch verändert werden, soweit SAFunded die jeweilige
        Nachricht als relevant definiert. (2) SAFunded bestimmt High-Impact-News
        anhand anerkannter Wirtschaftskalender, interner Risikobewertung und/oder
        Plattformdaten. (3) Verstöße können zur Disqualifikation,
        Payout-Ablehnung oder Account-Beendigung führen.
      </P>

      <H3>5.8 Verbotene und eingeschränkte Strategien</H3>
      <P>
        Scalping, Martingale, Grid und Hedging sind verboten; EAs/Bots sind nur
        nach Approval erlaubt; Copy Trading ist unter den Bedingungen des
        Abschnitts 11 erlaubt. Im Übrigen gilt der Abschnitt „Prohibited Trading
        Practices".
      </P>
    </LegalShell>
  );
}
