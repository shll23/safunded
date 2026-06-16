"use client";

import { payoutCertificates, type PayoutCertificate } from "@/lib/plans";

/**
 * Continuous certificate marquees. The ten real SAFunded payout certificates
 * are split across two rows (five each). Each row scrolls horizontally without
 * stopping — roughly three cards are visible at a time and the track loops
 * seamlessly. Hovering a row pauses it so a certificate can be studied.
 */

function CertificateCard({ c }: { c: PayoutCertificate }) {
  return (
    <figure className="flex w-[300px] shrink-0 items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-accent/30 sm:w-[340px]">
      <div className="min-w-0 flex-1">
        <p className="font-display text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
          {c.amount}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-white">{c.name}</p>
        <p className="mt-2 text-[11px] uppercase tracking-wide text-faint">
          Auszahlungs-Zertifikat
        </p>
      </div>
      <img
        src={c.image}
        alt={`SAFunded Auszahlungs-Zertifikat – ${c.name}, ${c.amount}`}
        width={104}
        height={104}
        loading="lazy"
        decoding="async"
        className="h-24 w-24 shrink-0 rounded-xl border border-accent/25 object-cover shadow-glow sm:h-28 sm:w-28"
      />
    </figure>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: PayoutCertificate[];
  direction: "left" | "right";
}) {
  // Two identical groups side by side; -50% of the combined width equals one
  // group width, so the loop is invisible.
  const Group = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0 gap-5 pr-5" aria-hidden={hidden || undefined}>
      {items.map((c, i) => (
        <CertificateCard key={`${c.image}-${i}`} c={c} />
      ))}
    </div>
  );

  return (
    <div className="group relative overflow-hidden">
      {/* Soft fade on both edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-base to-transparent" />
      <div
        className={`flex w-max [transform:translateZ(0)] [will-change:transform] [backface-visibility:hidden] group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}

export default function PayoutCertificateSlideshow() {
  const topRow = payoutCertificates.slice(0, 5);
  const bottomRow = payoutCertificates.slice(5, 10);

  return (
    <div className="mt-14 flex flex-col gap-5">
      <MarqueeRow items={topRow} direction="left" />
      <MarqueeRow items={bottomRow} direction="right" />
    </div>
  );
}
