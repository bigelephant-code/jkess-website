import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import Timeline from "@/components/Timeline";
import CertTiltBoard from "@/components/CertTiltBoard";
import MadeWithJKESS from "@/components/MadeWithJKESS";
import ReviewsWall from "@/components/ReviewsWall";
import BrandLogos from "@/components/BrandLogos";
import ContactSection from "@/components/ContactSection";
import TechLines from "@/components/TechLines";

// Hardcoded content for now — will be replaced with Sanity CMS later
const siteContent = {
  hero: {
    title: "Powering a",
    subtitle:
      "Shenzhen Nengyi Electronic Technology — your trusted partner in energy storage solutions, from BMS to complete battery systems.",
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
        "Advanced battery management system designed for optimal performance, safety monitoring, and extended battery life across various energy storage applications.",
      features: [
        "Real-time voltage & temperature monitoring",
        "Overcharge / over-discharge protection",
        "Cell balancing for extended cycle life",
        "Compatible with LFP & NMC chemistries",
      ],
    },
    {
      name: "Battery Kit (With Caster)",
      slug: "battery-kit",
      category: "battery-kit",
      description:
        "Portable energy storage system on heavy-duty caster wheels. Sheet-metal enclosure, IP54 rated, supports 15KWh & 16KWh LFP cells with integrated BMS and LCD display.",
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
        "Professional rack-mount energy storage system (JKLU015) with 15KWh LFP capacity, intelligent BMS, LCD display, and CAN/RS485 communication. Fits standard 19-inch cabinets.",
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
        "High-performance HV battery solutions engineered for large-scale energy storage, industrial backup power, and grid-support applications.",
      features: [
        "High voltage architecture (up to 800V)",
        "Industry-leading energy density",
        "Advanced thermal management system",
        "CAN / RS485 communication interface",
      ],
      image: "",
    },
  ],
  footer: {
    contactEmail: "chinaenergymall@163.com",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection data={siteContent.hero} />
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

