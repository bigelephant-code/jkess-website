import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JKESS — Powering a Cleaner Future",
  description:
    "JKBMS Electronic Technology Co.,Ltd — your trusted partner in energy storage solutions, from BMS to complete battery systems. Serving 30+ countries worldwide.",
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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JKBMS Electronic Technology Co.,Ltd',
  url: 'https://jkess-energy.com',
  logo: 'https://jkess-energy.com/logo.png',
  description:
    'JKBMS Electronic Technology Co.,Ltd — your trusted partner in energy storage solutions, from BMS to complete battery systems.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'chinaenergymall@163.com',
    contactType: 'sales',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
