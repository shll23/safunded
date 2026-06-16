"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo, LanguageToggle } from "@/components/Header";
import { createClient } from "@/lib/supabase/client";

// `text-base` (16px) keeps iOS Safari from auto-zooming the page when a field
// is focused.
const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white placeholder:text-faint transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "confirm"
      ? "Die Bestätigung ist fehlgeschlagen oder der Link ist abgelaufen. Bitte melde dich an oder registriere dich erneut."
      : null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const redirectedFrom = searchParams.get("redirectedFrom");
    router.push(redirectedFrom && redirectedFrom.startsWith("/") ? redirectedFrom : "/dashboard");
    router.refresh();
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
        Anmelden
      </h1>
      <p className="mt-2 text-sm text-muted">
        Melde dich an, um zu deinem Dashboard zu gelangen.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dein Passwort"
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
          className="cta-shimmer inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Wird angemeldet …" : "Anmelden"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Noch kein Konto?{" "}
        <Link href="/signup" className="font-semibold text-accent hover:underline">
          Registrieren
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <LanguageToggle />
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-xs text-faint">
          Trading ist mit Risiken verbunden. Auszahlungen sind nicht garantiert.
        </p>
      </div>
    </main>
  );
}
