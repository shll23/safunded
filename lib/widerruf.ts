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
];

/**
 * ----------------------------------------------------------------------------
 *  ENGLISH COURTESY TRANSLATION (for the /en/widerruf page only)
 * ----------------------------------------------------------------------------
 *  The German Widerrufsbelehrung above is the legally binding version. The
 *  data below is a 1:1 courtesy translation used solely for display on the
 *  English legal page. The order-confirmation e-mail keeps using the German
 *  binding text (widerrufPlainText / widerrufHtml).
 */

export const WIDERRUF_TITLE_EN = "Right of Withdrawal";

/** English operator / imprint key–value lines. */
export const WIDERRUF_META_EN: { label: string; value: string }[] = [
  {
    label: "Operator",
    value: "AB Digital Management, represented by Alex Taino Blass",
  },
  { label: "Brand / Platform", value: "SAFunded" },
  { label: "Address", value: "Hauptstraße 6, 72622 Nürtingen, Germany" },
  { label: "Email", value: "info@safunded.com" },
  { label: "As of", value: "June 2026" },
];

const CONTACT_LINES_EN = [
  "AB Digital Management",
  "Alex Taino Blass",
  "Hauptstraße 6",
  "72622 Nürtingen",
  "Germany",
  "Email: info@safunded.com",
];

/** The complete Right of Withdrawal as ordered content blocks (English). */
export const WIDERRUF_BLOCKS_EN: WiderrufBlock[] = [
  { t: "h2", text: "Right of Withdrawal" },
  {
    t: "p",
    text:
      "You have the right to withdraw from this contract within fourteen days without giving any reason.",
  },
  {
    t: "p",
    text:
      "The withdrawal period is fourteen days from the day of conclusion of the contract.",
  },
  { t: "p", text: "To exercise your right of withdrawal, you must inform us" },
  { t: "lines", lines: CONTACT_LINES_EN },
  {
    t: "p",
    text:
      "by means of a clear declaration (e.g. a letter sent by post or an email) of your decision to withdraw from this contract. You may use the model withdrawal form below for this purpose, but it is not mandatory.",
  },
  {
    t: "p",
    text:
      "To meet the withdrawal deadline, it is sufficient for you to send your notification concerning the exercise of the right of withdrawal before the withdrawal period has expired.",
  },
  { t: "hr" },

  { t: "h2", text: "Consequences of Withdrawal" },
  {
    t: "p",
    text:
      "If you withdraw from this contract, we shall reimburse to you all payments received from you without undue delay and no later than fourteen days from the day on which we receive notification of your withdrawal from this contract. For this reimbursement, we will use the same means of payment that you used for the original transaction, unless expressly agreed otherwise with you; in no case will you be charged any fees because of this reimbursement.",
  },
  {
    t: "p",
    text:
      "If you have requested that the service should begin during the withdrawal period, you shall pay us a reasonable amount corresponding to the proportion of the services already provided up to the point in time at which you notify us of the exercise of the right of withdrawal with regard to this contract compared with the total scope of the services provided for in the contract.",
  },
  { t: "hr" },

  { t: "h2", text: "Early Expiry of the Right of Withdrawal" },
  {
    t: "p",
    text:
      "In the case of a contract for the provision of services, the right of withdrawal expires early if we have provided the service in full and only began performing the service after you gave your express consent and at the same time confirmed your knowledge that you lose your right of withdrawal upon complete performance of the contract by us.",
  },
  {
    t: "p",
    text:
      "In the case of the supply of digital content not on a tangible medium, your right of withdrawal also expires if we have begun performing the contract after you have",
  },
  {
    t: "ol",
    items: [
      "expressly consented to us beginning the performance of the contract before the expiry of the withdrawal period, and",
      "confirmed your knowledge that by giving your consent you lose your right of withdrawal upon commencement of the performance of the contract, and",
      "we have provided you with a confirmation in accordance with § 312f BGB (German Civil Code).",
    ],
  },
  {
    t: "p",
    text:
      "You give this consent and confirmation actively during the order process before completing the purchase.",
  },
  { t: "hr" },

  { t: "h2", text: "Model Withdrawal Form" },
  {
    t: "p",
    text:
      "(If you want to withdraw from the contract, please complete this form and return it.)",
  },
  { t: "p", text: "To:" },
  { t: "lines", lines: CONTACT_LINES_EN },
  {
    t: "p",
    text:
      "I/we (*) hereby withdraw from the contract concluded by me/us (*) for the provision of the following service:",
  },
  { t: "blank" },
  {
    t: "fields",
    items: [
      "Ordered on (*) / received on (*): ____________________",
      "Name of consumer(s): ____________________",
      "Address of consumer(s): ____________________",
      "Date: ____________________",
      "Signature of consumer(s) (only for notification on paper): ____________________",
    ],
  },
  { t: "p", text: "(*) Delete as appropriate." },
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

/** Colour theme for the e-mail HTML fragment. */
export type WiderrufTheme = "light" | "dark";

interface WiderrufPalette {
  /** Body / paragraph text. */
  text: string;
  /** Headings. */
  heading: string;
  /** Muted text (note + footer). */
  muted: string;
  /** Horizontal-rule / divider colour. */
  hr: string;
}

/**
 * Palettes for the two render targets. `light` matches the previous default
 * (dark text on a white card); `dark` matches the branded confirmation e-mail
 * (light text on a dark navy container). Only colours differ between the two —
 * the wording is identical (single source of truth above).
 */
const WIDERRUF_PALETTES: Record<WiderrufTheme, WiderrufPalette> = {
  light: { text: "#1f2937", heading: "#0f172a", muted: "#6b7280", hr: "#e5e7eb" },
  dark: { text: "#A6B0C2", heading: "#EDF1F7", muted: "#8C96A8", hr: "#263048" },
};

/**
 * Renders the Widerrufsbelehrung as an HTML fragment (durable-medium copy for
 * the e-mail HTML part). Inline styles only, for broad e-mail-client support.
 * Pass `theme` to colour the text for a light or dark container; the wording is
 * unchanged in both cases.
 */
export function widerrufHtml(theme: WiderrufTheme = "light"): string {
  const c = WIDERRUF_PALETTES[theme];
  const p = `margin:0 0 12px;line-height:1.6;color:${c.text};font-size:14px;`;
  const h2 = `margin:24px 0 10px;font-size:16px;color:${c.heading};`;
  const parts: string[] = [];

  parts.push(
    `<h2 style="margin:0 0 12px;font-size:18px;color:${c.heading};">${escapeHtml(
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
          `<p style="${p}font-style:italic;color:${c.muted};">${escapeHtml(
            b.text
          )}</p>`
        );
        break;
      case "hr":
        parts.push(
          `<hr style="border:none;border-top:1px solid ${c.hr};margin:20px 0;">`
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
          `<ol style="margin:0 0 12px;padding-left:20px;color:${c.text};font-size:14px;line-height:1.6;">${b.items
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
          `<ul style="margin:0 0 12px;padding-left:20px;color:${c.text};font-size:14px;line-height:1.6;">${b.items
            .map((it) => `<li>${escapeHtml(it)}</li>`)
            .join("")}</ul>`
        );
        break;
      case "footer":
        parts.push(
          `<p style="${p}font-style:italic;color:${c.muted};">${escapeHtml(
            b.text
          )}</p>`
        );
        break;
    }
  }
  return parts.join("\n");
}
