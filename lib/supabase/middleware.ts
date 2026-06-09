import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Frischt die Supabase-Session bei jeder Anfrage auf und schützt den
 * /dashboard-Bereich. Nicht eingeloggte Besucher werden zur Anmeldung
 * (/login) umgeleitet.
 *
 * Wird aus der Root-Datei middleware.ts heraus aufgerufen.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // WICHTIG: getUser() direkt nach dem Erstellen des Clients aufrufen, um die
  // Session zuverlässig aufzufrischen. Kein Code zwischen createServerClient
  // und getUser() einfügen.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Geschützter Bereich: /dashboard nur für eingeloggte Nutzer.
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectedFrom", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
