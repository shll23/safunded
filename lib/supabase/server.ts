import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-Client für die Verwendung auf dem Server (Server-Komponenten,
 * Route Handler, Server Actions). Synchronisiert die Session über Cookies.
 *
 * Hinweis: In Server-Komponenten kann `setAll` fehlschlagen, da Cookies dort
 * nicht gesetzt werden dürfen. Das ist unkritisch, solange die Middleware die
 * Session auffrischt (siehe lib/supabase/middleware.ts).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Aufruf aus einer Server-Komponente — kann ignoriert werden,
            // wenn die Middleware die Sessions auffrischt.
          }
        },
      },
    }
  );
}
