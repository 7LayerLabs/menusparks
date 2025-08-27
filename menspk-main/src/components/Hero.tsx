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
    <section className="bg-gradient-to-br from-black to-gray-900 py-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Something Good is
              <br />
              <span className="gradient-text block text-center pb-2">Simmering</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300 mb-6 text-center">
              <span className="text-red-500 font-bold">STOP!</span> adding to your inventory -
              <br />
              You already have ENOUGH
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed text-center">
              Transform your back-of-house inventory into profit-driving specials. No extra items on your order, 
              no grocery runs - just smart recipes using what's already in your kitchen.
            </p>

            <div className="mb-8">
              <a href="#pricing" className="btn-secondary inline-block">
                See How It Works
              </a>
            </div>
            
            <p className="text-lg text-gray-400 mb-8">
              Built from 25+ years of real kitchen wisdom. Every restaurant gets personalized attention.
            </p>

            <div className="text-sm text-gray-400">
              <div className="flex flex-wrap justify-center gap-6 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  25+ years real kitchen experience
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Profit margins optimized
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant access to savings
                </div>
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