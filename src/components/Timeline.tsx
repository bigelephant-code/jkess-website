'use client'
import { motion } from 'framer-motion'

import { useTranslate } from '@/i18n/client'

export default function Timeline() {
  const t = useTranslate()

  const milestones = [
    {
      year: '2017',
      period: '2017-2019',
      title: t('timeline.2017.title'),
      content: [
        t('timeline.2017.line1'),
        t('timeline.2017.line2'),
      ],
    },
    {
      year: '2020',
      period: '2020-2022',
      title: t('timeline.2020.title'),
      content: [
        t('timeline.2020.line1'),
        t('timeline.2020.line2'),
      ],
    },
    {
      year: '2023',
      period: '2023-2024',
      title: t('timeline.2023.title'),
      content: [
        t('timeline.2023.line1'),
        t('timeline.2023.line2'),
      ],
    },
    {
      year: '2026',
      period: '2026-Future',
      title: t('timeline.2026.title'),
      content: [
        t('timeline.2026.line1'),
        t('timeline.2026.line2'),
      ],
    },
  ]
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Subtle world map background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-900">
            <path d="M200,150 Q220,130 260,135 Q280,140 290,155 Q295,170 280,185 Q260,195 240,190 Q215,185 200,170 Z" />
            <path d="M300,145 Q320,120 360,115 Q400,118 420,130 Q430,145 425,160 Q410,170 390,168 Q370,170 350,165 Q320,160 300,155 Z" />
            <path d="M260,190 Q280,180 300,185 Q320,195 330,210 Q325,225 310,230 Q290,228 275,218 Q262,208 260,195 Z" />
            <path d="M350,165 Q380,155 410,158 Q440,165 455,180 Q460,195 450,208 Q430,215 410,210 Q385,205 365,195 Q352,182 350,170 Z" />
            <path d="M500,220 Q530,200 570,195 Q610,198 640,210 Q660,225 655,245 Q640,260 610,258 Q575,255 545,245 Q515,238 500,225 Z" />
            <path d="M680,200 Q710,185 750,180 Q790,182 820,195 Q835,210 828,228 Q810,240 780,238 Q745,235 715,225 Q692,215 685,205 Z" />
            <path d="M150,250 Q170,240 200,238 Q230,242 245,255 Q248,270 235,280 Q210,285 185,278 Q162,268 153,258 Z" />
            <path d="M280,230 Q310,220 350,218 Q385,222 400,235 Q405,250 390,260 Q360,265 325,260 Q295,255 282,242 Z" />
            <path d="M420,210 Q450,195 490,192 Q525,195 545,210 Q550,228 535,240 Q505,248 470,242 Q440,235 425,222 Z" />
            <path d="M750,240 Q780,228 820,225 Q855,228 870,240 Q875,255 860,268 Q830,275 795,270 Q760,262 750,248 Z" />
            <path d="M100,280 Q130,270 170,268 Q200,272 215,285 Q218,300 205,310 Q175,318 140,312 Q110,305 100,292 Z" />
            <path d="M240,282 Q270,272 310,270 Q345,275 360,288 Q362,302 348,312 Q318,318 282,312 Q252,305 242,295 Z" />
            <path d="M380,265 Q410,252 450,250 Q485,255 500,268 Q502,282 488,292 Q458,298 422,292 Q392,285 382,275 Z" />
            <path d="M540,245 Q570,235 610,232 Q645,238 660,252 Q662,268 648,278 Q618,285 582,278 Q552,270 542,258 Z" />
            <path d="M700,262 Q730,250 770,248 Q805,252 820,265 Q822,280 808,290 Q778,296 742,290 Q712,282 702,272 Z" />
            <path d="M50,320 Q80,310 120,308 Q155,312 168,325 Q170,340 158,350 Q128,358 92,352 Q60,345 50,332 Z" />
            <path d="M190,310 Q220,300 260,298 Q295,302 310,315 Q312,330 298,340 Q268,348 232,342 Q200,335 190,322 Z" />
            <path d="M330,295 Q360,285 400,282 Q435,288 450,302 Q452,318 438,328 Q408,336 372,330 Q340,322 332,308 Z" />
            <path d="M470,280 Q500,270 540,268 Q575,272 590,285 Q592,300 578,310 Q548,318 512,312 Q480,305 472,292 Z" />
            <path d="M620,275 Q650,265 690,262 Q725,268 740,282 Q742,298 728,308 Q698,315 662,310 Q630,302 622,288 Z" />
            <path d="M770,272 Q800,262 840,260 Q875,265 890,278 Q892,294 878,304 Q848,312 812,306 Q780,298 772,285 Z" />
            <path d="M920,290 Q950,278 990,275 Q1025,280 1040,295 Q1042,312 1028,322 Q998,330 962,324 Q930,315 922,302 Z" />
            <path d="M200,350 Q230,340 270,338 Q305,342 320,355 Q322,370 308,380 Q278,388 242,382 Q210,375 200,362 Z" />
            <path d="M340,340 Q370,330 410,328 Q445,332 460,345 Q462,360 448,370 Q418,378 382,372 Q350,365 342,352 Z" />
            <path d="M480,328 Q510,318 550,315 Q585,320 600,335 Q602,350 588,360 Q558,368 522,362 Q490,355 482,342 Z" />
            <path d="M630,318 Q660,308 700,305 Q735,310 750,325 Q752,340 738,350 Q708,358 672,352 Q640,345 632,332 Z" />
            <path d="M780,315 Q810,305 850,302 Q885,308 900,322 Q902,338 888,348 Q858,356 822,350 Q790,342 782,328 Z" />
            <path d="M180,385 Q210,375 250,372 Q285,378 300,392 Q302,408 288,418 Q258,426 222,420 Q190,412 182,398 Z" />
            <path d="M320,375 Q350,365 390,362 Q425,368 440,382 Q442,398 428,408 Q398,416 362,410 Q330,402 322,388 Z" />
            <path d="M460,360 Q490,350 530,348 Q565,352 580,368 Q582,384 568,394 Q538,402 502,396 Q470,388 462,372 Z" />
            <path d="M600,352 Q630,342 670,340 Q705,345 720,360 Q722,376 708,386 Q678,394 642,388 Q610,380 602,365 Z" />
            <path d="M750,350 Q780,340 820,338 Q855,342 870,358 Q872,374 858,384 Q828,392 792,386 Q760,378 752,362 Z" />
            <path d="M260,420 Q290,410 330,408 Q365,412 380,428 Q382,444 368,454 Q338,462 302,456 Q270,448 262,432 Z" />
            <path d="M400,412 Q430,402 470,400 Q505,405 520,420 Q522,436 508,446 Q478,454 442,448 Q410,440 402,425 Z" />
            <path d="M550,405 Q580,395 620,392 Q655,398 670,412 Q672,428 658,438 Q628,446 592,440 Q560,432 552,418 Z" />
            <path d="M700,400 Q730,390 770,388 Q805,392 820,408 Q822,424 808,434 Q778,442 742,436 Q710,428 702,412 Z" />
            <path d="M880,420 Q910,408 950,405 Q980,412 990,428 Q988,445 970,452 Q940,458 910,450 Q888,442 882,430 Z" />
            <path d="M120,200 Q140,185 170,180 Q195,185 205,200 Q210,220 200,240 Q185,255 160,258 Q135,255 122,240 Q115,220 120,200 Z" />
            <path d="M125,260 Q145,250 170,248 Q190,255 198,270 Q200,288 190,300 Q170,308 148,305 Q130,298 125,282 Z" />
            <path d="M450,160 Q470,148 500,145 Q525,150 535,165 Q538,182 528,195 Q510,202 488,198 Q465,192 455,178 Q448,168 450,160 Z" />
            <path d="M448,200 Q468,190 498,188 Q522,195 532,210 Q535,228 522,240 Q502,248 480,242 Q458,235 448,220 Q445,210 448,200 Z" />
            <path d="M445,245 Q465,235 495,232 Q518,240 528,255 Q530,272 518,282 Q498,290 478,285 Q458,278 448,265 Q442,255 445,245 Z" />
            <path d="M440,288 Q460,278 490,275 Q512,282 522,298 Q524,315 512,325 Q492,332 472,328 Q452,320 442,308 Z" />
            <path d="M442,332 Q462,322 490,320 Q510,328 518,342 Q515,358 502,365 Q482,370 462,365 Q445,358 440,345 Z" />
            <path d="M200,80 Q220,60 260,55 Q290,58 310,70 Q320,85 315,100 Q305,110 280,112 Q255,108 230,100 Q210,92 200,80 Z" />
            <path d="M210,105 Q235,95 265,92 Q290,98 302,112 Q308,128 295,140 Q275,148 250,145 Q228,138 215,125 Q208,115 210,105 Z" />
            <path d="M220,148 Q245,138 275,135 Q298,142 308,158 Q312,175 300,188 Q280,196 255,192 Q232,185 220,170 Q215,158 220,148 Z" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
{t('timeline.title.part1')} <span className="text-green-600">{t('timeline.title.part2')}</span>
          </h2>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Central horizontal axis */}
          <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-green-500 -translate-y-1/2 hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {milestones.map((item, i) => {
              const isTop = i % 2 === 0

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  className="relative flex flex-col items-center"
                >
                  {/* Content - alternating top/bottom */}
                  <div className={`w-full ${isTop ? 'order-1 mb-8' : 'order-3 mt-8'}`}>
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      {/* Title */}
                      <h3 className="text-xs md:text-sm font-bold tracking-[0.15em] text-green-600 mb-2">
                        {item.title}
                      </h3>
                      {/* Divider */}
                      <div className="h-px w-8 bg-green-500/40 mb-3" />
                      {/* Description */}
                      <div className="space-y-2">
                        {item.content.map((p, pi) => (
                          <p key={pi} className="text-[11px] md:text-[13px] text-gray-600 leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Year marker on axis */}
                  <div className={`order-2 z-10 ${isTop ? 'mb-auto' : 'mt-auto'}`}>
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-[3px] border-green-500 flex items-center justify-center shadow-sm">
                      <span className="text-base md:text-xl font-bold text-green-600">{item.year}</span>
                    </div>
                  </div>


                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: stacked timeline */}
        <div className="md:hidden mt-8 space-y-10">
          {milestones.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pl-10"
            >
              {/* Vertical line */}
              <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-green-200" />

              {/* Dot */}
              <div className="absolute left-[7px] top-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow z-10" />

              {/* Year */}
              <span className="text-sm font-bold text-green-600 mb-1 block">{item.year}</span>

              {/* Content */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-xs font-bold tracking-[0.12em] text-green-600 mb-2">{item.title}</h3>
                <div className="h-px w-6 bg-green-500/40 mb-2" />
                <div className="space-y-1.5">
                  {item.content.map((p, pi) => (
                    <p key={pi} className="text-xs text-gray-600 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
