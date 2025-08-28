'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Set authentication for dashboard access
    if (sessionId) {
      localStorage.setItem('menusparks_session', sessionId)
      // In production, fetch customer email from Stripe
      localStorage.setItem('menusparks_customer_email', 'customer@menusparks.com')
    }
  }, [sessionId])

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="py-20 bg-black">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to MenuSparks! 🎉
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Your subscription is active. Check your email for next steps.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                What Happens Next?
              </h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Check Your Email</h3>
                    <p className="text-gray-400">We've sent you a welcome email with your account details and getting started guide.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Complete Your Restaurant Profile</h3>
                    <p className="text-gray-400">Tell us about your restaurant, menu style, and inventory so we can create perfect specials for you.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Get Your First Specials</h3>
                    <p className="text-gray-400">Your first batch of AI-generated specials will be delivered within 24 hours of profile completion.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-6 mb-8">
              <p className="text-blue-400 font-semibold mb-2">
                📧 Didn't receive an email?
              </p>
              <p className="text-gray-300 mb-4">
                Check your spam folder or contact us at admin@menusparks.com
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link href="/" className="btn-secondary">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}