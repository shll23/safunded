import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung — SAFunded",
};

export default function WiderrufPage() {
  return (
    <LegalShell title="Widerrufsbelehrung" showAsOf={false}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <p className="font-display text-lg font-semibold text-white">
          Widerrufsbelehrung folgt
        </p>
        <p className="mt-3 text-[15px] leading-7 text-muted">
          Die rechtsverbindliche Widerrufsbelehrung wird zu einem späteren
          Zeitpunkt ergänzt. Der vollständige Text wird gesondert
          bereitgestellt. Bis dahin steht hier kein vorläufiger Text zur
          Verfügung.
        </p>
        <p className="mt-4 text-sm text-faint">
          Hinweise zum Widerrufsrecht bei digitalen Leistungen und zu dessen
          Erlöschen finden sich vorab in den{" "}
          <a href="/agb" className="text-accent hover:underline">
            AGB
          </a>{" "}
          (Abschnitte 12 und 13).
        </p>
      </div>
    </LegalShell>
  );
}
