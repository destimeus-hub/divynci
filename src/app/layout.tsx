import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DIVYNCI — Growth Infrastructure for Consumer Touchpoints",
  description: "DIVYNCI builds interactive acquisition, zero-party data capture, and retention engines for D2C consumer brands — deployed in 14 days.",
  openGraph: {
    title: "DIVYNCI — Turn Customer Touchpoints Into Revenue",
    description: "Interactive growth systems for D2C brands. Capture zero-party data, personalize offers, and increase repeat revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased bg-[#F5F1E8] text-[#1D211E]`}
      >
        {children}
      </body>
    </html>
  );
}
