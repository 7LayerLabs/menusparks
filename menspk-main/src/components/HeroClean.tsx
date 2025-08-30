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
              <span className="text-orange-500 block">Creative Specials</span>
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
                href="#pricing" 
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 text-center shadow-lg"
              >
                Start Free Trial
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
                <span>FAST delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Comic and Pain Point */}
          <div className="relative flex flex-col items-center lg:items-end gap-2">
            {/* Pain Point Box with red indicator */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 max-w-md relative mb-2">
              <div className="absolute -top-3 -right-3 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-lg">!</span>
              </div>
              <p className="text-red-600 font-bold text-base mb-2 flex items-center">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                We've All Been There...
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                You've got talented cooks, but when it comes to creating weekly specials? 
                The creativity just isn't there. Same old ideas, week after week.
              </p>
            </div>
            
            {/* Comic Image - No white background */}
            <img 
              src="/images/comic.png" 
              alt="Restaurant kitchen pain point comic" 
              className="rounded-lg shadow-2xl"
              style={{ width: '100%', maxWidth: '600px', height: 'auto', objectFit: 'cover' }}
            />
            
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