'use client'

import { useState } from 'react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'weekly' | 'annual'>('weekly')

  const tiers = [
    {
      name: "Newsletter Only",
      price: { weekly: 5, annual: 260 },
      description: "Stay informed with industry intelligence",
      features: [
        "Weekly market intelligence report",
        "Industry news digest", 
        "Regional market analysis",
        "Seasonal preparation guides",
        "Vendor pricing trends"
      ],
      popular: false,
      cta: "Start Newsletter"
    },
    {
      name: "Appetizer Tier",
      price: { weekly: 10, annual: 520 },
      description: "Basic special development for small restaurants",
      features: [
        "5-7 weekly specials with complete recipes",
        "Cost analysis and pricing suggestions", 
        "Basic social media captions",
        "Equipment requirement specifications",
        "Staff training notes",
        "Email support"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Entree Tier", 
      price: { weekly: 25, annual: 1300 },
      description: "Comprehensive service for established restaurants",
      features: [
        "7-10 weekly specials with premium recipes",
        "Advanced cost optimization",
        "Multi-platform social media content",
        "Customer dashboard access", 
        "Performance analytics",
        "Video preparation guides",
        "Priority email support"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Full Meal + Dessert",
      price: { weekly: 39, annual: 2028 },
      description: "Complete business optimization with POUR Plan",
      features: [
        "Everything in Entree Tier",
        "POUR Plan bar special development",
        "Custom market intelligence",
        "Vendor negotiation support",
        "Direct expert consultation",
        "Quarterly strategy sessions",
        "Phone support"
      ],
      popular: false,
      cta: "Schedule Consultation"
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Success Level
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start small and upgrade as you see the profit impact. All tiers include our 
            satisfaction guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'weekly'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual <span className="text-green-600 font-semibold">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-lg border-2 p-8 ${
                tier.popular
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${tier.price[billingCycle]}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{billingCycle === 'weekly' ? 'week' : 'year'}
                  </span>
                </div>

                {billingCycle === 'weekly' && (
                  <p className="text-sm text-gray-500">
                    ${(tier.price.weekly * 52).toLocaleString()}/year if paid weekly
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              100% Satisfaction Guarantee
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              If you&apos;re not completely satisfied with your specials in the first 30 days, 
              we&apos;ll refund your money. No questions asked. We&apos;ve been running restaurants 
              for 25+ years - we know what works.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}