'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Toast from './Toast'
import { trackEvent } from '@/lib/analytics'

export default function Hero() {
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
    <section className="bg-white py-20">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left side - Text content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Something Good is
                <br />
                <span className="text-orange-500 block pb-2">Simmering</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
                <span className="text-red-500 font-bold">STOP!</span> adding to your inventory -
                <br />
                You already have ENOUGH
              </h2>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                MenuSparks turns your current inventory into creative specials. Stop adding items to your food order when you already have enough. 
                Restaurants throw away thousands of dollars worth of food each year, we help you serve it.
              </p>

              {/* Pain point box with red indicator */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-8 relative">
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

              <div className="mb-8">
                <a href="#how-it-works" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg inline-block transition-colors">
                  See How It Works
                </a>
              </div>
              
              <p className="text-lg text-gray-500">
                25+ years of real kitchen wisdom. Every restaurant gets personalized attention.
              </p>
            </div>

            {/* Right side - Comic image */}
            <div className="flex-1 lg:flex lg:justify-end lg:pt-16">
              <img 
                src="/images/comic.png" 
                alt="Restaurant kitchen pain point comic" 
                className="w-full rounded-lg shadow-xl"
                style={{ height: '650px', objectFit: 'contain' }}
              />
            </div>
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