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
    <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Menu<span className="text-orange-500">Sparks</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">
              Pricing
            </Link>
            <Link href="/calculator" className="text-gray-600 hover:text-orange-500 transition-colors">
              Calculator
            </Link>
            <Link href="/referral" className="text-gray-600 hover:text-orange-500 transition-colors">
              Referrals
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-orange-500 transition-colors">
              Dashboard Demo
            </Link>
            <Link href="#pricing" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105">
              Start Free Trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-orange-500"
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
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <Link href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                  How It Works
                </Link>
                <Link href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </Link>
                <Link href="/calculator" className="block px-3 py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                  Calculator
                </Link>
                <Link href="/referral" className="block px-3 py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                  Referrals
                </Link>
                <Link href="/login" className="block px-3 py-2 text-gray-600 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                  Dashboard Demo
                </Link>
                <Link href="#pricing" className="block mx-3 my-2 py-2 px-4 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600" onClick={() => setIsMenuOpen(false)}>
                  Start Free Trial
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
  )
}