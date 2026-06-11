'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/images/jkess-logo.png"
              alt="JKESS"
              className="h-[300px] w-auto brightness-0 invert"
            />
          </a>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Shenzhen Nengyi Electronic Technology Co., Ltd. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Powering a Cleaner Future <Heart size={12} className="text-green-400" />
          </p>
        </div>
      </div>
    </footer>
  )
}
