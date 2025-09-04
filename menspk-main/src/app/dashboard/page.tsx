'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RecipeGenerator from '@/components/dashboard/RecipeGenerator'
import RecipeHistory from '@/components/dashboard/RecipeHistory'
import SavedRecipes from '@/components/dashboard/SavedRecipes'
import DashboardStats from '@/components/dashboard/DashboardStats'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('generate')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (placeholder for now)
    const checkAuth = () => {
      const userData = localStorage.getItem('user')
      if (!userData) {
        router.push('/login')
      } else {
        setUser(JSON.parse(userData))
      }
    }
    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                MenuSparks
              </h1>
              <span className="ml-3 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                Recipe Generator
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">Welcome back!</p>
                <p className="text-xs text-gray-500">Demo Mode</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('generate')}
              className={`py-4 px-6 border-b-3 font-semibold text-sm transition-all ${
                activeTab === 'generate'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center">
                <span className="text-lg mr-2">🚀</span>
                Generate Recipes
              </span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 border-b-3 font-semibold text-sm transition-all ${
                activeTab === 'history'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center">
                <span className="text-lg mr-2">📜</span>
                Recipe History
              </span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 px-6 border-b-3 font-semibold text-sm transition-all ${
                activeTab === 'saved'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center">
                <span className="text-lg mr-2">⭐</span>
                Saved Recipes
              </span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-6 border-b-3 font-semibold text-sm transition-all ${
                activeTab === 'stats'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center">
                <span className="text-lg mr-2">📊</span>
                Analytics
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'generate' && <RecipeGenerator />}
        {activeTab === 'history' && <RecipeHistory />}
        {activeTab === 'saved' && <SavedRecipes />}
        {activeTab === 'stats' && <DashboardStats />}
      </main>
    </div>
  )
}