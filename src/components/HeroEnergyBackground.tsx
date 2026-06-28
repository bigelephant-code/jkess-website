const nodes = [
  { label: 'Solar', symbol: '☀', className: 'left-[5%] top-[48%]' },
  { label: 'Wind', symbol: '≈', className: 'left-[17%] top-[76%]' },
  { label: 'Grid', symbol: '⌁', className: 'left-[13%] top-[18%]' },
  { label: 'JKESS', symbol: 'JK', className: 'right-[10%] top-[18%]', strong: true },
  { label: 'Home', symbol: '⌂', className: 'right-[4%] top-[48%]' },
  { label: 'EV', symbol: '⚡', className: 'right-[17%] top-[76%]' },
]

export default function HeroEnergyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-[12%] top-[4%] h-[58vw] w-[58vw] max-h-[720px] max-w-[720px] rounded-full bg-green-400/[0.07] blur-3xl" />
      <div className="absolute bottom-[-24%] right-[2%] h-[54vw] w-[54vw] max-h-[680px] max-w-[680px] rounded-full bg-emerald-500/[0.06] blur-3xl" />
      <div className="hero-grid absolute inset-0 opacity-60" />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="hero-energy-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.08" />
            <stop offset="50%" stopColor="rgb(134 239 172)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0.08" />
          </linearGradient>
          <filter id="hero-energy-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[
          'M60 288 L860 108',
          'M180 456 L860 108',
          'M140 108 L860 108',
          'M140 108 L940 288',
          'M140 108 L830 456',
          'M860 108 L940 288',
          'M860 108 L830 456',
          'M940 288 L830 456',
        ].map((path, index) => (
          <path
            key={path}
            d={path}
            className="hero-energy-line"
            style={{ animationDelay: `${index * -0.45}s` }}
            stroke="url(#hero-energy-gradient)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        ))}
        <circle
          cx="860"
          cy="108"
          r="74"
          fill="none"
          stroke="rgb(74 222 128)"
          strokeOpacity="0.12"
          strokeWidth="2"
          className="hero-energy-pulse"
        />
        <circle cx="860" cy="108" r="4" fill="rgb(134 239 172)" filter="url(#hero-energy-glow)" />
      </svg>

      {nodes.map((node) => (
        <div
          key={node.label}
          className={`absolute hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-sm sm:flex ${node.className} ${
            node.strong
              ? 'border-green-300/45 bg-green-300/15 shadow-[0_0_35px_rgba(74,222,128,0.12)]'
              : 'border-green-300/25 bg-white/[0.06]'
          }`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-300/15 text-xs font-bold text-green-200">
            {node.symbol}
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-white/80">{node.label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-300/80 shadow-[0_0_8px_rgba(134,239,172,0.8)]" />
        </div>
      ))}
    </div>
  )
}
