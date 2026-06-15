import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendSupportContactEmail } from "@/lib/email";

/**
 * POST /api/support/contact
 * Body: { email: string, message: string, transcript?: {role, content}[] }
 *
 * Forwards a support-contact request to the SAFunded support inbox using the
 * existing SMTP mailer (lib/email.ts → sendSupportContactEmail). Sent when the
 * bot hands over to a human (needs_human) or the customer clicks "send to
 * support". If the customer is logged in, their user id and account e-mail are
 * attached for context. The customer always gets the 24-hour confirmation back.
 *
 * ENV (server-side only):
 *   SUPPORT_EMAIL  (optional, default "support@safunded.com")
 *   plus the existing SMTP_* variables used by the order/agreement mails.
 */

export const runtime = "nodejs";

const MAX_TRANSCRIPT_MESSAGES = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface TranscriptItem {
  role: "user" | "assistant";
  content: string;
}

function sanitizeTranscript(input: unknown): TranscriptItem[] {
  if (!Array.isArray(input)) return [];
  const out: TranscriptItem[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role === "user" || role === "assistant") && typeof content === "string") {
      const text = content.trim();
      if (text) out.push({ role, content: text.slice(0, 2000) });
    }
  }
  return out.slice(-MAX_TRANSCRIPT_MESSAGES);
}

export async function POST(req: Request) {
  let body: { email?: unknown; message?: unknown; transcript?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  // Attach the logged-in customer's identity for context, if available.
  let userId: string | null = null;
  let accountEmail: string | null = null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
      accountEmail = user.email ?? null;
    }
  } catch {
    // Not logged in / no session — fine, the form still works.
  }

  try {
    const sent = await sendSupportContactEmail({
      email,
      message,
      transcript: sanitizeTranscript(body.transcript),
      receivedAt: new Date().toISOString(),
      userId,
      accountEmail,
    });
    if (!sent) {
      console.error("[support/contact] SMTP not configured — mail not sent.");
      return NextResponse.json({ error: "mail_unavailable" }, { status: 503 });
    }
  } catch (err) {
    console.error("[support/contact] Failed to send support mail:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
