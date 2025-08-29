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

      // For now, store in localStorage (later replace with actual backend)
      const emailData = {
        email,
        timestamp: new Date().toISOString(),
        source: 'hero_signup'
      }
      
      // Store locally
      const existingEmails = JSON.parse(localStorage.getItem('menusparks_emails') || '[]')
      existingEmails.push(emailData)
      localStorage.setItem('menusparks_emails', JSON.stringify(existingEmails))
      
      console.log('Email captured:', emailData)
      setToast({ message: '🎉 Success! We\'ll send you 3 free sample specials within 24 hours.', type: 'success' })
      setEmail('')
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
            
            {/* Comic Pain Point Section */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
              <div className="lg:text-left text-center max-w-md">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transform your back-of-house inventory into profit-driving specials. No extra items on your order, 
                  no grocery runs - just smart recipes using what's already in your kitchen.
                </p>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-orange-500 font-bold text-sm mb-2">We've All Been There...</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    You've got talented cooks, but when it comes to creating weekly specials? 
                    The creativity just isn't there. Same old ideas, week after week.
                  </p>
                </div>
              </div>
              <img 
                src="/images/comic.png" 
                alt="Restaurant kitchen pain point comic" 
                className="w-full max-w-sm lg:max-w-md h-auto object-contain rounded-lg shadow-xl"
              />
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                👨‍🍳 Grab Your Free Sample
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
                  Get My Sample Now!
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-2">
                No credit card needed. See real specials for YOUR restaurant.
              </p>
            </div>

            <div className="text-sm text-gray-400">
              <div className="flex flex-wrap justify-center gap-6 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  24-hour delivery guarantee
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
                  Social media ready
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