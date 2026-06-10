import nodemailer from "nodemailer";
import { widerrufHtml, widerrufPlainText } from "@/lib/widerruf";

/**
 * Server-side order-confirmation e-mail (durable medium per § 312f BGB).
 *
 * Sent automatically after every successful purchase (Stripe
 * `checkout.session.completed` and Confirmo `paid`/`confirmed`). It contains the
 * order data, the full Widerrufsbelehrung (identical to /widerruf), the
 * documented consent sentence, and links to the binding legal pages.
 *
 * SMTP credentials come from environment variables only — never hardcode them:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD (secret), and optionally
 *   SMTP_FROM / SMTP_FROM_NAME.
 */

export interface OrderConfirmationParams {
  /** Customer e-mail address. */
  to: string;
  /** Purchased product, e.g. "Instant Funded 50K". */
  productName: string;
  /** Formatted price, e.g. "$399". */
  price: string;
  /** Human-readable order date/time. */
  orderDate: string;
  /** Payment-provider order / invoice id. */
  orderId: string;
  /** Customer account id (Supabase user id). */
  accountId: string;
  /** ISO timestamp of the consent given at checkout, if available. */
  consentAcceptedAt?: string;
  /** Version of the legal texts the customer accepted, if available. */
  termsVersion?: string;
  /** Which gateway processed the payment. */
  provider: "stripe" | "confirmo";
}

const SUBJECT =
  "Deine Bestellung bei SAFunded – Bestätigung & Widerrufsbelehrung";

function getAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "https://safunded.com"
  );
}

/** Builds the nodemailer transport from environment variables. */
function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    console.error(
      "[SAFunded] SMTP is not fully configured (need SMTP_HOST, SMTP_USER, SMTP_PASSWORD). Confirmation e-mail skipped."
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    // Port 465 → implicit TLS (SSL); 587 → STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });
}

/** Renders the consent-documentation sentence for the given timestamp. */
function consentSentence(consentAcceptedAt?: string): string {
  const stamp = consentAcceptedAt ?? "—";
  return (
    "Du hast vor dem Kauf ausdrücklich zugestimmt, dass SAFunded mit der " +
    "Bereitstellung der digitalen Leistung sofort beginnt, und bestätigt, dass " +
    "dein Widerrufsrecht mit vollständiger Vertragserfüllung erlischt " +
    `(Zustimmung erteilt am: ${stamp}).`
  );
}

function buildText(p: OrderConfirmationParams): string {
  const appUrl = getAppUrl();
  return [
    "Vielen Dank für deine Bestellung bei SAFunded.",
    "",
    "Bestelldaten",
    "------------",
    `Produkt:      ${p.productName}`,
    `Preis:        ${p.price}`,
    `Datum/Uhrzeit: ${p.orderDate}`,
    `Bestell-ID:   ${p.orderId}`,
    `Account-ID:   ${p.accountId}`,
    p.termsVersion ? `Textversion:  ${p.termsVersion}` : "",
    "",
    consentSentence(p.consentAcceptedAt),
    "",
    "Rechtliche Dokumente:",
    `AGB:            ${appUrl}/agb`,
    `Risikohinweise: ${appUrl}/risikohinweise`,
    `Refund Policy:  ${appUrl}/refund-policy`,
    `Widerruf:       ${appUrl}/widerruf`,
    "",
    "========================================",
    "",
    widerrufPlainText(),
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function buildHtml(p: OrderConfirmationParams): string {
  const appUrl = getAppUrl();
  const cell =
    "padding:4px 0;font-size:14px;color:#1f2937;line-height:1.6;";
  const label = `${cell}font-weight:600;color:#0f172a;white-space:nowrap;padding-right:16px;`;

  const rows = [
    ["Produkt", p.productName],
    ["Preis", p.price],
    ["Datum/Uhrzeit", p.orderDate],
    ["Bestell-ID", p.orderId],
    ["Account-ID", p.accountId],
    ...(p.termsVersion ? [["Textversion", p.termsVersion]] : []),
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="${label}">${k}</td><td style="${cell}">${v}</td></tr>`
    )
    .join("");

  const linkStyle = "color:#059669;text-decoration:underline;";

  return `<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#f3f4f6;">
  <div style="max-width:640px;margin:0 auto;padding:24px;font-family:Arial,Helvetica,sans-serif;">
    <div style="background:#ffffff;border-radius:12px;padding:28px;border:1px solid #e5e7eb;">
      <h1 style="margin:0 0 8px;font-size:20px;color:#0f172a;">SAFunded – Bestellbestätigung</h1>
      <p style="margin:0 0 20px;font-size:14px;color:#374151;line-height:1.6;">Vielen Dank für deine Bestellung bei SAFunded. Im Folgenden findest du deine Bestelldaten sowie deine Widerrufsbelehrung auf dauerhaftem Datenträger.</p>

      <h2 style="margin:0 0 8px;font-size:16px;color:#0f172a;">Bestelldaten</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:20px;">${rows}</table>

      <p style="margin:0 0 20px;padding:12px 14px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;font-size:13px;color:#065f46;line-height:1.6;">${consentSentence(
        p.consentAcceptedAt
      )}</p>

      <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6;">
        <a href="${appUrl}/agb" style="${linkStyle}">AGB</a> &nbsp;·&nbsp;
        <a href="${appUrl}/risikohinweise" style="${linkStyle}">Risikohinweise</a> &nbsp;·&nbsp;
        <a href="${appUrl}/refund-policy" style="${linkStyle}">Refund Policy</a> &nbsp;·&nbsp;
        <a href="${appUrl}/widerruf" style="${linkStyle}">Widerrufsbelehrung</a>
      </p>

      <hr style="border:none;border-top:2px solid #e5e7eb;margin:8px 0 20px;">

      ${widerrufHtml()}
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends the order-confirmation e-mail. Returns `true` if the message was
 * dispatched, `false` if SMTP is not configured. Throws on transport errors so
 * the caller can decide whether to retry.
 */
export async function sendOrderConfirmationEmail(
  params: OrderConfirmationParams
): Promise<boolean> {
  const transport = createTransport();
  if (!transport) return false;

  const fromName = process.env.SMTP_FROM_NAME ?? "SAFunded";
  const fromAddress =
    process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "info@safunded.com";

  await transport.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to: params.to,
    subject: SUBJECT,
    text: buildText(params),
    html: buildHtml(params),
  });

  return true;
}
