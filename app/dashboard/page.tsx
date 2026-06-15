import { redirect } from "next/navigation";
import { Logo } from "@/components/Header";
import DashboardClient, {
  type DashboardAccount,
  type PlanTile,
} from "@/components/DashboardClient";
import { createClient } from "@/lib/supabase/server";
import { readAccounts } from "@/lib/compliance";
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
  const accounts = readAccounts(user.user_metadata) as DashboardAccount[];
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
