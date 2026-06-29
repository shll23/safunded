"use client";

import { FormEvent, useState } from "react";

export default function PayoutsPasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/payouts-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Das Passwort ist nicht korrekt.");
        return;
      }

      window.location.assign("/payouts");
    } catch {
      setError("Die Prüfung konnte nicht abgeschlossen werden.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 max-w-md">
      <label htmlFor="payouts-password" className="text-sm font-medium text-white">
        Passwort
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="payouts-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-colors placeholder:text-faint focus:border-accent"
          placeholder="Passwort eingeben"
          required
        />
        <button
          type="submit"
          disabled={pending}
          className="cta-shimmer inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 text-sm font-semibold text-ink shadow-glow transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Prüfen..." : "Öffnen"}
        </button>
      </div>
      {error && (
        <p className="mt-3 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          {error}
        </p>
      )}
    </form>
  );
}
