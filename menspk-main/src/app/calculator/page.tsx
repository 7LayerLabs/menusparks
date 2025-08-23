'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Calculator() {
  const [annualSales, setAnnualSales] = useState('')
  const [foodCostPercent, setFoodCostPercent] = useState('')
  const [wastePercent, setWastePercent] = useState(7)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (annualSales && foodCostPercent) {
      setShowResults(true)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const sales = parseFloat(annualSales) || 0
  const foodCostPct = parseFloat(foodCostPercent) || 0
  const annualFoodBudget = sales * (foodCostPct / 100)
  const estimatedWaste = annualFoodBudget * (wastePercent / 100) // User-selected waste rate
  const potentialSavings = estimatedWaste * 0.5 // 50% reduction

  const wasteReasons = [
    {
      category: "Preparation Waste",
      percentage: "45%",
      description: "Trimming, peeling, over-prepping items that don't sell, poor yield calculations, kitchen mistakes"
    },
    {
      category: "Customer Plate Waste", 
      percentage: "34%",
      description: "Large portions, food customers don't finish, menu items that don't appeal (17% of meals left unfinished)"
    },
    {
      category: "Spoilage & Expiration",
      percentage: "21%",
      description: "Poor FIFO rotation, inadequate storage temperatures, buying too much inventory, expired products"
    }
  ]

  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="py-20 bg-black">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Food Waste Calculator
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover exactly how much money your restaurant is throwing away every year
              </p>
            </div>

            {/* Calculator Form */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="sales" className="block text-white font-semibold mb-2">
                      Annual Sales Revenue
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400 text-lg">$</span>
                      <input
                        type="number"
                        id="sales"
                        value={annualSales}
                        onChange={(e) => setAnnualSales(e.target.value)}
                        placeholder="500000"
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Your total annual revenue</p>
                  </div>

                  <div>
                    <label htmlFor="foodCost" className="block text-white font-semibold mb-2">
                      Food Cost Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="foodCost"
                        value={foodCostPercent}
                        onChange={(e) => setFoodCostPercent(e.target.value)}
                        placeholder="32"
                        min="20"
                        max="50"
                        step="0.1"
                        className="w-full pr-8 pl-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                      <span className="absolute right-3 top-3 text-gray-400 text-lg">%</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Industry average: 28-35%</p>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <label htmlFor="wastePercent" className="block text-white font-semibold mb-2">
                    Estimated Waste Percentage: {wastePercent}%
                  </label>
                  <input
                    type="range"
                    id="wastePercent"
                    min="4"
                    max="10"
                    step="0.5"
                    value={wastePercent}
                    onChange={(e) => setWastePercent(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>4% (Low waste)</span>
                    <span>7% (Average)</span>
                    <span>10% (High waste)</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Industry range: 4-10% • Median: 7%
                  </p>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Calculate My Food Waste
                  </button>
                </div>
              </form>
            </div>

            {/* Results */}
            {showResults && sales > 0 && foodCostPct > 0 && (
              <>
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Your Food Waste Analysis
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-500 mb-2">
                      {formatCurrency(annualFoodBudget)}
                    </div>
                    <div className="text-gray-300">Annual Food Budget</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {foodCostPct}% of {formatCurrency(sales)}
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-red-500 mb-2">
                      {formatCurrency(estimatedWaste)}
                    </div>
                    <div className="text-gray-300">Estimated Annual Waste</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {wastePercent}% waste rate
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gray-700 rounded-lg border-2 border-green-500">
                    <div className="text-3xl font-bold text-green-500 mb-2">
                      {formatCurrency(potentialSavings)}+
                    </div>
                    <div className="text-gray-300">Potential Annual Savings</div>
                    <div className="text-sm text-gray-400 mt-1">
                      With 50%+ waste reduction
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-orange-500/10 border border-orange-500 rounded-lg">
                  <p className="text-orange-400 text-lg font-semibold">
                    💰 You're potentially throwing away {formatCurrency(estimatedWaste/12)} every month!
                  </p>
                </div>
              </div>

              {/* NEW: Tiered Savings Scenarios */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Your MenuSparks ROI Potential
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="text-sm font-semibold text-gray-400 mb-1">Conservative</div>
                      <div className="text-2xl font-bold text-yellow-500">10% Reduction</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Annual Savings:</span>
                        <span className="text-white font-semibold">{formatCurrency(estimatedWaste * 0.1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Savings:</span>
                        <span className="text-white font-semibold">{formatCurrency(estimatedWaste * 0.1 / 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI with Main Meal:</span>
                        <span className="text-green-500 font-semibold">{Math.round(((estimatedWaste * 0.1) / 1040) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6 border-2 border-blue-500">
                    <div className="text-center mb-4">
                      <div className="text-sm font-semibold text-gray-400 mb-1">Realistic</div>
                      <div className="text-2xl font-bold text-blue-500">25% Reduction</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Annual Savings:</span>
                        <span className="text-white font-semibold">{formatCurrency(estimatedWaste * 0.25)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Savings:</span>
                        <span className="text-white font-semibold">{formatCurrency(estimatedWaste * 0.25 / 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI with Main Meal:</span>
                        <span className="text-green-500 font-semibold">{Math.round(((estimatedWaste * 0.25) / 1040) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="text-sm font-semibold text-gray-400 mb-1">Optimistic</div>
                      <div className="text-2xl font-bold text-green-500">50% Reduction</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Annual Savings:</span>
                        <span className="text-white font-semibold">{formatCurrency(estimatedWaste * 0.5)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Savings:</span>
                        <span className="text-white font-semibold">{formatCurrency(estimatedWaste * 0.5 / 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ROI with Main Meal:</span>
                        <span className="text-green-500 font-semibold">{Math.round(((estimatedWaste * 0.5) / 1040) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    📊 What MenuSparks Provides
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Weekly AI-generated specials targeting expiring inventory</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Social media content to promote specials</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Portion control recommendations</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>FIFO rotation reminders</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Prep quantity optimization</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Waste tracking dashboard</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spoilage Focus Section */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Targeting Your 21% Spoilage Waste
                </h2>
                
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-orange-500">
                      {formatCurrency(estimatedWaste * 0.21)}
                    </div>
                    <div className="text-gray-400">Lost annually to spoilage & expiration</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">This is where MenuSparks excels:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-green-500/20 rounded-full p-2 mr-3 flex-shrink-0">
                          <span className="text-green-500 text-lg">🥬</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">Produce About to Turn</div>
                          <div className="text-gray-400 text-sm">Transform into today's fresh special before it wilts</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-500/20 rounded-full p-2 mr-3 flex-shrink-0">
                          <span className="text-green-500 text-lg">🥩</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">Proteins Near Expiration</div>
                          <div className="text-gray-400 text-sm">Create premium specials that move high-cost items fast</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-500/20 rounded-full p-2 mr-3 flex-shrink-0">
                          <span className="text-green-500 text-lg">🧀</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">Dairy & Prepared Items</div>
                          <div className="text-gray-400 text-sm">Use in creative ways before they expire</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-green-500/10 border border-green-500 rounded-lg">
                  <p className="text-green-400 text-lg font-semibold mb-2">
                    💡 Even a 50% reduction in spoilage alone saves you {formatCurrency(estimatedWaste * 0.21 * 0.5)}/year
                  </p>
                  <p className="text-gray-400 text-sm">
                    That's {Math.round(((estimatedWaste * 0.21 * 0.5) / 1040) * 100)}% ROI on the Main Meal plan
                  </p>
                </div>
              </div>
              </>
            )}

            {/* Waste Breakdown */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Where Does Food Waste Come From?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wasteReasons.map((reason, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-orange-500">
                        {reason.category}
                      </h3>
                      <span className="text-sm font-bold text-gray-300 bg-gray-600 px-2 py-1 rounded">
                        {reason.percentage}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  💡 The MenuSparks Solution
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Most of these waste sources can be dramatically reduced by creating strategic specials 
                  from your existing inventory. Instead of letting ingredients spoil or over-ordering, 
                  we help you turn excess stock into profitable menu items before it becomes waste.
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Sources: WRAP Study, National Restaurant Association, Academic Research 2024-2025
                </p>
                <button className="btn-secondary">
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}