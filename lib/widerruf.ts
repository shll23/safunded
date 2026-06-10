/**
 * ============================================================================
 *  SAFunded — WIDERRUFSBELEHRUNG (single source of truth)
 * ============================================================================
 *  The full, verbatim text of the Widerrufsbelehrung lives here exactly once so
 *  that the public page (/widerruf) and the order-confirmation e-mail always
 *  show the identical wording (§ 312f BGB requires the same text on a durable
 *  medium after the purchase).
 *
 *  - The page renders `WIDERRUF_META` + `WIDERRUF_BLOCKS` as styled JSX.
 *  - The e-mail renders the same data via `widerrufPlainText()` /
 *    `widerrufHtml()`.
 *
 *  Do NOT paraphrase the text below — it is the binding legal wording.
 * ============================================================================
 */

export const WIDERRUF_TITLE = "Widerrufsbelehrung";

/** Operator / imprint key–value lines shown at the top of the document. */
export const WIDERRUF_META: { label: string; value: string }[] = [
  {
    label: "Betreiber",
    value: "AB Digital Management, vertreten durch Alex Taino Blass",
  },
  { label: "Marke / Plattform", value: "SAFunded" },
  { label: "Anschrift", value: "Hauptstraße 6, 72622 Nürtingen, Deutschland" },
  { label: "E-Mail", value: "info@safunded.com" },
  { label: "Stand", value: "Juni 2026" },
];

/** A single contact/address block, rendered as plain stacked lines. */
const CONTACT_LINES = [
  "AB Digital Management",
  "Alex Taino Blass",
  "Hauptstraße 6",
  "72622 Nürtingen",
  "Deutschland",
  "E-Mail: info@safunded.com",
];

export type WiderrufBlock =
  | { t: "note"; text: string }
  | { t: "hr" }
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "lines"; lines: string[] }
  | { t: "ol"; items: string[] }
  | { t: "blank" }
  | { t: "fields"; items: string[] }
  | { t: "footer"; text: string };

/**
 * The complete Widerrufsbelehrung as ordered content blocks — verbatim from
 * the provided source document (incl. "Vorzeitiges Erlöschen des
 * Widerrufsrechts" and the "Muster-Widerrufsformular").
 */
export const WIDERRUF_BLOCKS: WiderrufBlock[] = [
  {
    t: "note",
    text:
      "Hinweis: Dieser Text ist eine professionelle Vorarbeit auf Basis des gesetzlichen Musters und stellt keine Rechtsberatung dar. Er sollte vor dem Einsatz von einer zur Rechtsberatung befugten Person geprüft und – je nach Einordnung der Leistung als „digitaler Inhalt” oder „digitale Dienstleistung” – final angepasst werden.",
  },
  { t: "hr" },

  { t: "h2", text: "Widerrufsrecht" },
  {
    t: "p",
    text:
      "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.",
  },
  {
    t: "p",
    text:
      "Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.",
  },
  { t: "p", text: "Um Ihr Widerrufsrecht auszuüben, müssen Sie uns" },
  { t: "lines", lines: CONTACT_LINES },
  {
    t: "p",
    text:
      "mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das unten stehende Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.",
  },
  {
    t: "p",
    text:
      "Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.",
  },
  { t: "hr" },

  { t: "h2", text: "Folgen des Widerrufs" },
  {
    t: "p",
    text:
      "Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.",
  },
  {
    t: "p",
    text:
      "Haben Sie verlangt, dass die Dienstleistung während der Widerrufsfrist beginnen soll, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.",
  },
  { t: "hr" },

  { t: "h2", text: "Vorzeitiges Erlöschen des Widerrufsrechts" },
  {
    t: "p",
    text:
      "Das Widerrufsrecht erlischt bei einem Vertrag über die Erbringung von Dienstleistungen vorzeitig, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.",
  },
  {
    t: "p",
    text:
      "Handelt es sich um die Bereitstellung von nicht auf einem körperlichen Datenträger befindlichen digitalen Inhalten, erlischt Ihr Widerrufsrecht zudem, wenn wir mit der Ausführung des Vertrags begonnen haben, nachdem Sie",
  },
  {
    t: "ol",
    items: [
      "ausdrücklich zugestimmt haben, dass wir mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnen, und",
      "Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung des Vertrags Ihr Widerrufsrecht verlieren, und",
      "wir Ihnen eine Bestätigung gemäß § 312f BGB zur Verfügung gestellt haben.",
    ],
  },
  {
    t: "p",
    text:
      "Diese Zustimmung und Bestätigung erteilen Sie im Bestellvorgang aktiv vor Abschluss des Kaufs.",
  },
  { t: "hr" },

  { t: "h2", text: "Muster-Widerrufsformular" },
  {
    t: "p",
    text:
      "(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)",
  },
  { t: "p", text: "An:" },
  { t: "lines", lines: CONTACT_LINES },
  {
    t: "p",
    text:
      "Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:",
  },
  { t: "blank" },
  {
    t: "fields",
    items: [
      "Bestellt am (*) / erhalten am (*): ____________________",
      "Name des/der Verbraucher(s): ____________________",
      "Anschrift des/der Verbraucher(s): ____________________",
      "Datum: ____________________",
      "Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ____________________",
    ],
  },
  { t: "p", text: "(*) Unzutreffendes streichen." },
  { t: "hr" },

  {
    t: "footer",
    text:
      "Ende der Widerrufsbelehrung. Vor produktivem Einsatz anwaltlich prüfen lassen.",
  },
];

/** Escape a string for safe inclusion in HTML. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Renders the Widerrufsbelehrung as a plain-text document (durable-medium copy
 * for the e-mail body / text part).
 */
export function widerrufPlainText(): string {
  const out: string[] = [];
  out.push(WIDERRUF_TITLE.toUpperCase());
  out.push("");
  for (const m of WIDERRUF_META) out.push(`${m.label}: ${m.value}`);
  out.push("");

  for (const b of WIDERRUF_BLOCKS) {
    switch (b.t) {
      case "note":
        out.push(b.text, "");
        break;
      case "hr":
        out.push("----------------------------------------", "");
        break;
      case "h2":
        out.push(b.text.toUpperCase(), "");
        break;
      case "p":
        out.push(b.text, "");
        break;
      case "lines":
        out.push(...b.lines, "");
        break;
      case "ol":
        b.items.forEach((it, i) => out.push(`${i + 1}. ${it}`));
        out.push("");
        break;
      case "blank":
        out.push("___________________________________________", "");
        break;
      case "fields":
        b.items.forEach((it) => out.push(`- ${it}`));
        out.push("");
        break;
      case "footer":
        out.push(b.text, "");
        break;
    }
  }
  return out.join("\n").trim() + "\n";
}

/**
 * Renders the Widerrufsbelehrung as an HTML fragment (durable-medium copy for
 * the e-mail HTML part). Inline styles only, for broad e-mail-client support.
 */
export function widerrufHtml(): string {
  const p = "margin:0 0 12px;line-height:1.6;color:#1f2937;font-size:14px;";
  const h2 = "margin:24px 0 10px;font-size:16px;color:#0f172a;";
  const parts: string[] = [];

  parts.push(
    `<h2 style="margin:0 0 12px;font-size:18px;color:#0f172a;">${escapeHtml(
      WIDERRUF_TITLE
    )}</h2>`
  );
  parts.push(
    `<p style="${p}">` +
      WIDERRUF_META.map(
        (m) =>
          `<strong>${escapeHtml(m.label)}:</strong> ${escapeHtml(m.value)}`
      ).join("<br>") +
      `</p>`
  );

  for (const b of WIDERRUF_BLOCKS) {
    switch (b.t) {
      case "note":
        parts.push(
          `<p style="${p}font-style:italic;color:#6b7280;">${escapeHtml(
            b.text
          )}</p>`
        );
        break;
      case "hr":
        parts.push(
          `<hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">`
        );
        break;
      case "h2":
        parts.push(`<h3 style="${h2}">${escapeHtml(b.text)}</h3>`);
        break;
      case "p":
        parts.push(`<p style="${p}">${escapeHtml(b.text)}</p>`);
        break;
      case "lines":
        parts.push(
          `<p style="${p}">${b.lines.map(escapeHtml).join("<br>")}</p>`
        );
        break;
      case "ol":
        parts.push(
          `<ol style="margin:0 0 12px;padding-left:20px;color:#1f2937;font-size:14px;line-height:1.6;">${b.items
            .map((it) => `<li>${escapeHtml(it)}</li>`)
            .join("")}</ol>`
        );
        break;
      case "blank":
        parts.push(
          `<p style="${p}">___________________________________________</p>`
        );
        break;
      case "fields":
        parts.push(
          `<ul style="margin:0 0 12px;padding-left:20px;color:#1f2937;font-size:14px;line-height:1.6;">${b.items
            .map((it) => `<li>${escapeHtml(it)}</li>`)
            .join("")}</ul>`
        );
        break;
      case "footer":
        parts.push(
          `<p style="${p}font-style:italic;color:#6b7280;">${escapeHtml(
            b.text
          )}</p>`
        );
        break;
    }
  }
  return parts.join("\n");
}
