import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoSection from "@/components/SeoSection";

export const metadata: Metadata = {
  title: "Über SAFunded — SAFunded",
  description:
    "SAFunded bietet Instant Funded MT5-Konten mit simuliertem Trading-Kapital für disziplinierte Trader — mit klaren Regeln und leistungsbasierter Auszahlungsberechtigung.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <SeoSection />
      </main>
      <Footer />
    </>
  );
}
