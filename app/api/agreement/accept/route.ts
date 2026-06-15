// app/api/agreement/accept/route.ts
// Nimmt die Vertrags-Zustimmung des eingeloggten Kunden entgegen und
// schreibt einen unveraenderlichen Audit-Eintrag in public.agreement_acceptances.
//
// Ablauf:
//  1. Access-Token aus dem Authorization-Header pruefen -> User ermitteln.
//  2. Client-IP + User-Agent erfassen (Netlify-Header beachten).
//  3. Idempotent einfuegen (unique index user+type+version -> kein Doppeleintrag).
//  4. Bestaetigungs-Mail mit PDF-Link + Zustimmungsdaten senden.
//
// Benoetigte ENV (server-seitig, bereits fuer /api/provision vorhanden):
//   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CURRENT_AGREEMENT } from "@/lib/agreement";
import { sendAgreementCopy } from "@/lib/email"; // siehe Hinweis unten

export const runtime = "nodejs";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

function clientIp(req: NextRequest): string | null {
  // Netlify setzt die echte Client-IP hier:
  const nf = req.headers.get("x-nf-client-connection-ip");
  if (nf) return nf;
  // Fallback: erste IP aus x-forwarded-for
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // 1) User aus dem Bearer-Token verifizieren
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
    }
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    }
    const user = userData.user;

    // 2) Kontext erfassen
    const ip = clientIp(req);
    const userAgent = req.headers.get("user-agent");

    // 3) Idempotent speichern (kein Doppeleintrag dank unique index)
    const { error: insErr } = await admin
      .from("agreement_acceptances")
      .upsert(
        {
          user_id: user.id,
          email: user.email,
          agreement_type: CURRENT_AGREEMENT.type,
          agreement_version: CURRENT_AGREEMENT.version,
          agreement_sha256: CURRENT_AGREEMENT.sha256,
          ip,
          user_agent: userAgent,
          pdf_url: CURRENT_AGREEMENT.pdfUrl,
        },
        {
          onConflict: "user_id,agreement_type,agreement_version",
          ignoreDuplicates: true,
        }
      );
    if (insErr) {
      console.error("agreement insert failed:", insErr);
      return NextResponse.json({ error: "store_failed" }, { status: 500 });
    }

    // 4) Bestaetigungs-Mail (best effort, blockiert die Antwort nicht hart)
    try {
      if (user.email) {
        await sendAgreementCopy(user.email, {
          name: (user.user_metadata?.full_name as string) || user.email,
          version: CURRENT_AGREEMENT.version,
          pdfUrl: CURRENT_AGREEMENT.pdfUrl,
          acceptedAt: new Date().toISOString(),
          ip,
        });
      }
    } catch (mailErr) {
      console.error("agreement email failed (non-fatal):", mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("accept route error:", e);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
