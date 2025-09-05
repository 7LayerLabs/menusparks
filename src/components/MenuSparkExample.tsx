'use client'

import { useState } from 'react'

export default function MenuSparkExample() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-20 bg-gray-800">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              This is a MenuSpark.
            </h2>
            <p className="text-xl text-gray-400">
              You get more than just an idea. You get a complete, ready-to-implement battle plan for a profitable special.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  MAIN COURSE • YEAR ROUND
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                Est. Food Cost: $4.80 | Suggested Price: $22.00
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              Spicy Honey-Glazed Chicken Thighs
            </h3>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Crispy skin-on chicken thighs with our signature spicy honey glaze, served with a cooling cilantro-lime crema 
              and charred corn salsa. A perfect balance of sweet, spicy, and smoky.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-6">
              <div>
                <div className="text-2xl font-bold text-orange-500">Low</div>
                <div className="text-gray-400 text-sm">Prep Complexity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">Standard</div>
                <div className="text-gray-400 text-sm">Equipment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">15 min</div>
                <div className="text-gray-400 text-sm">Est. Prep Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">20 min</div>
                <div className="text-gray-400 text-sm">Est. Cook Time</div>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span>{isExpanded ? 'Hide' : 'Show'} Full Recipe Details</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isExpanded && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-orange-500 mb-3">INGREDIENTS</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• 6 bone-in, skin-on chicken thighs</li>
                      <li>• 1/2 cup honey</li>
                      <li>• 2 tbsp chipotle in adobo, minced</li>
                      <li>• 1 lime, juiced</li>
                      <li>• 1/4 cup cilantro, chopped</li>
                      <li>• 1/2 cup sour cream or Greek yogurt</li>
                      <li>• 1 cup corn kernels</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-orange-500 mb-3">PREP NOTES</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>1. Season chicken thighs and sear skin-side down</li>
                      <li>2. Whisk together honey, chipotle, and lime juice for the glaze</li>
                      <li>3. Brush glaze over chicken and finish in 400°F oven for 15-20 minutes</li>
                      <li>4. Mix cilantro, lime juice, and sour cream for crema</li>
                      <li>5. Char corn in cast iron skillet until spots form</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-white mb-3">Social Media Post</h5>
                  <p className="text-gray-300 italic text-sm">
                    "Fire up the flavor! Our Spicy Honey-Glazed Chicken Thighs are calling your name. Sweet honey meets smoky chipotle with that perfect char-grilled kick. Served with cooling cilantro-lime crema because we care about your taste buds AND your sanity. Limited time only! #SpicyAndSweet #ChickenDoneRight #LocalEats"
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-white mb-3">Image Suggestion</h5>
                  <p className="text-gray-300 text-sm">
                    "A top-down shot on a dark slate plate. The glistening chicken thighs should be the hero, with the bright green cilantro crema and golden charred corn creating color contrast. Garnish with fresh lime wedges and a sprinkle of chopped cilantro. Shallow depth of field focusing on the chicken."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}