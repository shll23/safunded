/**
 * ============================================================================
 *  SAFunded — LEGAL / COMPLIANCE CONFIG
 * ============================================================================
 *  Central registry for the public legal pages and the compliance metadata
 *  that has to be recorded with every purchase.
 *
 *  The legal page *content* lives verbatim in the individual route files under
 *  `app/<slug>/page.tsx`. This file only holds the navigation registry and the
 *  shared footer disclaimer so they stay in sync across the site.
 * ============================================================================
 */

/**
 * Version identifier of the legal texts the customer accepts at checkout.
 * Stored alongside the consent timestamp as a compliance record.
 * Matches the "Stand: Juni 2026" of the source documents — bump this whenever
 * the binding texts (AGB, Risk Disclosure, Refund Policy, …) change.
 */
export const TERMS_VERSION = "2026-06";

/** Human-readable "as of" label shown on every legal page. */
export const LEGAL_AS_OF = "Juni 2026";

export interface LegalLink {
  /** Route path, e.g. "/agb". */
  href: string;
  /** Footer / navigation label. */
  label: string;
}

/**
 * All legal pages, in the footer navigation order taken from section 16 of the
 * source document ("Legal-Seiten-Struktur für die Website").
 */
export const legalLinks: LegalLink[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/agb", label: "Allgemeine Geschäftsbedingungen (AGB)" },
  { href: "/trading-rules", label: "Trading Rules" },
  { href: "/instant-funded-account-rules", label: "Instant Funded Account Rules" },
  { href: "/payout-policy", label: "Payout Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/risikohinweise", label: "Risk Disclosure / Risikohinweise" },
  { href: "/kyc", label: "KYC / Verification Policy" },
  { href: "/aml", label: "AML & Anti-Fraud Policy" },
  { href: "/prohibited-trading-practices", label: "Prohibited Trading Practices" },
  { href: "/datenschutz", label: "Datenschutzerklärung" },
  { href: "/widerruf", label: "Widerrufsbelehrung" },
];

/**
 * Short website-footer disclaimer — verbatim from section 15
 * ("Website-Footer-Version (Kurz)") of the source document.
 */
export const footerDisclaimer =
  "SAFunded ist eine Marke von AB Digital Management (Alex Taino Blass), Hauptstraße 6, 72622 Nürtingen, Deutschland. SAFunded bietet digitale, simulierte Prop-Trading-Programme. Es findet kein Handel mit echtem Kapital statt; angezeigte Beträge sind simulierte Referenzwerte. Belohnungen sind leistungsabhängig, bedingt und nicht garantiert. Keine Anlageberatung, keine Finanzberatung, keine Vermögensverwaltung, kein Investmentprodukt, keine garantierte Rendite. Trading ist mit Risiken verbunden. Es gelten die AGB, Trading Rules, Payout Policy, Refund Policy, Risk Disclosure, KYC Policy, AML-Policy und Datenschutzerklärung.";
