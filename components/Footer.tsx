"use client";

import Link from "next/link";
import { Logo, LanguageToggle } from "./Header";
import { useLanguage } from "@/lib/i18n";
import { translations, type Language } from "@/lib/translations";
import { legalLinks, footerDisclaimer, footerDisclaimerEn } from "@/lib/legal";

/**
 * Global footer. By default it follows the language context (used on the
 * marketing homepage and checkout, where language is toggled in-page). On the
 * locale-routed legal pages, `LegalShell` passes an explicit `lang` so the
 * footer copy, the legal-link labels and the link targets (German "/<slug>" vs.
 * English "/en/<slug>") always match the page the visitor is on.
 */
export default function Footer({ lang }: { lang?: Language } = {}) {
  const { lang: ctxLang } = useLanguage();
  const effective: Language = lang ?? ctxLang;
  const t = translations[effective];
  const isEn = effective === "en";

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
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </div>

          {/* Rechtliches / Legal — links to all legal pages */}
          <nav aria-label={t.footer.legalHeading} className="lg:max-w-md">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">
              {t.footer.legalHeading}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {legalLinks.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={isEn ? `/en/${l.slug}` : l.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {isEn ? l.labelEn : l.label}
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
          {isEn ? footerDisclaimerEn : footerDisclaimer}
        </p>

        <div className="mt-6 flex flex-col gap-3 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.simulatedNote}</p>
        </div>
      </div>
    </footer>
  );
}
