import { redirect } from "next/navigation";
import { Logo } from "@/components/Header";
import DashboardClient, {
  type DashboardAccount,
  type PlanTile,
} from "@/components/DashboardClient";
import { createClient } from "@/lib/supabase/server";
import { readAccounts } from "@/lib/compliance";
import { fetchCredentials } from "@/lib/credentials";
import { plans } from "@/lib/plans";

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

  // Alle Konten des Users aus dem accounts[]-Array (Mehrkonten-Modell). Stripe-
  // und Krypto-Käufe hängen je ein Konto an; die Stammdaten bleiben oben.
  const baseAccounts = readAccounts(user.user_metadata);

  // MT5-Zugangsdaten werden serverseitig über denselben Kunden-Token wie die
  // Live-Stats geholt (safcheck.de). So bleibt der Token – und vor allem das
  // Master-Passwort – aus dem Browser heraus; nur die fertigen Werte gehen an
  // den Client. Schlägt ein Abruf fehl, bleibt das Konto einfach ohne Daten.
  const accounts: DashboardAccount[] = await Promise.all(
    baseAccounts.map(async (acc) => {
      if (!acc.tracking_token) return acc as DashboardAccount;
      const creds = await fetchCredentials(acc.tracking_token);
      if (!creds || !creds.hasCredentials) {
        return { ...acc, has_credentials: false } as DashboardAccount;
      }
      return {
        ...acc,
        has_credentials: true,
        mt5_login: creds.login,
        mt5_password: creds.password,
        mt5_server: creds.server,
      } as DashboardAccount;
    })
  );

  const count = accounts.length;
  const countLabel = count === 1 ? "1 Konto" : `${count} Konten`;

  const planTiles: PlanTile[] = plans.map((p) => ({
    id: p.id,
    name: p.name,
    simulatedCapital: p.simulatedCapital,
    price: p.price,
    launchPrice: p.launchPrice,
  }));

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
            Angemeldet als <span className="text-white">{user.email}</span> ·{" "}
            {countLabel}
          </p>
        </section>

        <DashboardClient
          accounts={accounts}
          plans={planTiles}
        />

        <p className="mt-10 text-xs text-faint">
          Alle Trading-Konten sind simuliert, sofern nicht ausdrücklich anders angegeben.
          Auszahlungen sind nicht garantiert. Trading ist mit Risiken verbunden.
        </p>
      </div>
    </main>
  );
}
