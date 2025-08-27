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
              <a href="#how-it-works" className="btn-secondary inline-block">
                See How It Works
              </a>
            </div>
            
            <p className="text-lg text-gray-400">
              Built from 25+ years of real kitchen wisdom. Every restaurant gets personalized attention.
            </p>
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