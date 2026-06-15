/**
 * ============================================================================
 *  SAFunded — SUPPORT KNOWLEDGE BASE (Wissensbasis für den Support-Bot)
 * ============================================================================
 *  Single source of truth for the support assistant. The bot answers
 *  EXCLUSIVELY from the text exported below — it never invents facts. Anything
 *  not unambiguously covered here, and anything account-specific, is handed off
 *  to a human via the contact form.
 *
 *  The content is curated from the public, binding sources already in the repo:
 *    • lib/plans.ts          — plans, trading rules, the full FAQ
 *    • app/agb (§45)         — geographic restrictions / excluded countries
 *    • app/refund-policy     — refund conditions
 *    • app/payout-policy     — payout requirements, profit split, processing
 *    • app/widerruf          — right of withdrawal
 *
 *  HOW TO EXTEND: edit the prose in SUPPORT_KB below (it is reviewer-friendly),
 *  then update the SUPPORT_KB_CONTENTS manifest at the bottom so it stays clear
 *  what knowledge the bot has. Keep figures in sync with lib/plans.ts.
 * ============================================================================
 */

/**
 * The full knowledge base, injected verbatim into the support bot's system
 * prompt. Written in German (the product's primary language); the bot replies
 * in the customer's language (DE/EN).
 */
export const SUPPORT_KB = `
# SAFunded — Support-Wissensbasis

## Über SAFunded
SAFunded bietet Instant-Funded-Trading-Accounts ohne Challenge-Phase an. Nach
dem Kauf wird unmittelbar ein simulierter MT5-Account mit einem definierten
Account-Referenzwert (25K, 50K oder 100K) bereitgestellt — ohne separate,
mehrstufige Evaluierung. Es wird kein echtes Kapital eingezahlt, gehalten oder
gehandelt; angezeigte Salden sind fiktive Referenzwerte zur Leistungsmessung.
SAFunded bietet keine Anlage- oder Finanzberatung und keine Brokerage-Dienste.
Betreiber: AB Digital Management, Hauptstraße 6, 72622 Nürtingen, Deutschland.
Allgemeine Kontaktadresse: info@safunded.com.

## Account-Größen und Preise (USD, Anzeige)
- Instant Funded 25K — simuliertes Kapital $25.000 — regulär $249 (Launch-Preis $161,85).
- Instant Funded 50K — simuliertes Kapital $50.000 — regulär $399 (Launch-Preis $259,35). Beliebteste Größe.
- Instant Funded 100K — simuliertes Kapital $100.000 — regulär $699 (Launch-Preis $454,35).
Launch-Aktion: 35 % Rabatt mit dem Code LAUNCH35. Preise werden in USD angezeigt.

## Risiko- und Handelsregeln
- Max Daily Loss (maximaler Tagesverlust): 5 % des Account-Referenzwerts.
- Max Overall Loss (maximaler Gesamtverlust / Drawdown): 10 % des Account-Referenzwerts.
- Offene Positionen zählen mit; selbst eine vorübergehende Überschreitung eines Limits gilt als Verstoß.
- Tages-Reset-Zeit: UTC+2 (Berlin-/Prag-Zeit).
- Mindesthandelstage: mindestens 3 aktive Handelstage, bevor eine Auszahlung geprüft werden kann.
- Consistency-Regel: KEINE. SAFunded wendet keine Consistency-Regel an; die Performance wird nicht durch Einzeltag- oder Einzeltrade-Limits gedeckelt.
- Hebel (Leverage): standardmäßig 1:100. SAFunded kann den Hebel je nach Instrument, Account-Modell oder Marktlage anpassen.

## Handelbare Instrumente
Forex, Edelmetalle (insbesondere Gold), Indizes und weitere über MT5 verfügbare
und von SAFunded freigegebene CFDs. Einzelaktien sind nicht handelbar.

## News-, Wochenend- und EA-Regeln
- News-Trading: Innerhalb von 5 Minuten vor und 5 Minuten nach relevanten High-Impact-News dürfen Positionen nicht eröffnet, geschlossen oder verändert werden. Außerhalb dieses Fensters ist News-Trading erlaubt.
- Wochenend-/Overnight-Halten: Erlaubt. Der Trader trägt das Risiko aus Gaps, Slippage, Spread-Ausweitung und Swaps; solche Positionen fließen voll in die Drawdown-Überwachung ein.
- Expert Advisors (EAs) / Bots / Skripte: Nur nach vorheriger Genehmigung erlaubt. SAFunded kann Strategie, Funktionsweise und Risikologik prüfen und eine Genehmigung widerrufen.

## Verbotene Handelspraktiken
Verboten sind u. a. Scalping in missbräuchlicher Form, Martingale, Grid,
Hedging, Latenz- und Tick-Arbitrage, das Ausnutzen von Plattform- oder
Preisfehlern, nicht genehmigte Bots, Multi-Account-Missbrauch sowie das
künstliche Erzeugen profitabler Tage. Copy-Trading ist erlaubt, solange es
transparent, regelkonform und nicht zur Umgehung der Regeln eingesetzt wird.
Die vollständigen, verbindlichen Definitionen stehen in den Trading Rules, den
Prohibited Trading Practices und den AGB.

## Auszahlungen (Payouts) und Profit-Split
- Profit-Split: bis zu 80 % für den Trader / 20 % für SAFunded.
- Voraussetzungen (kumulativ): Einhaltung aller Regeln; Mindestlaufzeit von 14 Kalendertagen; mindestens 3 profitable Handelstage mit je ≥ 1 % Gewinn des Account-Referenzwerts; erfolgreiche KYC-, AML- und Anti-Fraud-Prüfung; vollständige und korrekte Zahlungs-/Auszahlungsdaten.
- Auszahlungszyklus: 2 Wochen (alle zwei Wochen werden berechtigte Auszahlungsanträge bearbeitet).
- Frühestes erstes Auszahlungsfenster: 14 Tage nach dem ersten Trade.
- Bearbeitung: nach vollständiger Einreichung und erfolgreicher Prüfung innerhalb von 24 Stunden. SAFunded erhebt keine zusätzlichen Auszahlungsgebühren; externe Drittgebühren liegen außerhalb der Verantwortung von SAFunded.
- Auszahlungswege: SEPA-Banküberweisung in EUR oder Bitcoin (BTC) in USD.
- Eine Auszahlung ist kein automatischer oder garantierter Anspruch. Bei Regelverstoß, Manipulation oder Falschangaben besteht kein Auszahlungsanspruch. SAFunded kann Auszahlungen bei Regelverstoß, Manipulation, Betrug, AML-Risiken, unvollständigen Angaben oder fehlendem KYC zurückhalten, verweigern oder vertieft prüfen.

## Folgen von Regelverstößen
Ein Regelverstoß kann zu Disqualifikation, Verweigerung einer Auszahlung sowie
zur Sperrung, Schließung oder Kündigung des Accounts führen. In diesen Fällen
besteht kein Auszahlungsanspruch.

## Bezahlung
Account-Größe im Bereich "Accounts" wählen und sicher auschecken. Zahlung über
Stripe (Karte) oder Confirmo (Krypto). SAFunded speichert keine Kartendaten.
Zahlungen müssen vom rechtmäßigen Karten-/Kontoinhaber stammen — Zahlungen
Dritter können abgelehnt werden.

## Account-Zugang
Der Zugang wird nach erfolgreicher Zahlung bereitgestellt — in der Regel sofort
oder kurz danach. Die Onboarding-Daten gehen an die mit dem Kauf verknüpfte
E-Mail-Adresse.

## Wer darf einen Account eröffnen
Voraussetzung sind Volljährigkeit (mindestens 18 Jahre) und unbeschränkte
Geschäftsfähigkeit.

## Länder-Ausschlüsse (geografische Beschränkungen)
Das Angebot richtet sich nicht an Personen mit Wohnsitz/gewöhnlichem Aufenthalt
in oder Staatsangehörigkeit der ausgeschlossenen Länder; Registrierung, Kauf und
Bereitstellung sind für solche Personen ausgeschlossen. Besonders hervorgehoben
sind: Ukraine, Iran, Israel und Afghanistan.
Vollständige Ausschlussliste laut AGB §45:
- Wegen Sanktionen/Embargo (EU/UN) und Geldwäsche-Prävention: Nordkorea, Iran, Syrien, Kuba, Russische Föderation, Belarus, Myanmar, Sudan, Südsudan, Venezuela, Afghanistan und Irak; sowie Krim, Sewastopol und die Regionen Donezk, Cherson, Luhansk und Saporischschja.
- Aus regulatorischen Gründen zusätzlich: USA (inkl. Territorien), Indien, Indonesien, Kasachstan, Kirgisistan, Tadschikistan, Turkmenistan, Usbekistan, Bhutan, Anguilla, Antigua und Barbuda, St. Kitts und Nevis, St. Lucia, St. Vincent und die Grenadinen, Cookinseln und Vanuatu.
SAFunded kann diese Liste aus rechtlichen oder regulatorischen Gründen erweitern.
Geht trotz der Beschränkungen eine Zahlung von einer ausgeschlossenen Person ein,
wird kein Account bereitgestellt; der gezahlte Betrag wird vollständig an den
Zahler zurückerstattet, ein weiterer Leistungsanspruch besteht nicht.

## Widerruf und Rückerstattung
- Verbrauchern steht grundsätzlich ein 14-tägiges Widerrufsrecht ab Vertragsschluss zu.
- Bei digitalen Leistungen erlischt es vorzeitig, wenn der Kunde im Bestellprozess ausdrücklich dem sofortigen Leistungsbeginn zustimmt und bestätigt, dass er dadurch sein Widerrufsrecht verliert.
- Eine Rückerstattung kommt insbesondere in Betracht, wenn die Leistung nicht erbracht wird oder ein von SAFunded zu vertretender Fehler vorliegt.
- Keine Rückerstattung bei Regelverstoß, Betrug oder Chargeback-Missbrauch.
- Sonderfall: Bei einer Zahlung aus einem ausgeschlossenen Land wird kein Account bereitgestellt und der Betrag vollständig zurückerstattet (siehe Länder-Ausschlüsse).

## Rechtliche Dokumente
Die vollständigen, verbindlichen Texte (AGB, Trading Rules, Instant Funded
Account Rules, Payout Policy, Datenschutz, Risikohinweise, Widerrufsbelehrung)
sind im Footer der Website verlinkt.
`.trim();

/**
 * Manifest of what the bot knows — kept in sync with SUPPORT_KB so reviewers
 * can see coverage at a glance and decide what to add next. Purely
 * documentary; not sent to the model.
 */
export const SUPPORT_KB_CONTENTS: string[] = [
  "Was SAFunded ist (Instant-Funded, simuliert, Betreiber/Kontakt)",
  "Account-Größen 25K/50K/100K mit Preisen und LAUNCH35-Rabatt",
  "Risikoregeln: 5 % Max Daily Loss, 10 % Max Overall Loss, UTC+2 Reset",
  "Mindestens 3 Handelstage, keine Consistency-Regel, Hebel 1:100",
  "Handelbare Instrumente (Forex, Gold, Indizes, CFDs; keine Einzelaktien)",
  "News-, Wochenend-/Overnight- und EA-Regeln",
  "Verbotene Handelspraktiken (inkl. Copy-Trading-Ausnahme)",
  "Auszahlungen: bis 80 % Profit-Split, 2-Wochen-Zyklus, 24h-Bearbeitung, SEPA in EUR + BTC in USD",
  "Auszahlungs-Voraussetzungen (KYC/AML, 14 Tage, 3 profitable Tage ≥1 %)",
  "Folgen von Regelverstößen (Disqualifikation/Sperre/keine Auszahlung)",
  "Bezahlung (Stripe/Confirmo, keine Drittzahlungen)",
  "Account-Zugang nach Zahlung / Onboarding per E-Mail",
  "Teilnahmevoraussetzungen (min. 18, Geschäftsfähigkeit)",
  "Länder-Ausschlüsse (kurze Liste + vollständige AGB-§45-Liste)",
  "Widerruf & Rückerstattung inkl. Rückerstattung bei Zahlung aus ausgeschlossenem Land",
  "Hinweis auf die verbindlichen Rechtsdokumente im Footer",
];
