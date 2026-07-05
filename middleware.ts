import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const SITE_OFFLINE = false;
const OFFLINE_HTML = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>SAFunded ist voruebergehend offline</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #070b16;
        color: #f8fafc;
      }

      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.18), transparent 28rem),
          linear-gradient(135deg, #070b16 0%, #0f172a 100%);
      }

      main {
        width: min(42rem, calc(100% - 3rem));
      }

      p {
        margin: 0;
        color: #cbd5e1;
        font-size: clamp(1rem, 2vw, 1.2rem);
        line-height: 1.7;
      }

      h1 {
        margin: 0 0 1rem;
        font-size: clamp(2.4rem, 8vw, 4.8rem);
        line-height: 0.95;
        letter-spacing: 0;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>SAFunded ist voruebergehend offline.</h1>
      <p>Wir sind bald wieder erreichbar. Vielen Dank fuer Ihr Verstaendnis.</p>
    </main>
  </body>
</html>`;

// Mobile User-Agents get the mobile landing design; everything else the
// desktop design. This is only the first-paint guess — the landing page itself
// re-checks the real screen width and sets the `afunded_view` cookie (below)
// to correct edge cases (narrow desktop windows, tablets, etc.).
const MOBILE_UA =
  /Mobi|Android|iPhone|iPod|Windows Phone|IEMobile|BlackBerry|Opera Mini|webOS/i;

export async function middleware(request: NextRequest) {
  if (SITE_OFFLINE) {
    return new NextResponse(OFFLINE_HTML, {
      status: 503,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store, max-age=0",
        "retry-after": "3600",
      },
    });
  }

  // Landing page: serve the redesigned Mobile or Desktop standalone design by
  // device. A `afunded_view` cookie (set client-side from the real viewport
  // width) always wins; otherwise fall back to a User-Agent guess. This is an
  // internal rewrite, so the URL stays "/". Auth/session, API routes and every
  // other path are untouched and continue to updateSession() below.
  if (request.nextUrl.pathname === "/") {
    const forced = request.cookies.get("afunded_view")?.value;
    const view =
      forced === "mobile" || forced === "desktop"
        ? forced
        : MOBILE_UA.test(request.headers.get("user-agent") ?? "")
          ? "mobile"
          : "desktop";
    const url = request.nextUrl.clone();
    url.pathname = `/landing/${view}.html`;
    return NextResponse.rewrite(url);
  }

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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2|woff|ttf|otf|html)$).*)",
  ],
};
