import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import SupportWidget from "@/components/SupportWidget";

// `display: "swap"` keeps text visible while the web fonts load (no invisible
// text / FOIT), and `preload` is limited to the body font that paints the
// first content — the display and mono faces load without blocking the LCP.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // Required so Next.js renders absolute URLs for the auto-generated
  // og:image / twitter:image tags — WhatsApp, Telegram, X and other
  // social previews only resolve absolute image URLs.
  metadataBase: new URL("https://safunded.com"),
  title: "SAFunded — Instant Funded Trading Accounts without a Challenge Phase",
  description:
    "SAFunded offers instant funded MT5 accounts with simulated trading capital — 25K, 50K and 100K with no challenge phase, no consistency rule, an 80% profit split and payout processing within 24h after a successful review.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allow zoom for accessibility; do not lock scaling.
  maximumScale: 5,
  themeColor: "#070B16",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="bg-base font-body text-white antialiased">
        <LanguageProvider>
          {children}
          <SupportWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
