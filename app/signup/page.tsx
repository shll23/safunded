"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, LanguageToggle } from "@/components/Header";
import { createClient } from "@/lib/supabase/client";
import { getPlan } from "@/lib/plans";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-faint transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40";

function SignupForm() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const plan = planId ? getPlan(planId) : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          full_name: name,
          plan: plan?.id ?? null,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/[0.06] to-transparent p-10 text-center shadow-glow">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15">
          <svg className="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-white">
          Bestätigungs-Mail gesendet
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Wir haben eine Bestätigungs-Mail an <span className="text-white">{email}</span> gesendet.
          Bitte öffne die E-Mail und klicke auf den Bestätigungslink, um deine Registrierung
          abzuschließen.
        </p>
        <p className="mt-4 text-xs text-faint">
          Keine E-Mail erhalten? Sieh auch in deinem Spam-Ordner nach.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.07]"
        >
          Zur Anmeldung
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
        Konto erstellen
      </h1>
      <p className="mt-2 text-sm text-muted">
        {plan
          ? `Registriere dich, um mit deinem ${plan.name}-Konto fortzufahren.`
          : "Registriere dich, um loszulegen."}
      </p>

      {plan && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3">
          <span className="text-sm text-muted">Ausgewähltes Konto</span>
          <span className="font-mono text-sm font-semibold text-accent">
            {plan.simulatedCapital}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-faint">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Max Mustermann"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-faint">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="du@beispiel.de"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-faint">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mindestens 6 Zeichen"
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="text-xs text-rose-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Wird erstellt …" : "Konto erstellen"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Bereits ein Konto?{" "}
        <Link href="/login" className="font-semibold text-accent hover:underline">
          Anmelden
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <LanguageToggle />
        </div>
        <Suspense fallback={null}>
          <SignupForm />
        </Suspense>
        <p className="mt-6 text-center text-xs text-faint">
          Mit der Registrierung stimmst du den AGB und der Datenschutzerklärung zu.
          Trading ist mit Risiken verbunden.
        </p>
      </div>
    </main>
  );
}
