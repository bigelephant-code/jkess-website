'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'News', href: '#news' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Downloads', href: '/downloads' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const threshold = 10

      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) return

      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -120 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[97%] max-w-[1580px] bg-black/50 rounded-[17px] border border-white/[0.04]"
      >
        <div className="px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/images/jkess-logo-cropped.png"
              alt="JKESS"
              className="h-12 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-lg tracking-wider font-medium text-white/80 transition-colors duration-200
                  before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-0 before:w-0 before:h-[1px]
                  before:bg-green-500 before:rounded-full before:transition-all before:duration-300
                  hover:before:w-full"
              >
                <motion.span
                  className="flex"
                  initial="rest"
                  animate="rest"
                  variants={{
                    rest: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                    hover: { transition: { staggerChildren: 0.025 } }
                  }}
                  whileHover="hover"
                >
                  {link.label.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        rest: { y: 0, color: 'rgba(255,255,255,0.8)', transition: { duration: 0.2 } },
                        hover: {
                          y: -2,
                          color: '#22c55e',
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.span>
              </a>
            ))}

            {/* Cart icon */}
            <a
              href="/cart"
              className="relative text-white/60 hover:text-green-500 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <a href="/cart" className="relative text-white/60">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </a>
            <button className="text-white/80" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-black/70 border-t border-white/[0.04] px-6 py-5 space-y-4 rounded-b-[17px]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-lg tracking-wider font-medium text-white/80 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <motion.span
                  className="flex"
                  initial="rest"
                  animate="rest"
                  variants={{
                    rest: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                    hover: { transition: { staggerChildren: 0.025 } }
                  }}
                  whileHover="hover"
                >
                  {link.label.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        rest: { y: 0, color: 'rgba(255,255,255,0.8)', transition: { duration: 0.2 } },
                        hover: { y: -2, color: '#22c55e', transition: { duration: 0.2 } }
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.span>
              </a>
            ))}

            <a
              href="#contact"
              className="block text-center border border-white/20 hover:border-green-500 text-white/80 hover:text-green-500 font-normal px-6 py-2.5 rounded-[8px] transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </a>
          </div>
        )}
      </motion.nav>
  )
}
