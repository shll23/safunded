import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PayoutsPasswordForm from "@/components/PayoutsPasswordForm";

export default function PayoutsPasswordPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
          <div className="absolute inset-0 bg-grid opacity-[0.14]" />
        </div>

        <section className="mx-auto flex max-w-3xl flex-col px-5 pb-24 sm:px-8">
          <div className="glass rounded-2xl border border-white/10 p-6 shadow-card sm:p-8">
            <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Admin-Bereich
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Auszahlungen sind passwortgeschützt
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Dieser Bereich ist nur für berechtigte Administratoren freigegeben.
              Bitte gib das Passwort ein, um die Auszahlungsseite zu öffnen.
            </p>

            <PayoutsPasswordForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
