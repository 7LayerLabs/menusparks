import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">
              MenuSparks
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/calculator" className="text-gray-300 hover:text-white transition-colors">
                Calculator
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-8">
            Built By Restaurant People,
            <br />
            <span className="gradient-text">For Restaurant People</span>
          </h1>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">The Problem We Solve</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Every restaurant owner knows the squeeze: food costs are through the roof, 
                labor costs keep climbing, and the skilled talent you need - creative chefs, 
                experienced sous chefs - are priced beyond what most independent restaurants 
                can afford.
              </p>
              <p>
                Meanwhile, you're watching 4-10% of your food budget literally go in the trash. 
                That's thousands of dollars annually in pure waste, while you're trying to 
                compete with chains that have corporate chefs and menu development teams.
              </p>
              <p>
                <span className="text-orange-400 font-semibold">The result?</span> Small restaurant 
                owners are stuck between rising costs and limited creative resources, forced to 
                run the same specials week after week while inventory spoils in the walk-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">Why We Built MenuSparks</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                After 25+ years in real kitchens, we recognized a painful truth: independent 
                restaurants need the same creative firepower as the big chains, but can't 
                afford a $75K executive chef or consulting fees.
              </p>
              <p>
                Your line cooks are solid - they execute recipes perfectly. But creating new 
                specials that move inventory, calculating portion costs, writing enticing 
                descriptions? That takes a different skill set that's become prohibitively 
                expensive.
              </p>
              <p>
                <span className="text-green-400 font-semibold">Our solution:</span> Provide 
                the creative expertise of a seasoned chef at a fraction of the cost. Weekly 
                specials designed around YOUR inventory, complete with costing, prep instructions, 
                and marketing copy - everything you'd get from a high-end consultant, delivered 
                automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">Chef-Level Creativity, Line Cook Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-400 mb-3">What You Get</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Weekly special recipes using your existing inventory
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Complete cost breakdowns and margin analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Menu descriptions that actually sell
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Social media posts ready to share
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Focus on items nearing expiration
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400 mb-3">What You Save</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    $75K+ executive chef salary
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    $500+/day consulting fees
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Hours of menu development time
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Thousands in annual food waste
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Trial and error with new recipes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Promise to You</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">💰</div>
                <h3 className="text-xl font-semibold text-white mb-2">ROI Guarantee</h3>
                <p className="text-orange-100">
                  See savings in your first month or get your money back
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">👨‍🍳</div>
                <h3 className="text-xl font-semibold text-white mb-2">Limited Spots</h3>
                <p className="text-orange-100">
                  We limit memberships to ensure quality support for everyone
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Start Today</h3>
                <p className="text-orange-100">
                  No complex setup - get your first special in minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Bottom Line Section */}
      <section className="py-16 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">The Bottom Line</h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                You don't need another app. You don't need complex integrations. You need 
                creative menu solutions that move inventory and protect margins - the same 
                expertise big chains have, at a price that makes sense for independent operators.
              </p>
              <p className="font-semibold text-white">
                MenuSparks delivers chef-level creativity at line cook prices. Because every 
                restaurant deserves access to the tools that drive profitability.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/calculator" className="btn-primary text-center">
                Calculate Your Savings
              </Link>
              <Link href="/#pricing" className="btn-secondary text-center">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 MenuSparks. Built by restaurant people, for restaurant people.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}