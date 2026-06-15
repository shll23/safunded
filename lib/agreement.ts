// lib/agreement.ts
// Zentrale Konfiguration des aktuell gueltigen Kundenvertrags.
// Beim Aendern des Vertrags: neue Version + neuen PDF-Hash hier eintragen.
// (Hash neu berechnen mit:  sha256sum SAFunded-Customer-Agreement-vX.Y.pdf )

export const CURRENT_AGREEMENT = {
  type: "customer_agreement",
  version: "1.0",
  // SHA-256 des exakt gehosteten PDFs (SAFunded-Customer-Agreement-v1.0.pdf):
  sha256: "8bd276a2ca73097042fa6bc5e929228f13dfa9831be824068db789c5898bd286",
  // Oeffentlich erreichbare, unveraenderliche URL des Vertrags-PDFs:
  pdfUrl: "https://safunded.com/legal/SAFunded-Customer-Agreement-v1.0.pdf",
  // Anzeigetext fuer die Checkbox:
  labelDe: "Ich habe den SAFunded-Kundenvertrag (v1.0) gelesen und stimme ihm zu.",
  labelEn: "I have read and agree to the SAFunded Customer Agreement (v1.0).",
} as const;

export type AgreementConfig = typeof CURRENT_AGREEMENT;
