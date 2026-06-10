"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

/**
 * Slim, dismissible launch-sale strip pinned to the very top of the page
 * (above the navigation). Once closed it stays closed for the session so it
 * never nags returning visitors mid-scroll.
 */
export default function AnnouncementBar() {
  const t = useT();
  const [hidden, setHidden] = useState(false);

  // Restore the dismissed state after mount to avoid a hydration mismatch.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("safunded.promoDismissed") === "1") {
        setHidden(true);
      }
    } catch {
      // Ignore storage errors — the bar simply stays visible.
    }
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      sessionStorage.setItem("safunded.promoDismissed", "1");
    } catch {
      // Non-fatal: dismissal just won't persist for the session.
    }
  };

  return (
    <div className="relative isolate overflow-hidden border-b border-rose-500/25 bg-gradient-to-r from-rose-600/15 via-base/40 to-rose-600/15 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2 text-sm sm:px-8">
        <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-rose-400/30 bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-rose-300 sm:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
          {t.announcement.badge}
        </span>

        <p className="flex-1 truncate text-center text-muted sm:text-left">
          {t.announcement.text}
        </p>

        <a
          href="#accounts"
          className="hidden whitespace-nowrap rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-ink shadow-sm transition-transform hover:scale-[1.03] sm:inline-flex"
        >
          {t.announcement.cta}
        </a>

        <button
          type="button"
          aria-label={t.announcement.dismiss}
          onClick={dismiss}
          className="grid h-6 w-6 flex-none place-items-center rounded-md text-faint transition-colors hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true" className="text-sm leading-none">✕</span>
        </button>
      </div>
    </div>
  );
}
