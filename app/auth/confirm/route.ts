import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /auth/confirm
 * Bestätigt die E-Mail-Adresse anhand des token_hash aus der Bestätigungs-Mail
 * (verifyOtp). Danach wird der Nutzer zum Checkout des bei der Registrierung
 * gewählten Kontos geführt (falls vorhanden), sonst zum Dashboard.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      // Ein bei der Registrierung gewähltes Konto direkt zum Checkout führen.
      let destination = next ?? "/dashboard";
      if (!next) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const plan = user?.user_metadata?.plan as string | undefined;
        if (plan) {
          destination = `/checkout?plan=${encodeURIComponent(plan)}`;
        }
      }
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  // Bei fehlenden/ungültigen Parametern zur Anmeldung mit Fehlerhinweis.
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", "confirm");
  return NextResponse.redirect(loginUrl);
}
