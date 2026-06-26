import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import Timeline from '@/components/Timeline'
import SolutionsSection from '@/components/SolutionsSection'
import TechLines from '@/components/TechLines'
import { localizedPath } from '@/lib/lang'
import { buildPageMetadata } from '@/lib/seo'
import type { LangCode } from '@/i18n/config'
import { companyProfile, companyStats } from '@/lib/company-profile'

const MadeWithJKESS = dynamic(() => import('@/components/MadeWithJKESS'), {
  loading: () => null,
})
const ReviewsWall = dynamic(() => import('@/components/ReviewsWall'), {
  loading: () => null,
})
const BrandLogos = dynamic(() => import('@/components/BrandLogos'), {
  loading: () => null,
})
const CertTiltBoard = dynamic(() => import('@/components/CertTiltBoard'), {
  loading: () => null,
})
const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => null,
})

const siteContent = {
  hero: {
    ctaLink: '/products',
  },
  footer: {
    contactEmail: companyProfile.salesEmail,
  },
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return params.then(({ lang }) =>
    buildPageMetadata({
      lang,
      path: '/',
      title: 'JKESS | BMS, Battery Kits and Energy Storage Systems',
      description:
        'JKESS supplies BMS control hardware, LiFePO4 battery enclosure kits, high voltage battery management systems, and configured commercial energy storage cabinet solutions.',
      keywords: [
        'JKESS',
        'JKBMS',
        'LiFePO4 battery enclosure kit',
        'high voltage BMS',
        'commercial energy storage system',
        'battery storage cabinet',
      ],
      image: '/images/mountain-bg.webp',
    })
  )
}

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params
  const heroData = {
    ...siteContent.hero,
    ctaLink: localizedPath(lang as LangCode, siteContent.hero.ctaLink),
  }

  return (
    <>
      <HeroSection data={heroData} />
      <section className="relative">
        <div className="absolute inset-0 bg-white">
          <TechLines />
        </div>
        <div className="relative z-10">
          <StatsSection data={companyStats} />
          <Timeline />
          <SolutionsSection />
          <CertTiltBoard />
        </div>
      </section>
      <MadeWithJKESS />
      <ReviewsWall />
      <BrandLogos />
      <ContactSection data={siteContent.footer} />
    </>
  )
}
