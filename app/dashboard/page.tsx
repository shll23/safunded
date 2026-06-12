import { redirect } from "next/navigation";
import { Logo } from "@/components/Header";
import TrackingWidget from "@/components/TrackingWidget";
import { createClient } from "@/lib/supabase/server";
import { readAccountState } from "@/lib/compliance";

export const metadata = {
  title: "Dashboard — SAFunded",
};

function formatActivatedAt(iso: string | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
    timeZone: "Europe/Berlin",
  }).format(date);
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Zusätzliche Absicherung neben der Middleware.
  if (!user) {
    redirect("/login");
  }

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? null;
  const selectedPlan = (user.user_metadata?.plan as string | undefined) ?? null;

  // Echter Account-Status aus den nach dem Kauf gespeicherten Feldern (gleiche
  // Supabase-Auth-User-ID, die der Webhook beim Kauf verknüpft).
  const account = readAccountState(user.user_metadata);
  const accountActive = account.status === "active";
  const activatedAt = formatActivatedAt(account.activatedAt);

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between">
          <Logo />
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
            >
              Abmelden
            </button>
          </form>
        </header>

        <section className="mt-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-faint">
            Dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
            Willkommen{fullName ? `, ${fullName}` : ""}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Angemeldet als <span className="text-white">{user.email}</span>
          </p>
        </section>

        {/*
          Wenn ein aktiver Account existiert: echten DB-Status zeigen
          (Account-Größe, Status, Account-ID). Sonst der bisherige Zustand
          „Noch kein aktiver Account". Keine erfundenen Trading-Zahlen.
        */}
        {accountActive ? (
          <>
            <section className="mt-10 rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/[0.06] to-transparent p-8 shadow-glow sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15">
                <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Status: Aktiv
              </span>
            </div>

            <h2 className="mt-5 font-display text-xl font-semibold text-white">
              {account.planName ?? "Dein Account ist aktiv"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Dein Account ist freigeschaltet. Die untenstehenden Angaben spiegeln
              den aktuellen Status deines Accounts wider.
            </p>

            <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-2">
              {account.accountSize ? (
                <div className="bg-ink/40 p-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                    Account-Größe
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold text-white">
                    {account.accountSize}
                  </dd>
                </div>
              ) : null}
              {account.amountPaid && account.amountPaid !== "—" ? (
                <div className="bg-ink/40 p-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                    Gezahlter Betrag
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-semibold text-white">
                    {account.amountPaid}
                  </dd>
                </div>
              ) : null}
              <div className="bg-ink/40 p-5">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                  Status
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-accent">
                  Aktiv
                </dd>
              </div>
              {account.accountId ? (
                <div className="bg-ink/40 p-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                    Account-ID
                  </dt>
                  <dd className="mt-1.5 break-all font-mono text-sm text-white">
                    {account.accountId}
                  </dd>
                </div>
              ) : null}
              {activatedAt ? (
                <div className="bg-ink/40 p-5">
                  <dt className="text-xs font-medium uppercase tracking-[0.16em] text-faint">
                    Freigeschaltet am
                  </dt>
                  <dd className="mt-1.5 text-sm text-white">{activatedAt}</dd>
                </div>
              ) : null}
            </dl>
          </section>

          {/*
            Live-Tracking-Widget — nur wenn der Admin einen tracking_token
            hinterlegt hat. Ohne Token ändert sich nichts an der Anzeige.
          */}
          {account.trackingToken ? (
            <div className="mt-6">
              <TrackingWidget token={account.trackingToken} />
            </div>
          ) : null}
          </>
        ) : (
          /* Ehrlicher Zustand: aktuell ist noch kein aktives Konto verknüpft. */
          <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white/5">
              <svg className="h-6 w-6 text-faint" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-white">
              Noch kein aktiver Account
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Dein Konto ist registriert, aber es ist noch kein aktives Trading-Konto
              hinterlegt. Sobald dein Konto bereitgestellt ist, erscheinen hier dein
              Kontostand, deine Risikolimits und deine Belohnungsberechtigung.
              {selectedPlan
                ? ` Du hast bei der Registrierung das ${selectedPlan.toUpperCase()}-Konto ausgewählt.`
                : ""}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {selectedPlan ? (
                <a
                  href={`/checkout?plan=${encodeURIComponent(selectedPlan)}`}
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright"
                >
                  Kauf abschließen
                </a>
              ) : (
                <a
                  href="/#accounts"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright"
                >
                  Konten ansehen
                </a>
              )}
              <a
                href="/#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
              >
                So funktioniert’s
              </a>
            </div>
          </section>
        )}

        <p className="mt-6 text-xs text-faint">
          Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben.
          Auszahlungen sind nicht garantiert. Trading ist mit Risiken verbunden.
        </p>
      </div>
    </main>
  );
}
