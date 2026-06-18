import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketsExplorer from "@/components/MarketsExplorer";

export const metadata: Metadata = {
  title: "Trading Instruments — SAFunded",
  description:
    "Trade Forex, Indices, Stocks, Commodities, Metals and Crypto with institutional-grade execution on MetaTrader 5. Browse every instrument available to SAFunded traders.",
};

export default function MarketsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <MarketsExplorer />
      </main>
      <Footer />
    </>
  );
}
