'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated (for now, check localStorage)
    // In production, this would verify with Stripe/Supabase
    const checkAuth = async () => {
      // Temporary: Check if they came from success page or have session
      const hasSession = localStorage.getItem('menusparks_session')
      const email = localStorage.getItem('menusparks_customer_email')
      
      if (hasSession && email) {
        setIsAuthenticated(true)
        setCustomerEmail(email)
      } else {
        // Redirect to pricing if not authenticated
        router.push('/#pricing')
      }
      setLoading(false)
    }
    
    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MenuSparks Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {customerEmail}</p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('menusparks_session')
                  localStorage.removeItem('menusparks_customer_email')
                  router.push('/')
                }}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* AI Recipe Generator Card */}
          <Link href="/dashboard/generator" className="group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-orange-500">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Recipe Generator</h3>
              <p className="text-gray-600 text-sm mb-4">
                Generate custom specials instantly based on your inventory and equipment
              </p>
              <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors">
                <span className="text-sm font-medium">Generate Specials</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Weekly Specials History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recipe History</h3>
            <p className="text-gray-600 text-sm mb-4">
              View and reuse your previously generated specials
            </p>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

          {/* Settings & Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 opacity-60 cursor-not-allowed">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Restaurant Profile</h3>
            <p className="text-gray-600 text-sm mb-4">
              Manage your restaurant details and preferences
            </p>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Impact This Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-green-600">$0</p>
              <p className="text-sm text-gray-600 mt-1">Estimated Savings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">0</p>
              <p className="text-sm text-gray-600 mt-1">Specials Generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-600">0 lbs</p>
              <p className="text-sm text-gray-600 mt-1">Food Waste Reduced</p>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              Click "AI Recipe Generator" to create your first specials
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              Upload your inventory list or manually enter ingredients
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              Select your kitchen equipment and preferences
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              Generate and customize your weekly specials instantly
            </li>
          </ol>
        </div>
      </main>
    </div>
  )
}