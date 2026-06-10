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
  /** Customer name for the greeting, if available. */
  customerName?: string;
  /** Purchased product, e.g. "Instant Funded 50K". */
  productName: string;
  /** Simulated account size, e.g. "$50,000". */
  accountSize?: string;
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

/** Escapes a value for safe inclusion in HTML attribute/text contexts. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(p: OrderConfirmationParams): string {
  const appUrl = getAppUrl();
  const dashboardUrl = `${appUrl}/dashboard`;
  const agbUrl = `${appUrl}/agb`;
  const widerrufUrl = `${appUrl}/widerruf`;
  const datenschutzUrl = `${appUrl}/datenschutz`;
  const impressumUrl = `${appUrl}/impressum`;

  const greetingName = p.customerName ? ` ${esc(p.customerName)}` : "";
  const productName = esc(p.productName);
  const accountSize = esc(p.accountSize ?? "—");
  const price = esc(p.price);
  const orderDate = esc(p.orderDate);
  const orderId = esc(p.orderId);
  const accountId = esc(p.accountId);
  const consentTimestamp = esc(p.consentAcceptedAt ?? "—");
  const termsVersion = esc(p.termsVersion ?? "—");

  return `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <title>Bestellbestätigung – SAFunded</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
    body { margin:0; padding:0; width:100% !important; background:#070B16; }
    table { border-collapse:collapse; }
    img { border:0; line-height:100%; outline:none; text-decoration:none; }
    a { color:#2DD4A7; }
    .body-font { font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif; }
    @media only screen and (max-width:600px) {
      .container { width:100% !important; }
      .px { padding-left:24px !important; padding-right:24px !important; }
      .stack { display:block !important; width:100% !important; }
      .stack-pad { padding-top:14px !important; }
    }
  </style>
</head>
<body class="body-font" style="margin:0; padding:0; background:#070B16;">

  <!-- Preheader (hidden) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#070B16; font-size:1px; line-height:1px;">
    Zahlung bestätigt – deine Bestellung bei SAFunded. Bestellübersicht, Account-Status und Widerrufsbelehrung.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#070B16" style="background:#070B16;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Container -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px;">

          <!-- Logo -->
          <tr>
            <td class="px" style="padding:8px 40px 28px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:14px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="44" height="44" align="center" valign="middle" bgcolor="#2DD4A7"
                            style="width:44px; height:44px; background:#2DD4A7; border-radius:12px; color:#070B16; font-weight:800; font-size:18px; font-family:'Poppins',Arial,sans-serif;">
                          SA
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td valign="middle" style="font-size:22px; font-weight:600; color:#EDF1F7; font-family:'Poppins',Arial,sans-serif;">
                    SA<span style="color:#2DD4A7;">Funded</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td class="px" style="padding:0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0F1628"
                     style="background:#0F1628; border:1px solid #263048; border-radius:20px;">
                <tr>
                  <td style="padding:36px 36px 28px 36px;">
                    <!-- check badge -->
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48" height="48" align="center" valign="middle" bgcolor="#0E2A24"
                            style="width:48px; height:48px; background:#0E2A24; border:1px solid #2DD4A7; border-radius:50%; color:#2DD4A7; font-size:24px; font-weight:700;">
                          &#10003;
                        </td>
                      </tr>
                    </table>
                    <h1 style="margin:20px 0 6px 0; font-size:26px; line-height:1.25; font-weight:700; color:#EDF1F7; font-family:'Poppins',Arial,sans-serif;">
                      Zahlung bestätigt
                    </h1>
                    <p style="margin:0 0 4px 0; font-size:15px; line-height:1.6; color:#8C96A8;">
                      Hallo${greetingName}, vielen Dank für deine Bestellung. Dein Account ist freigeschaltet.
                    </p>
                  </td>
                </tr>

                <!-- gold divider -->
                <tr><td style="padding:0 36px;"><div style="height:2px; width:80px; background:#CBA35C; line-height:2px; font-size:0;">&nbsp;</div></td></tr>

                <!-- Order summary -->
                <tr>
                  <td style="padding:24px 36px 8px 36px;">
                    <p style="margin:0 0 16px 0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#8C96A8;">Bestellübersicht</p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="stack" width="50%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8C96A8;">Produkt</p>
                          <p style="margin:0; font-size:17px; font-weight:600; color:#EDF1F7;">${productName}</p>
                        </td>
                        <td class="stack stack-pad" width="50%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8C96A8;">Betrag</p>
                          <p style="margin:0; font-size:17px; font-weight:600; color:#2DD4A7;">${price}</p>
                        </td>
                      </tr>
                      <tr>
                        <td class="stack" width="50%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8C96A8;">Account-Größe</p>
                          <p style="margin:0; font-size:17px; font-weight:600; color:#EDF1F7;">${accountSize}</p>
                        </td>
                        <td class="stack stack-pad" width="50%" valign="top" style="padding-bottom:18px;">
                          <p style="margin:0 0 4px 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8C96A8;">Datum</p>
                          <p style="margin:0; font-size:17px; font-weight:600; color:#EDF1F7;">${orderDate}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:6px 0 0 0; border-top:1px solid #263048;">
                          <p style="margin:14px 0 4px 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8C96A8;">Bestell-ID</p>
                          <p style="margin:0 0 14px 0; font-size:13px; font-family:'JetBrains Mono',Consolas,monospace; color:#EDF1F7;">${orderId}</p>
                          <p style="margin:0 0 4px 0; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#8C96A8;">Account-ID</p>
                          <p style="margin:0; font-size:13px; font-family:'JetBrains Mono',Consolas,monospace; color:#EDF1F7;">${accountId}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA button -->
                <tr>
                  <td style="padding:24px 36px 36px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#2DD4A7" style="border-radius:999px;">
                          <a href="${dashboardUrl}" target="_blank"
                             style="display:inline-block; padding:15px 34px; font-size:15px; font-weight:600; color:#070B16; text-decoration:none; font-family:'Poppins',Arial,sans-serif;">
                            Zum Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Consent box -->
          <tr>
            <td class="px" style="padding:18px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0C1322"
                     style="background:#0C1322; border:1px solid #263048; border-radius:16px;">
                <tr>
                  <td style="padding:22px 26px;">
                    <p style="margin:0 0 8px 0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#2DD4A7;">Deine Einwilligungen</p>
                    <p style="margin:0 0 10px 0; font-size:13px; line-height:1.7; color:#A6B0C2;">
                      Du hast am <strong style="color:#EDF1F7;">${consentTimestamp}</strong> bestätigt:
                    </p>
                    <p style="margin:0 0 8px 0; font-size:13px; line-height:1.7; color:#A6B0C2;">
                      &#8226; AGB, Risikohinweise und Refund-Policy gelesen und akzeptiert.<br>
                      &#8226; Ausdrücklicher Wunsch nach sofortigem Leistungsbeginn und Kenntnisnahme, dass das Widerrufsrecht mit vollständiger Vertragserfüllung erlischt.
                    </p>
                    <p style="margin:10px 0 0 0; font-size:12px; color:#8C96A8;">Version der Bedingungen: ${termsVersion}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Widerrufsbelehrung -->
          <tr>
            <td class="px" style="padding:18px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#0C1322"
                     style="background:#0C1322; border:1px solid #263048; border-radius:16px;">
                <tr>
                  <td style="padding:22px 26px;">
                    <p style="margin:0 0 12px 0; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#8C96A8;">Widerrufsbelehrung</p>
                    <div style="font-size:12px; line-height:1.75; color:#8C96A8;">
                      ${widerrufHtml("dark")}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px" style="padding:28px 40px 8px 40px;">
              <div style="height:1px; background:#263048; line-height:1px; font-size:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:16px 40px 40px 40px;">
              <p style="margin:0 0 10px 0; font-size:12px; line-height:1.7; color:#8C96A8;">
                <strong style="color:#A6B0C2;">AB Digital Management</strong><br>
                Alex Taino Blass &middot; Hauptstraße 6 &middot; 72622 Nürtingen &middot; Deutschland<br>
                <a href="mailto:info@safunded.com" style="color:#2DD4A7; text-decoration:none;">info@safunded.com</a>
              </p>
              <p style="margin:0 0 14px 0; font-size:12px; line-height:1.7;">
                <a href="${agbUrl}" style="color:#8C96A8; text-decoration:underline;">AGB</a> &nbsp;&middot;&nbsp;
                <a href="${widerrufUrl}" style="color:#8C96A8; text-decoration:underline;">Widerruf</a> &nbsp;&middot;&nbsp;
                <a href="${datenschutzUrl}" style="color:#8C96A8; text-decoration:underline;">Datenschutz</a> &nbsp;&middot;&nbsp;
                <a href="${impressumUrl}" style="color:#8C96A8; text-decoration:underline;">Impressum</a>
              </p>
              <p style="margin:0; font-size:11px; line-height:1.7; color:#5E6678;">
                Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben. Belohnungen sind leistungsabhängig, bedingt und nicht garantiert und unterliegen den Regeln und AGB. Trading ist mit Risiken verbunden.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
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
