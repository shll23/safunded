import type { ReactNode } from "react";

/**
 * Shared typography primitives for the legal pages. They keep every legal
 * document visually consistent (dark theme, generous line-height, clear
 * hierarchy) without pulling in a Tailwind typography plugin.
 */

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-xl font-semibold tracking-tight text-white">
      {children}
    </h2>
  );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-24 text-base font-semibold text-white">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-7 text-muted">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted marker:text-faint">
      {children}
    </ul>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

/** Emphasised inline text, rendered in the brighter foreground colour. */
export function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}
