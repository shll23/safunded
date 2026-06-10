"use client";

import Link from "next/link";
import { Logo } from "./Header";
import { useT } from "@/lib/i18n";
import { legalLinks, footerDisclaimer } from "@/lib/legal";

export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-white/[0.08] bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t.footer.desc}
            </p>
            <a
              href="mailto:info@safunded.com"
              className="mt-4 inline-block text-sm text-muted transition-colors hover:text-white"
            >
              info@safunded.com
            </a>
          </div>

          {/* Rechtliches — links to all legal pages */}
          <nav aria-label={t.footer.legalHeading} className="lg:max-w-md">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">
              {t.footer.legalHeading}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/#faq"
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {t.footer.links.faq}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Short legal disclaimer — verbatim website-footer version */}
        <p className="mt-10 border-t border-white/[0.07] pt-6 text-xs leading-relaxed text-faint">
          {footerDisclaimer}
        </p>

        <div className="mt-6 flex flex-col gap-3 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.simulatedNote}</p>
        </div>
      </div>
    </footer>
  );
}
