'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Toast from './Toast'
import { trackEvent } from '@/lib/analytics'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isDark, setIsDark] = useState(false)
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    try {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setToast({ message: 'Please enter a valid email address', type: 'error' })
        return
      }

      // Send to Supabase via API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'hero_signup',
          referralCode: referralCode
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Track successful signup
        trackEvent('signup', { source: 'hero', referred: !!referralCode })
        
        // Show success with referral code if available
        if (data.referralCode) {
          setToast({ 
            message: `🎉 Welcome to MenuSparks! Your referral code is: ${data.referralCode}. Share it to earn rewards!`, 
            type: 'success' 
          })
        } else {
          setToast({ 
            message: '🎉 Welcome to MenuSparks! Check your email for next steps.', 
            type: 'success' 
          })
        }
        setEmail('')
      } else {
        console.error('Waitlist error:', data)
        setToast({ message: data.error || data.message || 'Oops! Something went wrong. Please try again.', type: 'error' })
      }
    } catch (error) {
      console.error('Error capturing email:', error)
      setToast({ message: 'Oops! Something went wrong. Please try again.', type: 'error' })
    }
  }

  return (
    <>
    <section className="bg-gradient-to-br from-black to-gray-900 py-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              <span className="text-red-500">Stop Wasting Money</span> Stocking
              <br />
              Shelves with Food That
              <br />
              <span className="gradient-text">Won't Sell</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-gray-300 mb-6 text-center">
              The average restaurant loses <span className="text-orange-500 font-bold">4-10% of sales</span> to food waste.
              <br />
              That's <span className="text-orange-500 font-bold">$5,600 to $11,200</span> thrown away every year.
            </h2>
            
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-8">
              <p className="text-lg text-yellow-200 text-center font-medium">
                🔥 <span className="font-bold">What if you could turn that waste into profit?</span> 🔥
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                👨‍🍳 Start Saving Today
              </h3>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@restaurant-email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="btn-secondary whitespace-nowrap">
                  Get Started Now
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-2">
                Built from 25+ years of real kitchen wisdom. Every restaurant gets personalized attention.
              </p>
            </div>

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