'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'onetime' | 'weekly' | 'monthly'>('monthly')
  const [loading, setLoading] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState<{
    message: string
    type: 'success' | 'error' | 'info' | null
    discount?: any
  }>({ message: '', type: null })
  const [validatedPromo, setValidatedPromo] = useState<any>(null)

  const validatePromoCode = async (email: string) => {
    if (!promoCode) {
      setPromoStatus({ message: 'Please enter a promo code', type: 'error' })
      return false
    }

    try {
      const response = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: promoCode, 
          email: email || 'checkout@menusparks.com',
          tier: billingCycle === 'weekly' ? 'weekly' : 'annual'
        })
      })

      const data = await response.json()
      
      if (data.valid) {
        setPromoStatus({ 
          message: data.message || 'Promo code applied!', 
          type: 'success',
          discount: data
        })
        setValidatedPromo(data)
        return true
      } else {
        setPromoStatus({ 
          message: data.message || 'Invalid promo code', 
          type: 'error' 
        })
        setValidatedPromo(null)
        return false
      }
    } catch (error) {
      setPromoStatus({ message: 'Error validating promo code', type: 'error' })
      return false
    }
  }

  const handleCheckout = async (tier: typeof tiers[0]) => {
    if (tier.name === 'The Dessert') return // Coming soon
    
    const priceId = tier.priceId[billingCycle]
    if (!priceId) {
      alert('This plan is not yet configured. Please contact support.')
      return
    }

    setLoading(tier.name)
    try {
      // Prepare checkout data
      const checkoutData: any = { 
        priceId,
        mode: billingCycle === 'onetime' ? 'payment' : 'subscription'
      }
      
      // If we have a validated promo, include it
      if (validatedPromo) {
        checkoutData.promoCode = promoCode
        checkoutData.promoData = validatedPromo
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
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
      name: "Quick Bite",
      price: { onetime: 15, weekly: 10, monthly: 35 },
      priceId: {
        onetime: process.env.NEXT_PUBLIC_STRIPE_PRICE_QUICK_BITE_ONETIME || '',
        weekly: process.env.NEXT_PUBLIC_STRIPE_PRICE_APPETIZER_WEEKLY || '',
        monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_QUICK_BITE_MONTHLY || ''
      },
      description: "Get instant recipes for your kitchen",
      features: [
        billingCycle === 'onetime' ? "5 recipes generated instantly" : "10-15 monthly recipes with complete instructions",
        "Ingredient usage optimization and scaling guides",
        "Prep complexity and timing guides", 
        "Equipment requirement specifications",
        billingCycle === 'onetime' ? "Download & use forever" : "Email support included"
      ],
      popular: false,
      cta: billingCycle === 'onetime' ? "Get Instant Recipes" : "Start Monthly Plan"
    },
    {
      name: "Chef's Choice",
      price: { onetime: 35, weekly: 20, monthly: 75 },
      priceId: {
        onetime: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHEF_CHOICE_ONETIME || '',
        weekly: process.env.NEXT_PUBLIC_STRIPE_PRICE_MAIN_WEEKLY || '',
        monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHEF_CHOICE_MONTHLY || ''
      },
      description: "Professional recipe development & optimization",
      features: [
        billingCycle === 'onetime' ? "15 premium recipes instantly" : "25-30 monthly premium recipes",
        "Advanced recipe customization and variations",
        "Complete social media content package",
        "Scaling guides for 10-200 portions", 
        "Performance tracking dashboard",
        billingCycle === 'onetime' ? "Export to PDF/Print" : "Priority email support"
      ],
      popular: true,
      cta: billingCycle === 'onetime' ? "Get Premium Pack" : "Go Professional"
    },
    {
      name: "Full Kitchen",
      price: { onetime: 75, weekly: 35, monthly: 140 },
      priceId: {
        onetime: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_KITCHEN_ONETIME || '',
        weekly: process.env.NEXT_PUBLIC_STRIPE_PRICE_DESSERT_WEEKLY || '',
        monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_KITCHEN_MONTHLY || ''
      },
      description: "Complete menu transformation package",
      features: [
        billingCycle === 'onetime' ? "30+ recipes across all categories" : "Unlimited recipe generation",
        "Full access to The Pour Plan (beverage recipes)",
        "Seasonal menu planning",
        "Inventory optimization algorithms",
        "Direct expert consultation",
        billingCycle === 'onetime' ? "30-day support included" : "Phone & video support"
      ],
      popular: false,
      cta: billingCycle === 'onetime' ? "Transform My Menu" : "Get Everything"
    }
  ]

  const alaCarteOptions = [
    {
      name: "Industry Newsletter",
      price: "$5/week",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_INDUSTRY || '',
      description: "Market intelligence, pricing trends, and industry insights",
      highlight: false
    },
    {
      name: "Custom Newsletter",
      price: "$10/week",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_NEWSLETTER_CUSTOM || '',
      description: "Personalized market updates based on YOUR inventory and menu",
      highlight: true
    }
  ]

  const handleNewsletterCheckout = async (option: typeof alaCarteOptions[0]) => {
    if (!option.priceId) {
      alert('This plan is not yet configured. Please contact support.')
      return
    }

    setLoading(option.name)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: option.priceId }),
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

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Recipe Generation Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get instant results with one-time purchases or save with our subscription plans. 
            Generate professional recipes in minutes, not hours.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <button
              onClick={() => setBillingCycle('onetime')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'onetime' 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              One-Time
              <span className="ml-2 text-xs opacity-90">Instant Access</span>
            </button>
            <button
              onClick={() => setBillingCycle('weekly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'weekly' 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
              <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">BEST VALUE</span>
            </button>
          </div>

          {/* Promo Code Input */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Have a promo code?"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase())
                  setPromoStatus({ message: '', type: null })
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase"
              />
              <button
                onClick={() => validatePromoCode('checkout@menusparks.com')}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Apply
              </button>
            </div>
            {promoStatus.message && (
              <p className={`mt-2 text-sm font-medium ${
                promoStatus.type === 'success' ? 'text-green-600' : 
                promoStatus.type === 'error' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {promoStatus.message}
                {promoStatus.type === 'success' && promoStatus.discount?.discount_type === 'free_trial' && (
                  <span className="block text-xs mt-1">
                    {promoStatus.discount.discount_value} days free trial will be applied at checkout
                  </span>
                )}
              </p>
            )}
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
              
              {/* Coming Soon Overlay for Full Kitchen */}
              {tier.name === 'Full Kitchen' && billingCycle !== 'onetime' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                  <div className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold text-xl mb-3 shadow-xl">
                    🍰 LAUNCHING SOON
                  </div>
                  <p className="text-white text-sm font-medium px-4 text-center">
                    Contact us for early access pricing
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
                        {billingCycle === 'onetime' ? 'one-time' : billingCycle === 'weekly' ? '/week' : '/month'}
                      </span>
                    </div>

                    {billingCycle === 'onetime' && (
                      <p className="text-sm text-orange-600 font-semibold">
                        Get recipes instantly - use forever!
                      </p>
                    )}
                    {billingCycle === 'weekly' && (
                      <p className="text-sm text-green-600 font-semibold">
                        Save ${Math.round((tier.price.weekly * 4.33) - tier.price.monthly)} with monthly plan
                      </p>
                    )}
                    {billingCycle === 'monthly' && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 line-through">
                          ${Math.round(tier.price.weekly * 4.33)} if paid weekly
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          Best Value!
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
                  (tier.name === 'Full Kitchen' && billingCycle !== 'onetime')
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : billingCycle === 'onetime'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
                disabled={(tier.name === 'Full Kitchen' && billingCycle !== 'onetime') || loading === tier.name}
              >
                {loading === tier.name ? 'Loading...' : (tier.name === 'Full Kitchen' && billingCycle !== 'onetime') ? 'Get Early Access' : tier.cta}
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
                <button 
                  onClick={() => handleNewsletterCheckout(option)}
                  disabled={loading === option.name}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading === option.name ? 'Loading...' : 'Subscribe Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}