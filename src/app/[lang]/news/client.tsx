'use client'

import { ArrowUpRight, BarChart3, CalendarDays, Factory, Filter, Globe2, Landmark, Search, TrendingUp, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { useTranslate } from '@/i18n/client'

interface NewsItem {
  date: string
  title: string
  summary: string
  source: string
  url: string
  category: 'Market' | 'Technology' | 'Policy' | 'Industry'
  region: string
}

const news: NewsItem[] = [
  { date: '2026-06-10', title: 'Global Battery Storage Installations to Hit 300 GWh in 2026 Despite Slight Dip', summary: 'S&P Global reports global battery storage installations are expected to reach 296,617 MWh in 2026, with lithium demand driven primarily by the energy storage sector as grid-scale deployments accelerate worldwide.', source: 'S&P Global', url: 'https://www.spglobal.com/energy/en/news-research/latest-news/metals/010826-battery-storage-to-drive-lithium-demand-growth-globally', category: 'Market', region: 'Global' },
  { date: '2026-05-28', title: 'EU Battery Regulation Enters Full Effect: New Sustainability Requirements for Energy Storage', summary: 'The EU\'s new Battery Regulation comes into full force, requiring carbon footprint declarations, recycled content minimums, and digital battery passports for all energy storage systems sold in Europe.', source: 'European Commission', url: 'https://energy.ec.europa.eu', category: 'Policy', region: 'Europe' },
  { date: '2026-05-15', title: 'CATL Unveils Next-Gen LFP Battery with 330 Wh/kg for Stationary Storage', summary: 'CATL announces a breakthrough LFP battery cell reaching 330 Wh/kg specifically designed for grid-scale stationary energy storage, promising 25% lower BOS costs.', source: 'ESS News', url: 'https://www.ess-news.com', category: 'Technology', region: 'China' },
  { date: '2026-04-22', title: 'U.S. Energy Storage Market Faces Headwinds but Remains Resilient', summary: 'Despite policy uncertainty and tariff concerns, the U.S. energy storage market is projected to add over 60 GWh in 2026, with data center backup emerging as a major new demand driver.', source: 'RTO Insider', url: 'https://www.rtoinsider.com/122189-will-batteries-remain-a-clean-energy-bright-spot-in-2026', category: 'Market', region: 'USA' },
  { date: '2026-04-08', title: 'Energy Storage System Costs Expected to Fall 10-20% in 2026', summary: 'BloombergNEF analysts predict storage system costs will decline 10-20% in 2026 in the US and Europe despite ongoing tariffs, driven by manufacturing scale and chemistry improvements.', source: 'BloombergNEF', url: 'https://www.rechargenews.com/energy-storage/energy-storage-trends-to-watch-in-2026-analysts/2-1-1922642', category: 'Market', region: 'Global' },
  { date: '2026-03-18', title: 'EV Battery Management System Market Projected to Reach $49.8 Billion by 2031', summary: 'The global EV BMS market is forecast to grow from $16.2 billion in 2025 to $49.8 billion by 2031 at a CAGR of 20.6%, with modular BMS architectures gaining significant traction.', source: 'Research and Markets', url: 'https://finance.yahoo.com/news/electric-vehicle-ev-battery-management-103300927.html', category: 'Technology', region: 'Global' },
  { date: '2026-02-25', title: 'IEA: 108 GW of New Battery Storage Deployed Globally in 2025, 40% Increase YoY', summary: 'The International Energy Agency confirms a record 108 GW of battery storage was added worldwide in 2025, with total installed capacity now eleven times higher than in 2021.', source: 'IEA', url: 'https://www.iea.org/reports/global-energy-review-2026/technology-battery-storage', category: 'Industry', region: 'Global' },
  { date: '2026-02-10', title: 'Data Center Energy Storage Emerges as Billion-Dollar Market', summary: 'Hyperscalers including Google, Microsoft, and Amazon are deploying massive battery storage systems alongside data centers, with over $5 billion in announced projects for behind-the-meter BESS.', source: 'Latitude Media', url: 'https://www.latitudemedia.com/news/the-unexpected-clean-energy-winner-of-2025-energy-storage', category: 'Market', region: 'USA' },
  { date: '2026-01-22', title: 'BMS Market Surpasses $13.6 Billion in 2025, Asia Pacific Dominates with 71% Share', summary: 'Fortune Business Insights reports the global BMS market reached $13.64 billion in 2025, with Asia Pacific accounting for 71.4% of revenue driven by massive EV and ESS production in China.', source: 'Fortune Business Insights', url: 'https://www.fortunebusinessinsights.com/industry-reports/battery-management-system-market-101311', category: 'Market', region: 'Asia' },
  { date: '2025-12-19', title: 'Energy Storage in 2025: Year in Review - Record Installations and Falling Costs', summary: 'ESS News reviews a landmark year: global battery storage installations smashed records and system costs continued to tumble, with core Chinese equipment now around $75/kWh.', source: 'ESS News', url: 'https://www.ess-news.com/2025/12/19/energy-storage-in-2025-year-in-review-part-1', category: 'Industry', region: 'Global' },
  { date: '2025-12-10', title: 'U.S. Adds Record 57.6 GWh of New Energy Storage Capacity in 2025', summary: 'According to SEIA and Benchmark Mineral Intelligence, the U.S. installed a record 57.6 GWh of new battery capacity in 2025, the largest single year on record, bringing total utility-scale storage to 137 GWh.', source: 'SEIA', url: 'https://seia.org/news/united-states-installs-58-gwh-of-new-energy-storage-in-2025', category: 'Market', region: 'USA' },
  { date: '2025-11-20', title: 'Tesla Megapack Factory in Shanghai Reaches 40 GWh Annual Capacity', summary: 'Tesla\'s Shanghai Megapack factory achieves full production capacity of 40 GWh per year, significantly reducing costs and lead times for large-scale energy storage projects across Asia-Pacific.', source: 'Reuters', url: 'https://www.reuters.com', category: 'Industry', region: 'China' },
  { date: '2025-10-20', title: 'Global Energy Storage Additions to Exceed 92 GW in 2025, Up 23% YoY: BNEF', summary: 'BloombergNEF forecasts more than 92 GW/247 GWh of energy storage additions worldwide in 2025, with China and the U.S. leading despite policy changes and trade hurdles.', source: 'BloombergNEF', url: 'https://www.utilitydive.com/news/us-energy-storage-market-looks-resilient-amid-global-growth-bnef/803368', category: 'Market', region: 'Global' },
  { date: '2025-09-15', title: 'Redwood Materials and Panasonic Partner on Grid-Scale Storage Using Repurposed EV Batteries', summary: 'Redwood Materials announces a major partnership to develop grid-scale energy storage using new and repurposed EV batteries, backed by a $2 billion investment commitment.', source: 'Latitude Media', url: 'https://www.latitudemedia.com/news/the-unexpected-clean-energy-winner-of-2025-energy-storage', category: 'Technology', region: 'USA' },
  { date: '2025-08-22', title: 'Wireless BMS Technology Gains Traction for Large-Scale ESS Deployments', summary: 'Monolithic Power Systems reports growing adoption of wireless BMS in large-scale energy storage, enabling remote monitoring, reduced wiring costs, and improved diagnostics for multi-MWh installations.', source: 'MPS', url: 'https://www.monolithicpower.com/en/learning/mpscholar/battery-management-systems/advanced-topics-in-bms/future-trends-in-bms', category: 'Technology', region: 'Global' },
  { date: '2025-07-10', title: 'EU Approves $3.5 Billion in State Aid for Battery Storage and Manufacturing', summary: 'The European Commission approves new state aid schemes across Germany, France, and Italy worth $3.5 billion to boost battery energy storage deployment and domestic manufacturing capacity.', source: 'European Commission', url: 'https://energy.ec.europa.eu', category: 'Policy', region: 'Europe' },
  { date: '2025-06-05', title: 'LFP Battery Prices Drop Below $50/kWh at Cell Level for First Time', summary: 'Industry benchmark data shows LFP battery cell prices have fallen below $50/kWh for the first time, driven by overcapacity in China and advances in dry-electrode manufacturing.', source: 'Benchmark Minerals', url: 'https://www.benchmarkminerals.com', category: 'Market', region: 'Global' },
  { date: '2025-05-26', title: 'Automotive BMS Market Worth $6.53 Billion in 2025, Projected to Double by 2030', summary: 'MarketsandMarkets reports the automotive BMS market at $6.53 billion in 2025, driven by EV technology advances including high-density lithium batteries and fast-charging solutions.', source: 'MarketsandMarkets', url: 'https://www.prnewswire.com/news-releases/automotive-battery-management-system-bms-market-worth-15-65-billion-by-2030---exclusive-report-by-marketsandmarkets-302465036.html', category: 'Market', region: 'Global' },
  { date: '2025-04-12', title: 'Marelli Unveils EIS-Based BMS for Advanced Battery Diagnostics at CTI Berlin', summary: 'Marelli showcases a pioneering BMS using Electrochemical Impedance Spectroscopy (EIS) at the 2024 CTI Symposium, enabling real-time insight into lithium-ion battery degradation and capacity reduction.', source: 'Marelli', url: 'https://www.marelli.com/en/news/marelli-unveils-latest-innovative-battery-management-systems-sol.html', category: 'Technology', region: 'Europe' },
  { date: '2025-03-25', title: 'China Installs 75 GW of New Energy Storage in 2024, Targets 100 GW Annually by 2028', summary: 'China\'s National Energy Administration confirms 75 GW of new storage installations in 2024, with ambitious targets to reach 100 GW annually by 2028 as part of its dual-carbon strategy.', source: 'NEA China', url: 'https://www.nea.gov.cn', category: 'Policy', region: 'China' },
  { date: '2025-02-15', title: 'Smart BMS with AI-Based Predictive Maintenance Enters Commercial ESS Market', summary: 'Multiple BMS manufacturers launch AI-powered predictive maintenance systems for commercial ESS, using machine learning to forecast battery degradation and schedule maintenance proactively.', source: 'Battery Tech Online', url: 'https://www.batterytechonline.com/batteries/battery-management-systems', category: 'Technology', region: 'Global' },
  { date: '2025-01-08', title: 'Na-ion Battery Storage Pilot Projects Reach 1 GWh Globally', summary: 'Sodium-ion battery storage pilot projects worldwide reach 1 GWh cumulative capacity, with several manufacturers targeting commercial LFP-displacing pricing by 2027 for stationary applications.', source: 'Energy Storage News', url: 'https://www.energy-storage.news', category: 'Technology', region: 'Global' },
  { date: '2024-12-20', title: '2024 Global Energy Storage Installations Surge 45% to 185 GWh', summary: 'Year-end industry data confirms global energy storage installations grew 45% in 2024 to reach 185 GWh, driven by China\'s aggressive deployment targets and U.S. IRA incentives.', source: 'BloombergNEF', url: 'https://www.woodmac.com/press-releases/2025-u.s.-energy-storage-installations-set-new-record-surpass-2024-by-52', category: 'Market', region: 'Global' },
  { date: '2024-11-10', title: 'U.S. Energy Storage Market: 38 GWh Installed in 2024, Up 52% from 2023', summary: 'Wood Mackenzie reports U.S. energy storage installations reached 38 GWh in 2024, a 52% increase from 2023, with utility-scale projects representing 78% of total capacity.', source: 'Wood Mackenzie', url: 'https://www.woodmac.com/press-releases/2025-u.s.-energy-storage-installations-set-new-record-surpass-2024-by-52', category: 'Market', region: 'USA' },
  { date: '2024-10-05', title: 'Battery Management System Market Valued at $9.43 Billion, Projected CAGR of 19.3%', summary: 'The global BMS market reaches $9.43 billion in 2024 with a projected CAGR of 19.26% through 2032, driven by EV adoption, renewable energy storage demand, and portable electronics growth.', source: 'SNS Insider', url: 'https://www.snsinsider.com/reports/battery-management-system-market-3275', category: 'Market', region: 'Global' },
  { date: '2024-09-18', title: 'South Korea Unveils $1.8 Billion ESS Safety Initiative After Fire Incidents', summary: 'South Korea\'s government launches a $1.8 billion initiative to improve ESS safety standards following several BESS fire incidents, including mandatory advanced BMS certification and real-time monitoring requirements.', source: 'Korea Herald', url: 'https://www.koreaherald.com', category: 'Policy', region: 'Asia' },
  { date: '2024-08-12', title: 'IP54 and Higher Ingress Protection Ratings Become Standard for Residential ESS', summary: 'Leading residential ESS manufacturers adopt IP54 and higher ingress protection ratings as standard, driven by increasing outdoor installations and stricter safety regulations in Europe and North America.', source: 'ESS News', url: 'https://www.ess-news.com', category: 'Industry', region: 'Global' },
  { date: '2024-07-01', title: 'IoT-Enabled BMS Using LSTM Machine Learning Predicts Battery Remaining Useful Life', summary: 'Researchers publish breakthrough BMS enhancement using IoT sensors and LSTM deep learning models to predict remaining useful life of Li-ion batteries with 95% accuracy on NASA battery datasets.', source: 'Nature Scientific Reports', url: 'https://www.nature.com/articles/s41598-024-80719-1', category: 'Technology', region: 'Global' },
  { date: '2024-06-05', title: 'India Launches 50 GWh Strategic Battery Storage Reserve and Manufacturing Program', summary: 'India announces a $2.5 billion program to build a 50 GWh strategic battery storage reserve and support domestic cell manufacturing, aiming to reduce dependence on Chinese imports.', source: 'Economic Times', url: 'https://economictimes.indiatimes.com', category: 'Policy', region: 'Asia' },
  { date: '2024-04-15', title: 'High-Voltage Battery Kits (Up to 800V) Gain Popularity for Commercial ESS', summary: 'High-voltage battery systems operating at 600-800V are gaining significant market share in commercial and industrial ESS applications, offering reduced I2R losses and lower cabling costs.', source: 'S&P Global', url: 'https://www.spglobal.com', category: 'Technology', region: 'Global' },
  { date: '2024-02-28', title: 'CAN and RS485 Communication Become Required Features for Grid-Connected BESS', summary: 'Grid operators in Europe and North America mandate CAN and RS485 communication interfaces for all grid-connected BESS, enabling standardized monitoring and grid response integration.', source: 'Energy Storage News', url: 'https://www.energy-storage.news', category: 'Policy', region: 'Global' },
  { date: '2024-01-10', title: 'Global Battery Storage Investment Crosses $40 Billion Mark for First Time', summary: 'BloombergNEF reports global investment in battery energy storage exceeded $40 billion in 2023, with projections for 2024 to reach $50 billion as costs fall and deployment accelerates.', source: 'BloombergNEF', url: 'https://about.bnef.com', category: 'Market', region: 'Global' },
]

const categoryMeta: Record<NewsItem['category'], { color: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  Market: { color: '#4f46e5', icon: BarChart3 },
  Technology: { color: '#16a34a', icon: Zap },
  Policy: { color: '#ea580c', icon: Landmark },
  Industry: { color: '#7c3aed', icon: Factory },
}

const categoryOptions = ['All', 'Market', 'Technology', 'Policy', 'Industry'] as const
const yearOptions = ['All', ...Array.from(new Set(news.map((item) => item.date.slice(0, 4))))] as const
const signalHighlights = [
  { label: '2026 Storage Outlook', value: '300 GWh', note: 'Global installation signal' },
  { label: 'BMS Growth Path', value: '20.6%', note: 'Projected CAGR to 2031' },
  { label: 'Cost Direction', value: '-20%', note: 'Expected ESS system decline' },
]
const editorialLenses = [
  { title: 'Market Pulse', text: 'Track deployment volume, cost movement, and regional demand signals across storage markets.', category: 'Market' as const },
  { title: 'Technology Watch', text: 'Follow BMS, LFP, sodium-ion, diagnostics, and high-voltage architecture developments.', category: 'Technology' as const },
  { title: 'Policy Radar', text: 'Monitor regulation, incentive, safety, and compliance shifts affecting ESS projects.', category: 'Policy' as const },
]

function formatDate(dateText: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(dateText))
}

export default function NewsPage() {
  const t = useTranslate()
  const [activeCategory, setActiveCategory] = useState<(typeof categoryOptions)[number]>('All')
  const [activeYear, setActiveYear] = useState<(typeof yearOptions)[number]>('All')
  const [query, setQuery] = useState('')

  const featured = news[0]
  const normalizedQuery = query.trim().toLowerCase()
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesYear = activeYear === 'All' || item.date.startsWith(activeYear)
      const matchesQuery = !normalizedQuery
        || item.title.toLowerCase().includes(normalizedQuery)
        || item.summary.toLowerCase().includes(normalizedQuery)
        || item.source.toLowerCase().includes(normalizedQuery)
        || item.region.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesYear && matchesQuery
    })
  }, [activeCategory, activeYear, normalizedQuery])

  const groupedNews = yearOptions
    .filter((year) => year !== 'All')
    .map((year) => ({
      year,
      items: filteredNews.filter((item) => item.date.startsWith(year)),
    }))
    .filter((group) => group.items.length > 0)
  const categoryCounts = categoryOptions
    .filter((category) => category !== 'All')
    .map((category) => ({
      category,
      count: news.filter((item) => item.category === category).length,
    }))
  const latestDate = formatDate(featured.date)

  return (
    <div className="min-h-screen bg-[#f3f6f5] text-gray-950">
      <section className="relative min-h-[680px] overflow-hidden bg-[#07110d]">
        <div className="absolute inset-0">
          <Image src="/images/news-banner-bg.png" alt="" fill className="object-cover opacity-70" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.96)_0%,rgba(2,18,12,0.92)_43%,rgba(4,33,38,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f3f6f5] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pt-28 pb-24 md:pt-36 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">{t('news.title')}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">{t('news.desc')}</p>

            <div className="mt-10 grid max-w-3xl gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
              <MetricTile value={news.length.toString()} label="Curated Updates" />
              <MetricTile value={(categoryOptions.length - 1).toString()} label="Research Lenses" />
              <MetricTile value={`${yearOptions.length - 1}Y`} label="Signal History" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="border border-white/12 bg-black/35 p-5 shadow-2xl shadow-black/30 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Live Brief</p>
                <p className="mt-1 text-sm text-slate-400">{latestDate}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center border border-emerald-300/30 bg-emerald-300/10 text-emerald-200">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {signalHighlights.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.note}</p>
                    </div>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                  </div>
                  <div className="mt-3 h-1.5 bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${78 - index * 12}%` }}
                      transition={{ duration: 0.9, delay: 0.35 + index * 0.15 }}
                      className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {editorialLenses.map((lens, index) => {
              const meta = categoryMeta[lens.category]
              const Icon = meta.icon
              return (
                <motion.button
                  key={lens.title}
                  onClick={() => setActiveCategory(lens.category)}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors hover:border-gray-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center" style={{ background: `${meta.color}14`, color: meta.color }}>
                      <Icon size={20} />
                    </div>
                    <ArrowUpRight size={18} className="text-gray-300 transition-colors group-hover:text-emerald-600" />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-gray-950">{lens.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-500">{lens.text}</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
            className="group grid overflow-hidden border border-gray-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_440px]"
          >
            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 via-cyan-500 to-indigo-500" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-gray-950 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                  <CalendarDays size={14} />
                  Lead Story
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{latestDate}</span>
              </div>
              <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-gray-950 transition-colors group-hover:text-emerald-700 md:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-500 md:text-base">{featured.summary}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <CategoryPill category={featured.category} />
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  <Globe2 size={14} />
                  {featured.region}
                </span>
                <span className="ml-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 transition-colors group-hover:text-emerald-700">
                  Read Source
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
            <div className="relative min-h-72 border-t border-gray-200 bg-gray-950 lg:border-l lg:border-t-0">
              <Image src="/images/news-featured-energy-storage.jpg" alt="" fill className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 440px, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/50 to-black/85" />
              <div className="absolute bottom-5 left-5 right-5 border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-gray-400">Source</p>
                <p className="mt-2 text-lg font-bold text-white">{featured.source}</p>
              </div>
            </div>
          </motion.a>

          <div className="mt-8 grid gap-6 lg:grid-cols-[310px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Filter size={16} className="text-emerald-600" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Refine Feed</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search energy news"
                    className="w-full border border-gray-200 bg-gray-50 py-3 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Topic</p>
                  <div className="space-y-1">
                    {categoryOptions.map((category) => {
                      const isActive = activeCategory === category
                      const count = category === 'All' ? news.length : news.filter((item) => item.category === category).length
                      return (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm transition-colors ${
                            isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className="font-semibold">{category === 'All' ? 'All Topics' : category}</span>
                          <span className="text-xs opacity-70">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Year</p>
                  <div className="grid grid-cols-2 gap-2">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`px-3 py-2 text-sm font-semibold transition-colors ${
                          activeYear === year ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {year === 'All' ? 'All Years' : year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-5 flex flex-col gap-3 border border-gray-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Showing</p>
                  <p className="mt-1 text-lg font-bold text-gray-950">{filteredNews.length} updates</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoryCounts.map(({ category, count }) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className="group inline-flex items-center gap-2"
                    >
                      <CategoryPill category={category} compact />
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-700">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${activeYear}-${query}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {groupedNews.length === 0 ? (
                    <div className="border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                      <p className="text-sm font-semibold text-gray-900">No matching news</p>
                      <p className="mt-2 text-sm text-gray-500">Try another topic, year, or keyword.</p>
                    </div>
                  ) : (
                    groupedNews.map((group) => (
                      <section key={group.year}>
                        <div className="mb-4 flex items-center gap-4">
                          <h2 className="text-2xl font-bold text-gray-950">{group.year}</h2>
                          <div className="h-px flex-1 bg-gray-200" />
                          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{group.items.length} items</span>
                        </div>
                        <div className="relative grid gap-4 xl:grid-cols-2">
                          {group.items.map((item, index) => (
                            <NewsCard key={item.date + item.title} item={item} index={index} />
                          ))}
                        </div>
                      </section>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryPill({ category, compact = false }: { category: NewsItem['category']; compact?: boolean }) {
  const meta = categoryMeta[category]
  const Icon = meta.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest ${compact ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'}`}
      style={{ background: `${meta.color}14`, color: meta.color }}
    >
      <Icon size={compact ? 12 : 14} />
      {category}
    </span>
  )
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const meta = categoryMeta[item.category]
  const Icon = meta.icon

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.18) }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ backgroundColor: meta.color }} />
      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center opacity-10 transition-opacity group-hover:opacity-20" style={{ color: meta.color }}>
        <Icon size={42} />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryPill category={item.category} compact />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              <Globe2 size={12} />
              {item.region}
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-400">{formatDate(item.date)}</p>
        </div>
        <ArrowUpRight size={18} className="shrink-0 text-gray-300 transition-colors group-hover:text-emerald-600" />
      </div>
      <h3 className="mt-4 pr-8 text-base font-bold leading-snug text-gray-950 transition-colors group-hover:text-emerald-700">{item.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">{item.summary}</p>
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs font-semibold text-gray-500">{item.source}</span>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors group-hover:text-emerald-700">Read More</span>
      </div>
    </motion.a>
  )
}

function MetricTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-black/45 px-5 py-4 backdrop-blur-sm">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  )
}
