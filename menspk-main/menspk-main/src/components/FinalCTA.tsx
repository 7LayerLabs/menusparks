'use client'

import { useState } from 'react'
import Toast from './Toast'

export default function FinalCTA() {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setToast({ message: 'Please enter a valid email address', type: 'error' })
        return
      }

      const emailData = {
        email,
        timestamp: new Date().toISOString(),
        source: 'final_cta'
      }
      
      const existingEmails = JSON.parse(localStorage.getItem('menusparks_emails') || '[]')
      existingEmails.push(emailData)
      localStorage.setItem('menusparks_emails', JSON.stringify(existingEmails))
      
      setToast({ message: '🎉 Success! Check your email for your free sample specials within 24 hours.', type: 'success' })
      setEmail('')
    } catch (error) {
      console.error('Error capturing email:', error)
      setToast({ message: 'Oops! Something went wrong. Please try again.', type: 'error' })
    }
  }

  return (
    <>
      <div className="bg-gray-800 rounded-xl p-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to Stop Wasting Inventory?
        </h3>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join hundreds of restaurants saving thousands on food costs.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="your@restaurant-email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 px-8 rounded-lg transition-colors duration-200 whitespace-nowrap">
              Get Free Sample
            </button>
          </div>
        </form>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            24-hour delivery
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Cancel anytime
          </div>
        </div>
      </div>
      
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