import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PayoutsLanding from "@/components/PayoutsLanding";

export const metadata: Metadata = {
  title: "Auszahlungen — SAFunded",
  description:
    "So funktionieren Rewards bei SAFunded: 80 % Gewinnbeteiligung, ein zweiwöchiger Auszahlungszyklus und Bearbeitung innerhalb von 24 Std. nach erfolgreicher Prüfung. Anonymisierte Beispiele für Auszahlungen an SAFunded-Trader.",
};

export default function PayoutsPage() {
  return (
    <>
      <Header />
      <PayoutsLanding />
      <Footer />
    </>
  );
}
