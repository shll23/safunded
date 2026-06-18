import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Rules from "@/components/Rules";
import Payouts from "@/components/Payouts";
import DashboardPreview from "@/components/DashboardPreview";
import Comparison from "@/components/Comparison";
import LaunchOffer from "@/components/LaunchOffer";
import FAQ from "@/components/FAQ";
import SeoSection from "@/components/SeoSection";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";

/**
 * Landing page section order is intentionally calm and process-led: establish
 * trust first, present the accounts, explain the process, then compare, show
 * the rules/product, and only afterwards surface the (low-key) launch offer.
 * The discount is no longer the headline — it sits as a quiet banner deep in
 * the page rather than competing with the hero.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Pricing />
        <HowItWorks />
        <LaunchOffer />
        <Comparison />
        <Rules />
        <DashboardPreview />
        <Payouts />
        <FAQ />
        <SeoSection />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
