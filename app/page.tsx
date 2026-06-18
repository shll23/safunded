import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Pricing from "@/components/Pricing";
import Rules from "@/components/Rules";
import Payouts from "@/components/Payouts";
import DashboardPreview from "@/components/DashboardPreview";
import Comparison from "@/components/Comparison";
import LaunchOffer from "@/components/LaunchOffer";
import FAQ from "@/components/FAQ";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";

/**
 * Landing page section order is intentionally calm and process-led: establish
 * trust first, present the accounts, then compare, show the rules/product, and
 * surface the launch offer. "How it works" and "About SAFunded" now live on
 * their own pages reachable from the menu (/how-it-works, /about), keeping the
 * home page shorter and more open.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Pricing />
        <LaunchOffer />
        <Comparison />
        <Rules />
        <DashboardPreview />
        <Payouts />
        <FAQ />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
