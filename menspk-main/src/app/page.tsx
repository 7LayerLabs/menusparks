import { Suspense } from 'react'
import Header from '@/components/Header'
import HeroClean from '@/components/HeroClean'
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

      {/* Truth Section - Same Suppliers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-6">
              INDUSTRY SECRET
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                The Real Advantage Chains Have
              </h2>
              <p className="text-2xl text-gray-800 mb-6 font-bold">
                The real advantage chains have, are not better suppliers — it's better resources.
              </p>
              
              <div className="space-y-6 text-lg text-gray-700">
                <p className="leading-relaxed">
                  Chains don't have secret ingredients. They order from the same vendor catalogs as independents — 
                  <span className="font-semibold text-orange-600">Sysco, US Foods, PFG.</span>
                </p>
                
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">——</span>
                  <span className="px-3 text-gray-500 font-semibold">BUT</span>
                  <span className="text-gray-400">——</span>
                </div>
                
                <p className="leading-relaxed">
                  What they do have are <span className="font-semibold">corporate chef teams</span> and 
                  <span className="font-semibold"> volume pricing</span>—resources independents can't afford.
                </p>
              </div>
            </div>
            
            <div className="bg-orange-500 text-white rounded-xl p-6 transform hover:scale-105 transition-transform">
              <p className="text-xl font-bold">
                Now, one tool gives you the same creative firepower—without the corporate overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For - Personas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Who MenuSparks Is For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Owner */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <img src="/images/owner.png" alt="Restaurant Owner" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Restaurant Owners</h3>
              <p className="text-gray-600">
                "I need to reduce food costs and increase margins without hiring expensive consultants."
              </p>
              <div className="mt-4 text-sm text-orange-600 font-semibold">
                Save 30% on waste • Boost margins by 5-7%
              </div>
            </div>
            
            {/* Manager */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <img src="/images/kitchenmgr.png" alt="Kitchen Manager" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kitchen Managers</h3>
              <p className="text-gray-600">
                "I'm tired of scrambling for special ideas and watching inventory expire in the walk-in."
              </p>
              <div className="mt-4 text-sm text-orange-600 font-semibold">
                Save time from your busy schedule • Never run out of ideas • Look like a genius to your boss!
              </div>
            </div>
            
            {/* Line Cook */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <img src="/images/linecooks.png" alt="Line Cook" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Line Cooks</h3>
              <p className="text-gray-600">
                "I can execute any recipe perfectly, but creating new dishes from scratch? That's not my strength."
              </p>
              <div className="mt-4 text-sm text-orange-600 font-semibold">
                Focus on cooking • Leave creativity to us
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Purpose Statement */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Level the Playing Field for <span className="text-orange-600">Independent Restaurants</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Big chains have teams of corporate chefs. You have MenuSparks. We're here to give every 
              independent restaurant the creative firepower to compete and win.
            </p>
            <div className="mt-8 text-lg text-gray-700 font-medium">
              Because great food shouldn't be limited to those with deep pockets.
            </div>
          </div>

          {/* Hero Product Feature - Recipe Generation */}
          <div className="bg-white rounded-xl shadow-xl p-10 mt-12 border-2 border-orange-200">
            <div className="flex flex-col items-center text-center">
              <img src="/images/cookbook.png" alt="Recipe Generation" className="w-24 h-24 object-contain mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Recipe Generation That Actually Works
              </h3>
              <p className="text-gray-600 mb-4 max-w-3xl">
                Input your inventory. Select your style. Get professionally crafted recipes in seconds. 
                Draw from 10,000+ classics or create innovative new twists—complete with prep instructions, 
                portion sizes, plating notes, and even social posts.
              </p>
              <div className="text-left max-w-2xl mx-auto mb-4 space-y-2">
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <p className="text-gray-600">
                    <span className="font-semibold">Multi-Style Generation</span> — Create recipes for 24 restaurant styles and 14 categories.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <p className="text-gray-600">
                    <span className="font-semibold">Equipment Matching</span> — Tailors steps and techniques to your kitchen's gear.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  24 Restaurant Styles
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  14 Recipe Categories
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  10,000+ Classic Recipes (1950-2025)
                </span>
              </div>
              <p className="text-sm text-gray-500 italic mt-4">
                Never run the same special twice unless it sells so good you have no choice!
              </p>
            </div>
          </div>

          {/* Supporting Features */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center">
              <div className="w-12 h-12 mb-4 mx-auto">
                <img src="/images/whisk.png" alt="Creative Development" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Creative Recipe Development</h3>
              <p className="text-gray-600 text-sm mb-4">
                Transform everyday ingredients into extraordinary dishes. Our culinary expertise ensures every 
                recipe is both innovative and perfectly suited to your kitchen's capabilities.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                  Theme Specific Options
                </span>
                <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                  Creative New Options
                </span>
                <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                  Hybrid Recipe Fusion
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow text-center">
              <div className="w-12 h-12 mb-4 mx-auto">
                <img src="/images/tray.png" alt="Instant Implementation" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Implementation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Recipes come with prep instructions, scaling tips, and even social media posts. 
                From generation to service in minutes, not hours.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                  Include/Exclude Ingredients
                </span>
                <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                  Recipe Scaling
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Portal Feature Highlight */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              COMING SOON: THE ULTIMATE SOLUTION
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Private Recipe Web Portal
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              The long-term solution for managing all your generated specials. Each client gets their own secure login 
              to access their complete recipe database - never lose a special again.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 mb-3 mx-auto">
                  <img src="/images/secureaccess.png" alt="Secure Access" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Secure Access</h3>
                <p className="text-sm text-gray-600">Private login portal for each restaurant with encrypted data storage</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 mb-3 mx-auto">
                  <img src="/images/precisionmatching.png" alt="Recipe Database" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Recipe Database</h3>
                <p className="text-sm text-gray-600">All your generated specials saved and searchable for future use</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 mb-3 mx-auto">
                  <img src="/images/dualdatabase.png" alt="Dual Delivery" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Dual Delivery</h3>
                <p className="text-sm text-gray-600">Recipes sent via email AND stored in your portal for permanent access</p>
              </div>
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
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">🔐</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Private Web Portal</h3>
                    <p className="text-gray-600">Your own secure login to access all generated specials. Never lose a recipe - everything is saved in your personal database for future reference</p>
                  </div>
                </div>
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
                    <p className="text-gray-600">Export & print in multiple formats. Three-phase recipes with prep, bulk prep, and service instructions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Recipe Scaling</h3>
                    <p className="text-gray-600">Automatically adjust portions from 10 to 200 servings with proper ingredient ratios</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Waste Reduction</h3>
                    <p className="text-gray-600">Track inventory usage and get alerts for expiring ingredients to minimize waste</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Analytics Dashboard</h3>
                    <p className="text-gray-600">Track recipe performance, popular dishes, and cost analysis in real-time</p>
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
                    <h3 className="font-semibold text-gray-900">Idea Spark (New)</h3>
                    <p className="text-gray-600">Work out any idea in your head - as detailed or basic as you want. Get suggestions, develop recipes, and modify until you create that 'ah ha!' moment!</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-orange-600 font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Social Media Ready</h3>
                    <p className="text-gray-600">Auto-generated posts with descriptions and hashtags for Instagram, Facebook, and more</p>
                  </div>
                </div>
              </div>
              <Link href="/login" className="inline-block mt-8 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
                Try Demo Dashboard →
              </Link>
            </div>
            <div className="relative">
              {/* Dashboard Screenshot */}
              <div className="rounded-lg shadow-2xl overflow-hidden bg-gray-100">
                <img 
                  src="/images/demo.png" 
                  alt="MenuSparks Dashboard Preview" 
                  className="w-full h-auto rounded-lg object-contain"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Live Dashboard
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Recipe Generator
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Export & Print
                </span>
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
                  <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                    <img src="/images/inventory.png" alt="Input Your Inventory" className="w-full h-full object-contain" />
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
                  <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                    <img src="/images/style.png" alt="Set Your Style" className="w-full h-full object-contain" />
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
                  <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                    <img src="/images/creating.png" alt="Generate Recipes" className="w-full h-full object-contain" />
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
                  <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                    <img src="/images/chicken.png" alt="Serve & Delight" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Serve & Delight</h3>
                  <p className="text-gray-600 text-sm">Execute recipes with confidence and watch customers return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <SavingsCalculator />
      
      {/* Pricing */}
      <Pricing />
      
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
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-4">
                <img src="/images/smartanalysis.png" alt="Smart Analysis" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
              <p className="text-gray-400">Analyzes ingredient combinations and flavor profiles</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-4">
                <img src="/images/precisionmatching.png" alt="Precision Matching" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Precision Matching</h3>
              <p className="text-gray-400">Matches recipes to your specific inventory and equipment</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 p-4">
                <img src="/images/learning.png" alt="Continuous Learning" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Continuous Learning</h3>
              <p className="text-gray-400">Improves recommendations based on your preferences</p>
            </div>
          </div>
        </div>
      </section>
      
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