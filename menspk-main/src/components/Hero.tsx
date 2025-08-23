'use client'

import { useState } from 'react'
import Toast from './Toast'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isDark, setIsDark] = useState(false)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)

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
          source: 'hero_signup'
        })
      })

      const data = await response.json()

      if (response.ok) {
        setToast({ message: '🎉 You\'re on the waitlist! We\'ll notify you when your spot opens up.', type: 'success' })
        setEmail('')
      } else {
        setToast({ message: data.message || 'Oops! Something went wrong. Please try again.', type: 'error' })
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

            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                👨‍🍳 Join the Waitlist
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
                  Join the Waitlist
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-2">
                Built from 25+ years of real kitchen wisdom. Limited spots available each month to ensure every restaurant gets personalized attention.
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
                  Limited spots per month
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