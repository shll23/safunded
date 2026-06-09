import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  // EDIT-ME: update title/description for SEO before launch
  title: "SAFunded — Instant Funded Simulated Trading Accounts",
  description:
    "SAFunded offers Instant Funded simulated trading accounts (25K / 50K / 100K) with transparent rules and performance-based reward eligibility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-base font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}
