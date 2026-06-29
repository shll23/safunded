import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/payouts") {
    const hasPayoutsAccess =
      request.cookies.get("safunded_payouts_access")?.value === "granted";

    if (!hasPayoutsAccess) {
      const url = request.nextUrl.clone();
      url.pathname = "/payouts-password";
      url.searchParams.set("from", "/payouts");
      return NextResponse.redirect(url);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Auf alle Pfade anwenden, außer:
     * - _next/static (statische Dateien)
     * - _next/image (Bildoptimierung)
     * - favicon.ico
     * - gängige Bild-/Asset-Dateiendungen
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
