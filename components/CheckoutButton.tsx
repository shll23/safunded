"use client";

import Link from "next/link";
import type { PlanId } from "@/lib/plans";

interface CheckoutButtonProps {
  planId: PlanId;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
}

/**
 * Preis-Button für ein Konto. Leitet den Besucher zur Registrierung weiter
 * (/signup?plan=<id>), statt direkt einen Stripe-Checkout zu starten. Die
 * Kontoauswahl wird über den Query-Parameter `plan` mitgegeben.
 */
export default function CheckoutButton({
  planId,
  label,
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const base =
    "relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-accent text-ink shadow-glow hover:bg-accent-bright hover:shadow-glow-lg"
      : "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.07]";

  return (
    <div className="w-full">
      <Link
        href={`/signup?plan=${planId}`}
        className={`${base} ${styles} ${className}`}
      >
        {label}
      </Link>
    </div>
  );
}
