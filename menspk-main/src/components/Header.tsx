'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="bg-black shadow-sm border-b border-gray-700">
      <nav className="section-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              Menu<span className="text-orange-500">Sparks</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="/referral" className="text-gray-300 hover:text-orange-500 transition-colors">
              🎁 Referrals
            </Link>
            <a href="mailto:admin@menusparks.com" className="text-gray-300 hover:text-orange-500 transition-colors">
              Contact
            </a>
            <Link href="/calculator" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
              Waste Calculator
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-orange-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-700">
              <Link href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/referral" className="block px-3 py-2 text-gray-300 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                🎁 Referrals
              </Link>
              <a href="mailto:admin@menusparks.com" className="block px-3 py-2 text-gray-300 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
              <Link href="/calculator" className="block px-3 py-2 text-gray-300 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Waste Calculator
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}