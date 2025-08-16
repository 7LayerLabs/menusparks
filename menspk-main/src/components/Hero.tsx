'use client'

import { useState } from 'react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isDark, setIsDark] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    try {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address')
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
      alert('🎉 Success! We&apos;ll send you 3 free sample specials within 24 hours.')
      setEmail('')
    } catch (error) {
      console.error('Error capturing email:', error)
      alert('Oops! Something went wrong. Please try again.')
    }
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Something New is
              <span className="text-orange-500"> Simmering</span>.
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300 mb-6">
              Stop Staring at Your Inventory.
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Get chef-driven specials from what you already have in stock—complete with 
              costing, detailed menu descriptions, and social media captions.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">
                🔥 Reserve Your Launch Deal
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
                  Reserve My Launch Deal
                </button>
              </form>
              <p className="text-sm text-gray-400 mt-2">
                No spam. Unsubscribe anytime. See exactly what we deliver.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                48-hour delivery guarantee
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Profit margins optimized
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Social media ready
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                This Week&apos;s Special Example:
              </h3>
              
              <div className="border-l-4 border-blue-500 pl-4 mb-6">
                <h4 className="font-bold text-xl text-white mb-2">
                  Autumn Harvest Stuffed Pork Chops
                </h4>
                <p className="text-gray-300 mb-3">
                  Thick-cut pork chops stuffed with apple sage stuffing, roasted root vegetables, 
                  maple bourbon glaze. Perfect for October comfort food cravings.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Food Cost:</span> $4.85
                  </div>
                  <div>
                    <span className="font-semibold">Suggested Price:</span> $16.95
                  </div>
                  <div>
                    <span className="font-semibold">Profit Margin:</span> 71%
                  </div>
                  <div>
                    <span className="font-semibold">Prep Time:</span> 15 min
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-2">Social Media Caption:</h5>
                <p className="text-sm text-gray-300 italic">
                  &quot;Fall comfort meets flavor explosion! 🍂 Our Autumn Harvest Stuffed Pork Chops 
                  are here for a limited time. House-made apple sage stuffing, seasonal root veggies, 
                  and that maple bourbon glaze that keeps you coming back. 
                  #ComfortFood #FallFlavors #LocalEats&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}