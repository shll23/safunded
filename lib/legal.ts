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

import type { Language } from "@/lib/translations";

/**
 * Version identifier of the legal texts the customer accepts at checkout.
 * Stored alongside the consent timestamp as a compliance record.
 * Matches the "Stand: Juni 2026" of the source documents — bump this whenever
 * the binding texts (AGB, Risk Disclosure, Refund Policy, …) change.
 */
export const TERMS_VERSION = "2026-06";

/** Human-readable "as of" label shown on every legal page (German / English). */
export const LEGAL_AS_OF = "Juni 2026";
export const LEGAL_AS_OF_EN = "June 2026";

/**
 * Courtesy-translation notice shown on every English legal page. The German
 * documents remain the legally binding originals (see also the English AGB and
 * the German Impressum / Widerrufsbelehrung / Datenschutzerklärung).
 */
export const COURTESY_NOTICE_EN =
  "This is a courtesy translation. The German version is the legally binding version; in case of any discrepancy, the German text prevails.";

export interface LegalLink {
  /** Route slug without leading slash, e.g. "agb". */
  slug: string;
  /** German route path, e.g. "/agb". */
  href: string;
  /** German footer / navigation label. */
  label: string;
  /** English footer / navigation label. */
  labelEn: string;
}

/**
 * All legal pages, in the footer navigation order taken from section 16 of the
 * source document ("Legal-Seiten-Struktur für die Website"). The German routes
 * live at "/<slug>", the English courtesy translations at "/en/<slug>".
 */
export const legalLinks: LegalLink[] = [
  { slug: "impressum", href: "/impressum", label: "Impressum", labelEn: "Legal Notice (Impressum)" },
  { slug: "agb", href: "/agb", label: "Allgemeine Geschäftsbedingungen (AGB)", labelEn: "Terms & Conditions (AGB)" },
  { slug: "trading-rules", href: "/trading-rules", label: "Trading Rules", labelEn: "Trading Rules" },
  { slug: "instant-funded-account-rules", href: "/instant-funded-account-rules", label: "Instant Funded Account Rules", labelEn: "Instant Funded Account Rules" },
  { slug: "payout-policy", href: "/payout-policy", label: "Payout Policy", labelEn: "Payout Policy" },
  { slug: "refund-policy", href: "/refund-policy", label: "Refund Policy", labelEn: "Refund Policy" },
  { slug: "risikohinweise", href: "/risikohinweise", label: "Risk Disclosure / Risikohinweise", labelEn: "Risk Disclosure" },
  { slug: "kyc", href: "/kyc", label: "KYC / Verification Policy", labelEn: "KYC / Verification Policy" },
  { slug: "aml", href: "/aml", label: "AML & Anti-Fraud Policy", labelEn: "AML & Anti-Fraud Policy" },
  { slug: "prohibited-trading-practices", href: "/prohibited-trading-practices", label: "Prohibited Trading Practices", labelEn: "Prohibited Trading Practices" },
  { slug: "datenschutz", href: "/datenschutz", label: "Datenschutzerklärung", labelEn: "Privacy Policy" },
  { slug: "widerruf", href: "/widerruf", label: "Widerrufsbelehrung", labelEn: "Right of Withdrawal" },
];

/** Slugs of all legal pages, used to detect locale-routed legal URLs. */
const LEGAL_SLUGS = new Set(legalLinks.map((l) => l.slug));

/**
 * Detects whether `pathname` is a (German or English) legal page and returns
 * its locale + slug, or `null` otherwise. German legal pages live at
 * "/<slug>", their English courtesy translations at "/en/<slug>".
 */
export function legalLocaleFromPath(
  pathname: string | null | undefined
): { lang: Language; slug: string } | null {
  if (!pathname) return null;
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (parts[0] === "en") {
    const slug = parts[1];
    return slug && LEGAL_SLUGS.has(slug) ? { lang: "en", slug } : null;
  }
  const slug = parts[0];
  return slug && LEGAL_SLUGS.has(slug) ? { lang: "de", slug } : null;
}

/**
 * Reciprocal `hreflang` alternates for a legal page, so the German original and
 * the English courtesy translation are linked for search engines.
 */
export function legalAlternates(slug: string) {
  return {
    languages: {
      de: `/${slug}`,
      en: `/en/${slug}`,
      "x-default": `/${slug}`,
    },
  };
}

/**
 * Short website-footer disclaimer — verbatim from section 15
 * ("Website-Footer-Version (Kurz)") of the source document.
 */
export const footerDisclaimer =
  "SAFunded ist eine Marke von AB Digital Management (Alex Taino Blass), Hauptstraße 6, 72622 Nürtingen, Deutschland. SAFunded bietet digitale, simulierte Prop-Trading-Programme. Es findet kein Handel mit echtem Kapital statt; angezeigte Beträge sind simulierte Referenzwerte. Belohnungen sind leistungsabhängig, bedingt und nicht garantiert. Keine Anlageberatung, keine Finanzberatung, keine Vermögensverwaltung, kein Investmentprodukt, keine garantierte Rendite. Trading ist mit Risiken verbunden. Es gelten die AGB, Trading Rules, Payout Policy, Refund Policy, Risk Disclosure, KYC Policy, AML-Policy und Datenschutzerklärung.";

/**
 * English courtesy translation of the short website-footer disclaimer. The
 * compliance-critical formulations are preserved verbatim: "simulated capital",
 * "rewards are performance-based, conditional and not guaranteed" and "trading
 * involves risk".
 */
export const footerDisclaimerEn =
  "SAFunded is a brand of AB Digital Management (Alex Taino Blass), Hauptstraße 6, 72622 Nürtingen, Germany. SAFunded offers digital, simulated prop-trading programs. No trading with real capital takes place; displayed amounts are simulated reference values. Rewards are performance-based, conditional and not guaranteed. No investment advice, no financial advice, no asset management, no investment product, no guaranteed returns. Trading involves risk. The General Terms & Conditions (AGB), Trading Rules, Payout Policy, Refund Policy, Risk Disclosure, KYC Policy, AML Policy and Privacy Policy apply.";
