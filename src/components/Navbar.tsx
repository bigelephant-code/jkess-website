'use client'

import { useState } from 'react'
import { Menu, X, ShoppingCart, Package } from 'lucide-react'
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
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
              className="relative text-lg tracking-wider font-medium text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-green-500 after:scale-x-0 after:origin-center after:transition-transform after:duration-[1000ms] hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}

          {/* Cart icon */}
          <a
            href="/cart"
            className="relative text-gray-300 hover:text-white transition-colors ml-4"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <a href="/cart" className="relative text-gray-300">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-lg tracking-wider font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="block text-center bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2.5 rounded-full transition-all"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  )
}
