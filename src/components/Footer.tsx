'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Shenzhen Nengyi Electronic Technology Co., Ltd. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="text-sm text-gray-400 flex items-center gap-1 whitespace-nowrap">
            Powering a Cleaner Future <Heart size={12} className="text-green-400" />
          </p>
        </div>
      </div>
    </footer>
  )
}
