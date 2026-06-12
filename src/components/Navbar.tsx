'use client'

import { useState } from 'react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[97%] max-w-[1580px] bg-[#050505de] backdrop-blur-xl rounded-[17px] border border-white/[0.04]">
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
              className="relative text-base tracking-wider font-normal text-white/80 hover:text-[#7a7bff] transition-colors duration-200
                before:content-[''] before:absolute before:top-[calc(100%+2px)] before:left-0 before:w-0 before:h-[1px]
                before:bg-[#7a7bff] before:rounded-full before:transition-all before:duration-300
                hover:before:w-full"
            >
              {link.label}
            </a>
          ))}

          {/* Cart icon */}
          <a
            href="/cart"
            className="relative text-white/60 hover:text-[#7a7bff] transition-colors duration-200"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#7a7bff] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
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
              <span className="absolute -top-2 -right-2 bg-[#7a7bff] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
        <div className="md:hidden bg-[#050505] border-t border-white/[0.04] px-6 py-5 space-y-4 rounded-b-[17px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-base tracking-wider font-normal text-white/80 hover:text-[#7a7bff] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="block text-center border border-white/20 hover:border-[#7a7bff] text-white/80 hover:text-[#7a7bff] font-normal px-6 py-2.5 rounded-[8px] transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  )
}
