'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'weekly' | 'annual'>('weekly')
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (tier: typeof tiers[0]) => {
    if (tier.name === 'The Dessert') return // Coming soon
    
    const priceId = tier.priceId[billingCycle]
    if (!priceId) {
      alert('This plan is not yet configured. Please contact support.')
      return
    }

    setLoading(tier.name)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const tiers = [
    {
      name: "The Appetizer",
      price: { weekly: 10, annual: 420 },
      priceId: {
        weekly: process.env.NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY || '',
        annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_ANNUAL || ''
      },
      description: "Perfect starter for busy kitchens",
      features: [
        "3-5 weekly specials with complete recipes",
        "Prep complexity and timing guides", 
        "Equipment requirement specifications",
        "Email support"
      ],
      popular: false,
      cta: "Order Your App"
    },
    {
      name: "The Main Meal",
      price: { weekly: 20, annual: 840 },
      priceId: {
        weekly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY || '',
        annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_MAIN_ANNUAL || ''
      },
      description: "Full-service special development",
      features: [
        "5-7 weekly specials with premium recipes",
        "Detailed cost guidance and pricing help",
        "Complete social media content package",
        "Video preparation guides", 
        "Performance tracking",
        "Priority email support"
      ],
      popular: true,
      cta: "Order Your Meal"
    },
    {
      name: "The Dessert",
      price: { weekly: 35, annual: 1470 },
      priceId: {
        weekly: process.env.NEXT_PUBLIC_STRIPE_PRICE_DESSERT_WEEKLY || '',
        annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_DESSERT_ANNUAL || ''
      },
      description: "Main Meal + full access to The Pour Plan",
      features: [
        "Everything in The Main Meal",
        "Full access to The Pour Plan (our sister site)",
        "Alcoholic beverage specials & cocktails",
        "Bar profit optimization",
        "Direct expert consultation",
        "Phone support"
      ],
      popular: false,
      cta: "Grab Your Dessert"
    }
  ]

  const alaCarteOptions = [
    {
      name: "Industry Newsletter",
      price: "$5/week",
      description: "Market intelligence, pricing trends, and industry insights",
      highlight: false
    },
    {
      name: "Custom Newsletter",
      price: "$10/week",
      description: "Personalized market updates based on YOUR inventory and menu",
      highlight: true
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pick Your Perfect Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start small and upgrade as you see the profit impact. All tiers include our 
            satisfaction guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg font-medium ${billingCycle === 'weekly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Weekly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'weekly' ? 'annual' : 'weekly')}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                billingCycle === 'annual' ? 'bg-green-600' : 'bg-gray-400'
              }`}
              aria-label="Toggle billing cycle"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
              <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                SAVE 10 WEEKS
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-lg border-2 p-8 flex flex-col h-full ${
                tier.popular
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200'
              } ${tier.name === 'The Dessert' ? 'overflow-hidden' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Coming Soon Overlay for Dessert */}
              {tier.name === 'The Dessert' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                  <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-xl mb-3 shadow-xl">
                    🍰 COMING SOON
                  </div>
                  <p className="text-white text-sm font-medium px-4 text-center">
                    Something special is brewing...
                  </p>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                
                {tier.name !== 'The Dessert' ? (
                  <>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${tier.price[billingCycle]}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{billingCycle === 'weekly' ? 'week' : 'year'}
                      </span>
                    </div>

                    {billingCycle === 'weekly' && (
                      <p className="text-sm text-green-600 font-semibold">
                        Save ${((tier.price.weekly * 52) - tier.price.annual).toLocaleString()} with annual plan
                      </p>
                    )}
                    {billingCycle === 'annual' && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 line-through">
                          ${(tier.price.weekly * 52).toLocaleString()} if paid weekly
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          Get 10 Weeks FREE!
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mb-4 py-8">
                    <span className="text-2xl font-bold text-gray-400">
                      Price TBD
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
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
                onClick={() => handleCheckout(tier)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  tier.name === 'The Dessert'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
                disabled={tier.name === 'The Dessert' || loading === tier.name}
              >
                {loading === tier.name ? 'Loading...' : tier.name === 'The Dessert' ? 'Coming Soon' : tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* A La Carte Options */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">A La Carte Options</h3>
            <p className="text-gray-600">Need something specific? Try these individual services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {alaCarteOptions.map((option, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center border-2 border-blue-300">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h4>
                <div className="text-2xl font-bold text-orange-500 mb-2">{option.price}</div>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
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