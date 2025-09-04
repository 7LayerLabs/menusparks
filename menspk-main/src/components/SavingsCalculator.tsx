export default function SavingsCalculator() {
  const calculations = [
    {
      revenue: 500000,
      foodCost: 160000, // 32% of revenue
      waste: 11200, // 7% of food cost
      spoilage: 2352, // 21% of waste
      savings: 5600 // 50% waste reduction
    },
    {
      revenue: 750000,
      foodCost: 240000, // 32% of revenue
      waste: 16800, // 7% of food cost
      spoilage: 3528, // 21% of waste
      savings: 8400 // 50% waste reduction
    },
    {
      revenue: 1000000,
      foodCost: 320000, // 32% of revenue
      waste: 22400, // 7% of food cost
      spoilage: 4704, // 21% of waste
      savings: 11200 // 50% waste reduction
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatRevenue = (amount: number) => {
    return amount >= 1000000 ? `$${amount / 1000000}M` : `$${amount / 1000}k`
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              See Your Potential Savings
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-3">
              Industry averages: 32% food cost, 7% waste rate, 21% from spoilage
            </p>
            <p className="text-lg text-orange-400 font-semibold">
              We help you use inventory BEFORE it expires - turning waste into profit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {calculations.map((calc, index) => (
              <div key={index} className="relative bg-gray-800/90 backdrop-blur rounded-xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatRevenue(calc.revenue)}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">
                    Annual Revenue
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">Food Budget</span>
                    <span className="text-lg font-semibold text-gray-300">
                      {formatCurrency(calc.foodCost)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">Total Annual Waste</span>
                    <span className="text-lg font-semibold text-red-500">
                      -{formatCurrency(calc.waste)}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <div className="border-2 border-orange-500 rounded-lg px-3 py-3 bg-orange-500/10">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-orange-300 font-semibold text-sm">Spoilage & Expiration (21%)</span>
                        <span className="text-lg font-bold text-orange-400">
                          -{formatCurrency(calc.spoilage)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        Poor FIFO rotation, expired products, excess inventory
                      </p>
                      <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold text-center">
                        👉 THIS IS WHERE WE HELP!
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg p-6 border border-green-500/50">
                  <div className="text-center">
                    <div className="text-sm uppercase tracking-wide text-green-400 mb-2">
                      Your Annual Savings
                    </div>
                    <div className="text-4xl font-bold text-green-400">
                      +{formatCurrency(calc.savings)}
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      back in your pocket
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center text-sm text-orange-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Eliminate spoilage waste
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-800/90 rounded-xl p-6 border border-gray-700 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Based on NRA data: 21% of all food waste comes from spoilage & expiration
            </p>
            <p className="text-lg font-semibold text-orange-400">
              MenuSparks creates specials using inventory BEFORE it expires - eliminating this waste
            </p>
            <a href="/calculator" className="mt-6 inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all transform hover:scale-105">
              Calculate My Exact Savings
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}