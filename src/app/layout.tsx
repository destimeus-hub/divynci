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
  title: "DIVYNCI — Growth Studio for D2C & Service Brands",
  description: "Turn consumer attention into repeat revenue. Interactive launches, QR touchpoints and retention loops for D2C & service brands — first loop live in 14 days.",
  openGraph: {
    title: "DIVYNCI — Turn Customer Attention Into Repeat Revenue",
    description: "Interactive growth loops for D2C and service brands. High-converting diagnostics, zero-party data capture, and retention engines.",
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
