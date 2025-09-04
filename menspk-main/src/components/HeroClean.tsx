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
    <section className="relative bg-gradient-to-br from-gray-900 to-black py-20 lg:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            {/* Small Tag with Neon Glow */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/50 border border-blue-500/50 text-white text-sm font-semibold">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              PROFESSIONAL RECIPE CREATION
            </div>
            
            {/* Main Headline with Holographic Effect */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-white whitespace-nowrap">Line cooks can cook.</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 block">They can't create.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
              Independent kitchens struggle with fresh, profitable specials. Managers end up overspending 
              at Sysco or wasting food they already have. The creativity gap costs money and adds waste.
            </p>
            
            {/* CTA Buttons with Glow Effects */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a 
                href="#pricing" 
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 text-center shadow-xl"
              >
                Start Creating Specials
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 bg-gray-800/80 border border-gray-600 hover:border-gray-500 hover:bg-gray-700/80 text-white font-semibold rounded-lg transition-all text-center"
              >
                See How It Works
              </a>
            </div>
            
            {/* Trust Indicators - Tech Style */}
            <div className="flex justify-center gap-6 pt-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>INSTANT RECIPES</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>CHEF-LEVEL RESULTS</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Comic and Pain Point */}
          <div className="relative flex flex-col items-center lg:items-end gap-2">
            {/* Pain Point Box with Tech Styling */}
            <div className="bg-gray-800/90 backdrop-blur border border-gray-700 rounded-lg p-4 max-w-md relative mb-2">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-lg">!</span>
              </div>
              <p className="text-orange-400 font-bold text-base mb-2 flex items-center">
                <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
                Kitchen Creativity Gap Detected
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">
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