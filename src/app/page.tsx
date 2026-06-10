import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProductSection from "@/components/ProductSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

// Hardcoded content for now — will be replaced with Sanity CMS later
const siteContent = {
  hero: {
    title: "Powering a",
    subtitle:
      "Shenzhen Nengyi Electronic Technology — your trusted partner in energy storage solutions, from BMS to complete battery systems.",
    ctaText: "Explore Products",
    ctaLink: "#products",
  },
  stats: {
    yearsEstablished: 4,
    manufacturingBase: "30,000",
    countriesCovered: 30,
    annualOutput: "2.1",
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
      name: "Battery Kit",
      slug: "battery-kit",
      category: "battery-kit",
      description:
        "Complete battery kits compatible with both 15KWh and 16KWh cells, offering plug-and-play installation for residential and commercial energy storage systems.",
      features: [
        "Dual compatibility: 15KWh & 16KWh cells",
        "Pre-assembled and tested modules",
        "Scalable design for flexible capacity",
        "IP54 rated enclosure for indoor & outdoor use",
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
    },
  ],
  about: {
    title: "About JKESS",
    image: "/images/company-building.webp",
  },
  footer: {
    contactEmail: "chinaenergymall@163.com",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection data={siteContent.hero} />
      <StatsSection data={siteContent.stats} />
      <ProductSection products={siteContent.products} />
      <AboutSection data={siteContent.about} />
      <ContactSection data={siteContent.footer} />
    </>
  );
}
