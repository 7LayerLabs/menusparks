export default function GeneratorPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            AI-Powered Generator
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Take Full Control of Your Specials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our members get exclusive access to an AI-powered recipe generator that creates 
            custom specials based on YOUR inventory, equipment, and style.
          </p>
        </div>

        {/* Generator Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Mock Generator Interface */}
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-3 text-sm font-medium">MenuSparks AI Generator</span>
            </div>
            <span className="text-xs text-gray-400">Members Only</span>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Input Controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Input</h3>
                  
                  {/* Mock Input Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inventory Upload
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <span className="text-sm text-gray-500">inventory_list.csv uploaded</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recipe Style
                      </label>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm">Creative</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Classic</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">Hybrid</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Equipment Available
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Grill</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Fryer</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Oven</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Stovetop</span>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-orange-500 text-white rounded-lg font-semibold">
                      Generate Specials
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Sample Output */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Special</h3>
                
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Pan-Seared Chicken Marsala
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Tender chicken breast with wild mushrooms in rich Marsala wine sauce
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Using Your Inventory:</span>
                      <p className="text-sm text-gray-600">
                        • 2 lbs chicken breast (from your list)<br/>
                        • 8 oz mushrooms (from your list)<br/>
                        • Marsala wine, butter, herbs
                      </p>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Prep Time:</span>
                      <span className="text-sm text-gray-600 ml-2">15 minutes</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Food Cost:</span>
                      <span className="text-sm text-green-600 ml-2 font-semibold">$4.85 per plate</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Suggested Price:</span>
                      <span className="text-sm text-gray-900 ml-2 font-bold">$18.95</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <p className="text-xs text-gray-500">
                      Plus: Complete recipe, plating instructions, and social media copy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Instant Generation</h3>
            <p className="text-sm text-gray-600">Get 5-7 specials in under 30 seconds</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Perfect Match</h3>
            <p className="text-sm text-gray-600">Uses YOUR exact inventory and equipment</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Profit Optimized</h3>
            <p className="text-sm text-gray-600">Includes costs and suggested pricing</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            This powerful AI generator is included with all MenuSparks subscriptions
          </p>
          <a 
            href="#pricing"
            className="inline-flex items-center px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Get Access Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}