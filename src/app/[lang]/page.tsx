import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import Timeline from "@/components/Timeline";
import CertTiltBoard from "@/components/CertTiltBoard";
import TechLines from "@/components/TechLines";
import { localizedPath } from "@/lib/lang";
import type { LangCode } from "@/i18n/config";

// Lazy-load below-fold components
const MadeWithJKESS = dynamic(() => import("@/components/MadeWithJKESS"), {
  loading: () => null,
});
const ReviewsWall = dynamic(() => import("@/components/ReviewsWall"), {
  loading: () => null,
});
const BrandLogos = dynamic(() => import("@/components/BrandLogos"), {
  loading: () => null,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => null,
});

// Hardcoded English content — translations via i18n for hero only in this pass
const siteContent = {
  hero: {
    title: "Powering a",
    // subtitle is now loaded from i18n translations
    ctaText: "Explore Products",
    ctaLink: "/products",
  },
  stats: {
    yearsEstablished: 10,
    manufacturingBase: "30,000",
    countriesCovered: 30,
    employees: "100+",
  },
  products: [
    {
      name: "BMS Protection Board",
      slug: "bms-protection-board",
      category: "bms",
      description:
        "Comprehensive BMS solutions: active balancers (2A~15A), protection boards (40A~300A, 4S~32S), and parallel boards with integrated limiter.",
      features: [
        "Active balancers: 2A~15A balancing, 4S~24S support",
        "Protection boards: 40A~300A continuous, 4S~32S cell",
        "Parallel boards with integrated 10A current limiter",
        "CAN / RS485 / Bluetooth / isoSPI communication",
      ],
      image: "/images/bms-board/1.jpg",
    },
    {
      name: "Battery Kit (With Caster)",
      slug: "battery-kit",
      category: "battery-kit",
      description:
        "Portable energy storage system on heavy-duty caster wheels. Sheet-metal enclosure, IP54 rated.",
      features: [
        "Heavy-duty caster wheels for easy mobility",
        "Sheet-metal enclosure, IP54 rated",
        "Supports 15KWh & 16KWh LFP cells",
        "Integrated BMS + LCD + CAN/RS485",
      ],
      image: "/images/battery-kit-hero.webp",
      images: [
        "/images/battery-kit-hero.webp",
        "/images/battery-kit-system.webp",
        "/images/battery-kit-front.webp",
        "/images/battery-kit-side.webp",
        "/images/battery-kit-rear.webp",
        "/images/battery-kit-display.webp",
      ],
    },
    {
      name: "6U Battery Kit",
      slug: "6u-battery-kit",
      category: "battery-kit",
      description:
        "Professional rack-mount energy storage system (JKLU015) with 15KWh LFP capacity.",
      features: [
        "6U rack-mount — fits 19-inch cabinets",
        "Modular expandable — parallel up to 30KWh+",
        "Intelligent BMS with active balancing",
        "4.3\" LCD + CAN/RS485 communication",
      ],
      image: "/images/6u-kit/1.webp",
      images: [
        "/images/6u-kit/1.webp",
        "/images/6u-kit/2.webp",
        "/images/6u-kit/3.webp",
        "/images/6u-kit/4.webp",
        "/images/6u-kit/5.webp",
        "/images/6u-kit/6.webp",
      ],
    },
    {
      name: "High Voltage Kit",
      slug: "high-voltage-kit",
      category: "high-voltage-kit",
      description:
        "Complete HV BMS solution: BCU-B3 master control (ISO 26262, 1500V) & BMU-H5-16.",
      features: [
        "BCU-B3 Master: ISO 26262 functional safety, 1500V detection",
        "BMU-H5-16 Slave: ±5mV accuracy, 2A bidirectional active balancing",
        "SOC/SOH/SOP smart estimation + 16-cell voltage collection",
        "Remote OTA & real-time IoT cloud monitoring",
      ],
      image: "",
    },
  ],
  footer: {
    contactEmail: "chinaenergymall@163.com",
  },
};

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;

  // Localize hero CTA link
  const heroData = {
    ...siteContent.hero,
    ctaLink: localizedPath(lang as LangCode, siteContent.hero.ctaLink),
  };

  return (
    <>
      <HeroSection data={heroData} />
      <section className="relative">
        <div className="absolute inset-0 bg-white">
          <TechLines />
        </div>
        <div className="relative z-10">
          <StatsSection data={siteContent.stats} />
          <Timeline />
          <CertTiltBoard />
        </div>
      </section>
      <MadeWithJKESS />
      <ReviewsWall />
      <BrandLogos />
      <ContactSection data={siteContent.footer} />
    </>
  );
}
