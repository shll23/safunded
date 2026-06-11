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
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import SeoSection from "@/components/SeoSection";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Pricing />
        <Rules />
        <Payouts />
        <DashboardPreview />
        <Comparison />
        <LaunchOffer />
        <Testimonials />
        <FAQ />
        <CTA />
        <SeoSection />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
