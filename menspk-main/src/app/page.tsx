import { Suspense } from 'react'
import Header from '@/components/Header'
import HeroClean from '@/components/HeroClean'
import FeaturesGrid from '@/components/FeaturesGrid'
import SavingsCalculator from '@/components/SavingsCalculator'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Clean Hero Section */}
      <Suspense fallback={<div className="py-20 bg-white" />}>
        <HeroClean />
      </Suspense>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Your Kitchen Into a <span className="text-orange-600">Creative Hub</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MenuSparks is your intelligent recipe generation platform that creates innovative menu specials 
              from your existing inventory - powered by advanced algorithms and culinary expertise.
            </p>
          </div>

          {/* Feature Boxes */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Recipe Generation</h3>
              <p className="text-gray-600">
                Generate creative, delicious recipes based on your inventory. Our system analyzes ingredients 
                and creates specials that reduce waste while delighting customers.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Recipe Development</h3>
              <p className="text-gray-600">
                Transform everyday ingredients into extraordinary dishes. Our culinary expertise ensures every 
                recipe is both innovative and perfectly suited to your kitchen's capabilities.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Implementation</h3>
              <p className="text-gray-600">
                Recipes come with prep instructions, scaling tips, and even social media posts. 
                From generation to service in minutes, not hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Complete Recipe Management Dashboard
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">24 Restaurant Styles</h3>
                    <p className="text-gray-600">From Classic American to Vegan, generate recipes that match your restaurant's identity</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">14 Recipe Categories</h3>
                    <p className="text-gray-600">Breakfast, lunch, dinner, appetizers, desserts, and everything in between</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Professional Output</h3>
                    <p className="text-gray-600">Three-phase recipes with prep, bulk prep, and service instructions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">10,000+ Classic Recipes by Decade</h3>
                    <p className="text-gray-600">From 1950s diner classics to modern fusion - twist old favorites or create something completely new and forward-thinking</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Custom Themes & Seasons</h3>
                    <p className="text-gray-600">Create specials for any occasion - Valentine's Day, Game Day, Summer BBQ, Oktoberfest, holidays, events, and more</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Smart Include/Exclude</h3>
                    <p className="text-gray-600">Hate mushrooms? Skip them! Too much turkey? Focus on it! Customize every recipe to your exact inventory and preferences</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">NEW: Idea Spark</h3>
                    <p className="text-gray-600">Work out any idea in your head - as detailed or basic as you want. Get suggestions, develop recipes, and modify until you create that 'ah ha!' moment!</p>
                  </div>
                </div>
              </div>
              <Link href="/login" className="inline-block mt-8 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
                Try Demo Dashboard →
              </Link>
            </div>
            <div className="relative">
              {/* Dashboard Screenshot Placeholder */}
              <div className="bg-gray-900 rounded-lg shadow-2xl p-4">
                <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">Dashboard Preview</p>
                    <p className="text-gray-500 text-sm">1200x800px Image</p>
                  </div>
                </div>
              </div>
              {/* Floating Feature Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 w-48">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-semibold text-sm">50+ Recipes</p>
                    <p className="text-xs text-gray-600">Generated This Week</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 w-48">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-semibold text-sm">$2,400 Saved</p>
                    <p className="text-xs text-gray-600">From Waste Reduction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Process */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            From Inventory to Income in <span className="text-orange-600">4 Simple Steps</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="mt-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">400x300px Image</p>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Input Your Inventory</h3>
                  <p className="text-gray-600 text-sm">Upload ingredient lists or manually select what you have on hand</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="mt-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">400x300px Image</p>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Set Your Style</h3>
                  <p className="text-gray-600 text-sm">Choose recipe types, complexity, and restaurant style preferences</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="mt-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">400x300px Image</p>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Generate Recipes</h3>
                  <p className="text-gray-600 text-sm">Our system creates innovative specials with full instructions</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="mt-4">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-gray-500 text-sm">400x300px Image</p>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Serve & Delight</h3>
                  <p className="text-gray-600 text-sm">Execute recipes with confidence and watch customers return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Everything You Need to <span className="text-orange-600">Maximize Menu Creativity</span>
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Our platform combines intelligent recipe generation with professional kitchen expertise
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Row 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">🍳</span>
              <h3 className="font-bold text-gray-900 mb-2">Multi-Style Generation</h3>
              <p className="text-sm text-gray-600">Create recipes for any cuisine style from American to Vegan</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">📝</span>
              <h3 className="font-bold text-gray-900 mb-2">Professional Formatting</h3>
              <p className="text-sm text-gray-600">Industry-standard recipe cards with yields and timings</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">♻️</span>
              <h3 className="font-bold text-gray-900 mb-2">Waste Reduction</h3>
              <p className="text-sm text-gray-600">Smart inventory usage to minimize food waste</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">📱</span>
              <h3 className="font-bold text-gray-900 mb-2">Social Media Ready</h3>
              <p className="text-sm text-gray-600">Auto-generated posts to promote your specials</p>
            </div>

            {/* Row 2 */}
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">⚙️</span>
              <h3 className="font-bold text-gray-900 mb-2">Equipment Matching</h3>
              <p className="text-sm text-gray-600">Recipes tailored to your kitchen equipment</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">📊</span>
              <h3 className="font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-gray-600">Track performance and identify best sellers</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">🔄</span>
              <h3 className="font-bold text-gray-900 mb-2">Recipe Scaling</h3>
              <p className="text-sm text-gray-600">Easily adjust portions from 10 to 100+ servings</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-lg p-6">
              <span className="text-3xl mb-4 block">💾</span>
              <h3 className="font-bold text-gray-900 mb-2">Export & Print</h3>
              <p className="text-sm text-gray-600">Download recipes in multiple formats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by <span className="text-orange-500">Intelligent Technology</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform leverages advanced algorithms and culinary databases to generate recipes 
              that are both creative and delicious - with the ability to pull from cutting-edge systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
              <p className="text-gray-400">Analyzes ingredient combinations and flavor profiles</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Precision Matching</h3>
              <p className="text-gray-400">Matches recipes to your specific inventory and equipment</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Continuous Learning</h3>
              <p className="text-gray-400">Improves recommendations based on your preferences</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Original Features Grid */}
      <FeaturesGrid />
      
      {/* How It Works - Process Steps */}
      
      {/* Savings Calculator */}
      <SavingsCalculator />
      
      {/* Pricing */}
      <Pricing />
      
      {/* Final Closer - Credibility + CTA */}
      <section className="pt-8 pb-4 bg-gray-900">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            {/* Credibility Quote */}
            <div className="text-center mb-8">
              <blockquote className="text-xl lg:text-2xl font-medium text-white mb-4 leading-relaxed">
                &quot;Built by Restaurant people for restaurant people.<br />
                <span className="text-orange-500 font-semibold">25+ years in kitchens, over 10 restaurants managed,</span><br />
                1 simple mission: help restaurants maximize creativity from existing inventory.&quot;
              </blockquote>
              <p className="text-lg text-gray-400 font-medium">
                - The MenuSparks Team
              </p>
            </div>
            
            {/* Final CTA Form */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}