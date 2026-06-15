'use client'

import { motion } from 'framer-motion'

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
  // ─── 2026 ───
  { date: '2026-06-10', title: 'Global Battery Storage Installations to Hit 300 GWh in 2026 Despite Slight Dip', summary: 'S&P Global reports global battery storage installations are expected to reach 296,617 MWh in 2026, with lithium demand driven primarily by the energy storage sector as grid-scale deployments accelerate worldwide.', source: 'S&P Global', url: 'https://www.spglobal.com/energy/en/news-research/latest-news/metals/010826-battery-storage-to-drive-lithium-demand-growth-globally', category: 'Market', region: 'Global' },
  { date: '2026-05-28', title: 'EU Battery Regulation Enters Full Effect: New Sustainability Requirements for Energy Storage', summary: 'The EU\'s new Battery Regulation comes into full force, requiring carbon footprint declarations, recycled content minimums, and digital battery passports for all energy storage systems sold in Europe.', source: 'European Commission', url: 'https://energy.ec.europa.eu', category: 'Policy', region: 'Europe' },
  { date: '2026-05-15', title: 'CATL Unveils Next-Gen LFP Battery with 330 Wh/kg for Stationary Storage', summary: 'CATL announces a breakthrough LFP battery cell reaching 330 Wh/kg specifically designed for grid-scale stationary energy storage, promising 25% lower BOS costs.', source: 'ESS News', url: 'https://www.ess-news.com', category: 'Technology', region: 'China' },
  { date: '2026-04-22', title: 'U.S. Energy Storage Market Faces Headwinds but Remains Resilient', summary: 'Despite policy uncertainty and tariff concerns, the U.S. energy storage market is projected to add over 60 GWh in 2026, with data center backup emerging as a major new demand driver.', source: 'RTO Insider', url: 'https://www.rtoinsider.com/122189-will-batteries-remain-a-clean-energy-bright-spot-in-2026', category: 'Market', region: 'USA' },
  { date: '2026-04-08', title: 'Energy Storage System Costs Expected to Fall 10-20% in 2026', summary: 'BloombergNEF analysts predict storage system costs will decline 10-20% in 2026 in the US and Europe despite ongoing tariffs, driven by manufacturing scale and chemistry improvements.', source: 'BloombergNEF', url: 'https://www.rechargenews.com/energy-storage/energy-storage-trends-to-watch-in-2026-analysts/2-1-1922642', category: 'Market', region: 'Global' },
  { date: '2026-03-18', title: 'EV Battery Management System Market Projected to Reach $49.8 Billion by 2031', summary: 'The global EV BMS market is forecast to grow from $16.2 billion in 2025 to $49.8 billion by 2031 at a CAGR of 20.6%, with modular BMS architectures gaining significant traction.', source: 'Research and Markets', url: 'https://finance.yahoo.com/news/electric-vehicle-ev-battery-management-103300927.html', category: 'Technology', region: 'Global' },
  { date: '2026-02-25', title: 'IEA: 108 GW of New Battery Storage Deployed Globally in 2025, 40% Increase YoY', summary: 'The International Energy Agency confirms a record 108 GW of battery storage was added worldwide in 2025, with total installed capacity now eleven times higher than in 2021.', source: 'IEA', url: 'https://www.iea.org/reports/global-energy-review-2026/technology-battery-storage', category: 'Industry', region: 'Global' },
  { date: '2026-02-10', title: 'Data Center Energy Storage Emerges as Billion-Dollar Market', summary: 'Hyperscalers including Google, Microsoft, and Amazon are deploying massive battery storage systems alongside data centers, with over $5 billion in announced projects for behind-the-meter BESS.', source: 'Latitude Media', url: 'https://www.latitudemedia.com/news/the-unexpected-clean-energy-winner-of-2025-energy-storage', category: 'Market', region: 'USA' },
  { date: '2026-01-22', title: 'BMS Market Surpasses $13.6 Billion in 2025, Asia Pacific Dominates with 71% Share', summary: 'Fortune Business Insights reports the global BMS market reached $13.64 billion in 2025, with Asia Pacific accounting for 71.4% of revenue driven by massive EV and ESS production in China.', source: 'Fortune Business Insights', url: 'https://www.fortunebusinessinsights.com/industry-reports/battery-management-system-market-101311', category: 'Market', region: 'Asia' },

  // ─── 2025 ───
  { date: '2025-12-19', title: 'Energy Storage in 2025: Year in Review — Record Installations and Falling Costs', summary: 'ESS News reviews a landmark year: global battery storage installations smashed records and system costs continued to tumble, with core Chinese equipment now around $75/kWh.', source: 'ESS News', url: 'https://www.ess-news.com/2025/12/19/energy-storage-in-2025-year-in-review-part-1', category: 'Industry', region: 'Global' },
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

  // ─── 2024 ───
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

const categoryColors: Record<string, string> = {
  Market: '#5b5bff',
  Technology: '#22c55e',
  Policy: '#f97316',
  Industry: '#a66cd9',
}

function TimelineDot({ category }: { category: string }) {
  const color = categoryColors[category] || '#22c55e'
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-4 h-4 rounded-full border-2 bg-white z-10 shrink-0"
        style={{ borderColor: color }}
      />
      <div className="w-0.5 flex-1 bg-gray-200" />
    </div>
  )
}

export default function NewsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, #22c55e 0%, transparent 50%), radial-gradient(circle at 70% 60%, #5b5bff 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Energy Storage{' '}
              <span className="text-green-400">News</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Curated industry news from January 2024 to June 2026 — tracking the latest
              in battery technology, market trends, and policy developments worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Year headers */}
          {['2026', '2025', '2024'].map((year, yi) => {
            const yearNews = news.filter((n) => n.date.startsWith(year))
            if (yearNews.length === 0) return null
            return (
              <div key={year}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-6 mt-10 first:mt-0"
                >
                  <div className="h-px flex-1 bg-gray-200" />
                  <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </motion.div>

                <div className="space-y-0">
                  {yearNews.map((item, i) => {
                    const date = new Date(item.date)
                    const monthDay = `${date.getMonth() + 1}.${date.getDate()}`
                    const isLast = i === yearNews.length - 1
                    return (
                      <motion.a
                        key={item.date + item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="group flex gap-5 py-4 hover:bg-gray-50 rounded-lg -mx-4 px-4 transition-colors"
                      >
                        {/* Timeline */}
                        <div className="flex flex-col items-center shrink-0 pt-1">
                          <div
                            className="w-3.5 h-3.5 rounded-full border-[2.5px] bg-white z-10 shrink-0 transition-colors"
                            style={{ borderColor: categoryColors[item.category] || '#22c55e' }}
                          />
                          {!isLast && <div className="w-0.5 flex-1 bg-gray-100 group-hover:bg-gray-200 transition-colors" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pb-4" style={{ borderBottom: isLast ? 'none' : '1px solid #f3f4f6' }}>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[12px] text-gray-400 font-medium shrink-0">{monthDay}</span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                              style={{ background: `${categoryColors[item.category]}12`, color: categoryColors[item.category] }}
                            >
                              {item.category}
                            </span>
                            <span className="text-[11px] text-gray-400">{item.region}</span>
                          </div>
                          <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-1">
                            {item.title}
                          </h3>
                          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                            {item.summary}
                          </p>
                          <span className="text-[11px] text-gray-400 mt-1.5 inline-block group-hover:text-green-500 transition-colors">
                            {item.source} →
                          </span>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
