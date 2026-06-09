import { Logo } from "./Header";

const footerLinks = [
  { label: "Terms & Conditions", href: "#" }, // EDIT-ME: link to real T&C
  { label: "Privacy Policy", href: "#" }, // EDIT-ME
  { label: "Risk Disclosure", href: "#" }, // EDIT-ME
  { label: "Contact", href: "#" }, // EDIT-ME
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              SAFunded offers Instant Funded simulated trading accounts for
              disciplined traders, with transparent rules and performance-based
              reward eligibility.
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
          <p>© 2026 SAFunded. All rights reserved.</p>
          <p>All trading accounts are simulated unless explicitly stated.</p>
        </div>
      </div>
    </footer>
  );
}
