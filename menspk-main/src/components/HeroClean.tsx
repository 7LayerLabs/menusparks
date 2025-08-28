'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Toast from './Toast'

export default function HeroClean() {
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for referral code in URL
    const ref = searchParams.get('ref')
    if (ref) {
      setReferralCode(ref.toUpperCase())
      // Validate the referral code
      fetch(`/api/referral/${ref}`)
        .then(res => res.json())
        .then(data => {
          if (data.valid) {
            setToast({ 
              message: `Welcome! ${data.message}`, 
              type: 'info' 
            })
          }
        })
        .catch(() => {})
    }
  }, [searchParams])

  return (
    <>
    <section className="bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            {/* Small Tag */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Stop Wasting Inventory
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Turn Excess Inventory Into
              <span className="text-orange-500 block">Profitable Specials</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              MenuSparks transforms your overstocked items into ready-to-execute specials 
              in less than 24 hours. Save <span className="font-semibold text-gray-900">$5,600-$11,200</span> annually 
              while delighting customers with fresh, creative dishes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/dashboard" 
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 text-center shadow-lg"
              >
                🎉 Try FREE Demo (Limited Time)
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-all text-center"
              >
                See How It Works
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>24-hour delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image/Visual */}
          <div className="relative">
            {/* Image Placeholder */}
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-8 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Restaurant special dish or kitchen scene"
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Average Annual Savings</p>
                      <p className="text-2xl font-bold text-green-600">$8,400</p>
                    </div>
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements for Visual Interest */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Live Dashboard</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👨‍🍳</span>
                <div>
                  <p className="text-xs text-gray-600">Built by chefs</p>
                  <p className="text-sm font-semibold text-gray-900">25+ years experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof Bar */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-8">Trusted by restaurants across the country</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
            {/* Restaurant Logo Placeholders */}
            <img src="/api/placeholder/120/40" alt="Restaurant Logo 1" className="h-8" />
            <img src="/api/placeholder/120/40" alt="Restaurant Logo 2" className="h-8" />
            <img src="/api/placeholder/120/40" alt="Restaurant Logo 3" className="h-8" />
            <img src="/api/placeholder/120/40" alt="Restaurant Logo 4" className="h-8" />
            <img src="/api/placeholder/120/40" alt="Restaurant Logo 5" className="h-8" />
          </div>
        </div>
      </div>
    </section>
    
    {toast && (
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(null)} 
      />
    )}
    </>
  )
}