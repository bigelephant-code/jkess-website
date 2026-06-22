import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { absoluteUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JKESS - Powering a Cleaner Future",
  description:
    "JKBMS Electronic Technology Co.,Ltd - your trusted partner in energy storage solutions, from BMS to complete battery systems. Serving 30+ countries worldwide.",
  keywords: [
    "JKESS",
    "BMS",
    "battery storage",
    "energy storage",
    "battery kit",
    "high voltage kit",
    "JKBMS",
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JKBMS Electronic Technology Co.,Ltd",
  url: siteUrl,
  logo: absoluteUrl("/images/jkess-logo.png"),
  description:
    "JKBMS Electronic Technology Co.,Ltd - your trusted partner in energy storage solutions, from BMS to complete battery systems.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "zhou@jkess.com",
    contactType: "sales",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
