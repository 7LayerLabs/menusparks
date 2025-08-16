'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-700">
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
            <Link href="#how-it-works" className="text-gray-300 hover:text-orange-500 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">
              Contact
            </Link>
            <button className="btn-primary">
              Get Started
            </button>
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-700">
              <Link href="#how-it-works" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                How It Works
              </Link>
              <Link href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Pricing
              </Link>
              <Link href="#about" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                About
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-300 hover:text-orange-500">
                Contact
              </Link>
              <div className="px-3 py-2">
                <button className="btn-primary w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}