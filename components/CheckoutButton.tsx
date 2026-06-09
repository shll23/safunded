"use client";

import { useState } from "react";
import type { PlanId } from "@/lib/plans";

interface CheckoutButtonProps {
  planId: PlanId;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function CheckoutButton({
  planId,
  label,
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }

      // Redirect to Stripe-hosted checkout.
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const base =
    "relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "bg-accent text-ink shadow-glow hover:bg-accent-bright hover:shadow-glow-lg"
      : "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.07]";

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
        className={`${base} ${styles} ${className}`}
      >
        {loading ? (
          <>
            <Spinner />
            Starting checkout…
          </>
        ) : (
          label
        )}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
