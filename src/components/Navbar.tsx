'use client'

import { useState } from 'react'
import { Menu, X, ShoppingCart, Package, ChevronDown } from 'lucide-react'
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#010101]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img
            src="/images/jkess-logo-cropped.png"
            alt="JKESS"
            className="h-12 w-auto brightness-0 invert transition-all duration-300 group-hover:opacity-80"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200
                after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px]
                after:bg-gradient-to-r after:from-[#5b5bff] after:to-[#f58a8a]
                after:transition-all after:duration-300 hover:after:w-4/5"
            >
              {link.label}
            </a>
          ))}

          {/* Products dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
              <Package size={15} />
              Shop
              <ChevronDown size={13} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-56 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
              <div className="absolute -top-1.5 right-8 w-3 h-3 bg-[#0a0a0a] border-t border-l border-white/10 rotate-45" />
              {[
                { label: '⚡ BMS Protection Board', href: '/products/bms-protection-board' },
                { label: '🔋 Battery Kit (With Caster)', href: '/products/battery-kit' },
                { label: '🔋 6U Battery Kit', href: '/products/6u-battery-kit' },
                { label: '🔌 High Voltage Kit', href: '/products/high-voltage-kit' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-all duration-150"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Cart icon */}
          <a
            href="/cart"
            className="relative ml-2 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ShoppingCart size={19} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-[#5b5bff] to-[#a66cd9] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <a href="/cart" className="relative text-gray-400">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#5b5bff] to-[#a66cd9] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
          <button className="text-white p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-5 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-400 hover:text-white transition-colors py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-white/5 pt-4 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-600 font-semibold">Products</p>
            {[
              { label: '⚡ BMS Protection Board', href: '/products/bms-protection-board' },
              { label: '🔋 Battery Kit (With Caster)', href: '/products/battery-kit' },
              { label: '🔋 6U Battery Kit', href: '/products/6u-battery-kit' },
              { label: '🔌 High Voltage Kit', href: '/products/high-voltage-kit' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-gray-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="block text-center bg-gradient-to-r from-[#5b5bff] to-[#a66cd9] hover:from-[#4a45f0] hover:to-[#8d50bf] text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  )
}
