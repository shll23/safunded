"use client";

import { Logo } from "./Header";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const t = useT();
  const footerLinks = [
    { label: t.footer.links.terms, href: "#" }, // EDIT-ME: link to real T&C
    { label: t.footer.links.privacy, href: "#" }, // EDIT-ME
    { label: t.footer.links.risk, href: "#" }, // EDIT-ME
    { label: t.footer.links.contact, href: "#" }, // EDIT-ME
    { label: t.footer.links.faq, href: "#faq" },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t.footer.desc}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.simulatedNote}</p>
        </div>
      </div>
    </footer>
  );
}
