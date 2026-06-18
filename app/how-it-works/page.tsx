import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

export const metadata: Metadata = {
  title: "So funktioniert's — SAFunded",
  description:
    "In vier unkomplizierten Schritten vom Checkout zum ersten Trade: Kontogröße wählen, sicher bezahlen, Zugang erhalten und innerhalb klarer Regeln handeln.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
