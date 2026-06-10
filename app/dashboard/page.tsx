import { redirect } from "next/navigation";
import { Logo } from "@/components/Header";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard — SAFunded",
};

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

        {/* Ehrlicher Zustand: aktuell ist noch kein aktives Konto verknüpft. */}
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

        <p className="mt-6 text-xs text-faint">
          Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben.
          Auszahlungen sind nicht garantiert. Trading ist mit Risiken verbunden.
        </p>
      </div>
    </main>
  );
}
