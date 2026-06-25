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
  title: {
    default: "JKESS | BMS, Battery Kits and Energy Storage Systems",
    template: "%s",
  },
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
  openGraph: {
    type: "website",
    siteName: "JKESS",
    url: siteUrl,
    title: "JKESS | BMS, Battery Kits and Energy Storage Systems",
    description:
      "JKESS supplies LiFePO4 battery kits, high voltage BMS kits, and commercial energy storage cabinet solutions.",
    images: [
      {
        url: absoluteUrl("/images/jkess-logo.png"),
        width: 1200,
        height: 630,
        alt: "JKESS energy storage systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JKESS | BMS, Battery Kits and Energy Storage Systems",
    description:
      "LiFePO4 battery kits, high voltage BMS kits, and commercial energy storage cabinet solutions.",
    images: [absoluteUrl("/images/jkess-logo.png")],
  },
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
    availableLanguage: ["English", "Chinese"],
  },
};

const websiteJsonLd = {
  "@type": "WebSite",
  name: "JKESS",
  url: siteUrl,
  publisher: {
    "@type": "Organization",
    name: "JKBMS Electronic Technology Co.,Ltd",
    logo: absoluteUrl("/images/jkess-logo.png"),
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [orgJsonLd, websiteJsonLd],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
