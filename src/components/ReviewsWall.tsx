'use client'

import { motion } from 'framer-motion'

interface Review {
  name: string
  text: string
  color: string
  product: string
}

function maskName(name: string) {
  if (name.length <= 2) return name
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
}

const reviews: Review[] = [
  { name: 'James W.', text: 'Excellent BMS protection board — accurate voltage monitoring and easy to configure. Highly recommend for any DIY battery builder.', color: '#22c55e', product: 'BMS' },
  { name: 'Sarah M.', text: 'The battery kit exceeded my expectations. Easy installation with clear instructions. My off-grid system runs perfectly now!', color: '#5b5bff', product: 'Kit' },
  { name: 'Michael R.', text: 'Been using this BMS for 6 months in my solar setup. Rock solid performance, no issues at all. Great value for the price.', color: '#f58a8a', product: 'BMS' },
  { name: 'Emily T.', text: 'Outstanding customer support! They helped me configure the BMS parameters remotely. The product itself is top quality.', color: '#a66cd9', product: 'BMS' },
  { name: 'David K.', text: 'The 6U rack battery kit is perfect for my server room backup. Clean installation, communication via CAN bus works flawlessly.', color: '#06b6d4', product: 'Kit' },
  { name: 'Laura P.', text: 'Bought the battery kit with caster wheels — very well built, sturdy enclosure. LCD display shows all the info I need at a glance.', color: '#eab308', product: 'Kit' },
  { name: 'Robert S.', text: 'Upgraded my RV system with this BMS. Cell balancing function works great, battery health has improved significantly.', color: '#ec4899', product: 'BMS' },
  { name: 'Jessica L.', text: 'Fast shipping and well-packaged. The 15KWh battery kit arrived in perfect condition. Setting it up was straightforward.', color: '#14b8a6', product: 'Kit' },
  { name: 'Thomas B.', text: 'Best BMS I have used so far. The LCD screen is very informative, and the Bluetooth app makes monitoring easy.', color: '#f97316', product: 'BMS' },
  { name: 'Amanda C.', text: 'Using two 6U kits in parallel for our small business. 30KWh total, running smoothly for 3 months now. Very reliable.', color: '#8b5cf6', product: 'Kit' },
  { name: 'Daniel H.', text: 'The active balancing feature on this BMS is a game-changer. My battery pack voltages stay perfectly matched.', color: '#22c55e', product: 'BMS' },
  { name: 'Rachel N.', text: 'Excellent product for the price. The sheet metal enclosure looks professional and the IP54 rating gives peace of mind.', color: '#5b5bff', product: 'Kit' },
  { name: 'Christopher G.', text: 'Very impressed with the build quality. Communication via RS485 worked right out of the box with my inverter.', color: '#f58a8a', product: 'BMS' },
  { name: 'Megan P.', text: 'The whole system from BMS to battery kit works seamlessly together. JKESS has really thought of everything.', color: '#a66cd9', product: 'Kit' },
  { name: 'Andrew D.', text: 'Switched from another BMS brand to JKESS — night and day difference. Better features, better support, better price.', color: '#06b6d4', product: 'BMS' },
  { name: 'Katherine A.', text: 'Ordered the high voltage kit for our commercial project. Technical documentation was excellent and support responsive.', color: '#eab308', product: 'Kit' },
  { name: 'Patrick M.', text: 'The BMS parameters are easy to customize via the software. Perfect for my custom 48V battery bank setup.', color: '#ec4899', product: 'BMS' },
  { name: 'Nicole F.', text: 'Very happy with my purchase. The battery kit with caster wheels is a brilliant design — easy to move for maintenance.', color: '#14b8a6', product: 'Kit' },
  { name: 'Steven L.', text: 'Five stars all the way. The BMS protection board arrived with clear documentation and setup was quick.', color: '#f97316', product: 'BMS' },
  { name: 'Vanessa R.', text: 'After researching many options, JKESS was the best choice. Quality product, fast delivery, excellent communication.', color: '#8b5cf6', product: 'Kit' },
]

const colors = ['#ff6b6b', '#339af0', '#20c997', '#f06595', '#ff922b', '#7048e8', '#22c55e', '#eab308']

export default function ReviewsWall() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium mb-4 hover:border-gray-300 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Loved by Customers
          </a>
        </motion.div>
      </div>

      {/* ─── Scrolling reviews ─── */}
      <div className="space-y-6">
        {/* Row 1: scroll right to left */}
        <div className="relative overflow-hidden">
          <div className="flex gap-5 animate-scroll-left" style={{ animationDuration: '50s' }}>
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} index={i} />
            ))}
          </div>
        </div>

        {/* Row 2: scroll left to right */}
        <div className="relative overflow-hidden">
          <div className="flex gap-5 animate-scroll-right" style={{ animationDuration: '50s' }}>
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const avatarColor = colors[index % colors.length]
  const initial = review.name[0]

  return (
    <div
      className="flex-shrink-0 w-72 bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex flex-col justify-between"
      style={{ minHeight: '200px' }}
    >
      {/* Top: avatar + product badge */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: avatarColor }}
          >
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{maskName(review.name)}</p>
            <span className="text-[10px] text-gray-400">{review.product === 'BMS' ? 'BMS Protection Board' : 'Battery Kit'}</span>
          </div>
        </div>

        {/* Review text */}
        <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-4">
          {review.text}
        </p>
      </div>

      {/* Bottom: stars */}
      <div className="flex items-center gap-0.5 mt-4">
        {[...Array(5)].map((_, si) => (
          <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#1f2937">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    </div>
  )
}
