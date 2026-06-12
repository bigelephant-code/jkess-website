'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#010101] border-t border-white/[0.03] py-8">
      {/* Top gradient line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2">
          <p className="text-xs text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Shenzhen Nengyi Electronic Technology Co., Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1 whitespace-nowrap">
            Powering a Cleaner Future <Heart size={10} className="text-[#f58a8a]" />
          </p>
        </div>
      </div>
    </footer>
  )
}
