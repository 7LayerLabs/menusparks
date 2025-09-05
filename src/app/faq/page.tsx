'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How quickly can you create specials for my restaurant?",
          answer: "We deliver complete specials within 48 hours of receiving your inventory list. For urgent needs, we offer same-day service for an additional fee."
        },
        {
          question: "What information do I need to provide?",
          answer: "Just send us your current inventory list, equipment available, any dietary restrictions or cuisine preferences, and restaurant type (fine dining, casual, food truck, etc.). Takes about 2 minutes to gather this info."
        },
        {
          question: "Do you work with all types of restaurants?",
          answer: "Yes! We've created specials for fine dining, casual restaurants, diners, food trucks, cafes, and bars. Our 25+ years of experience covers every restaurant format."
        }
      ]
    },
    {
      category: "Specials & Recipes",
      questions: [
        {
          question: "How many specials do you create per order?",
          answer: "We typically provide 5-7 complete specials per order, giving you options to choose what works best for your restaurant and customer base."
        },
        {
          question: "Are the recipes kitchen-tested?",
          answer: "Absolutely. Every recipe comes from our 25+ years of restaurant experience and 8,500+ item recipe database. We only provide recipes we've successfully executed in real kitchens."
        },
        {
          question: "Can you accommodate dietary restrictions?",
          answer: "Yes! We create gluten-free, vegetarian, vegan, keto, and other dietary-specific specials. Just let us know your requirements when submitting your inventory."
        },
        {
          question: "What if I don't have all the ingredients listed?",
          answer: "That's the point! We create specials specifically using what YOU already have in inventory. No additional purchasing required."
        }
      ]
    },
    {
      category: "Costs & Pricing",
      questions: [
        {
          question: "Do you provide exact food costs?",
          answer: "We provide preparation complexity, cook times, and portion guidance. Since ingredient costs vary by location and supplier, we help you calculate costs using your specific pricing."
        },
        {
          question: "How much money can this actually save me?",
          answer: "Restaurants typically waste 4-10% of their food budget annually. Our calculator shows potential savings, but many clients see $3,000-$10,000+ in annual waste reduction."
        },
        {
          question: "What's the cost of your service?",
          answer: "Our pricing varies based on restaurant size and frequency. Most clients find that selling just 1-2 specials pays for our entire service, turning the rest into pure profit."
        }
      ]
    },
    {
      category: "Marketing & Implementation",
      questions: [
        {
          question: "Do you provide marketing materials?",
          answer: "Yes! Every special includes social media copy, menu descriptions, server talking points, and photo styling suggestions. Everything you need to promote effectively."
        },
        {
          question: "How detailed are the preparation instructions?",
          answer: "Very detailed. We provide step-by-step prep instructions, cooking times, temperatures, plating suggestions, and allergen warnings. Your kitchen staff will have everything they need."
        },
        {
          question: "Can I modify the recipes?",
          answer: "Of course! These are starting points. Feel free to adjust seasonings, presentations, or portions to match your style and customer preferences."
        }
      ]
    },
    {
      category: "Business Operations",
      questions: [
        {
          question: "Will this work with my existing kitchen equipment?",
          answer: "We design specials specifically around the equipment you tell us you have. No need to buy new equipment - we work with your current setup."
        },
        {
          question: "How often can I order new specials?",
          answer: "As often as you'd like! Many restaurants order weekly or bi-weekly to keep their special offerings fresh and exciting for repeat customers."
        },
        {
          question: "What if my customers don't like a special?",
          answer: "While we have 25+ years of experience creating crowd-pleasers, taste is subjective. We provide multiple options so you can choose specials that fit your customer base best."
        },
        {
          question: "Can you help during busy seasons or special events?",
          answer: "Absolutely! Holiday specials, seasonal menus, and event-specific dishes are our specialty. Give us extra notice for major holidays or large events."
        }
      ]
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
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to know about turning your inventory into profitable specials
              </p>
            </div>

            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold text-orange-500 mb-6 border-b border-gray-700 pb-3">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const index = categoryIndex * 100 + questionIndex // Unique index
                    const isOpen = openIndex === index
                    
                    return (
                      <div key={questionIndex} className="bg-gray-900 rounded-lg border border-gray-700">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-800 transition-colors rounded-lg"
                        >
                          <h3 className="text-lg font-semibold text-white pr-4">
                            {faq.question}
                          </h3>
                          <svg 
                            className={`w-5 h-5 text-orange-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="mt-12 bg-gray-900 rounded-xl p-8 border border-gray-700 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-400 mb-6">
                Get personalized answers from our restaurant veterans
              </p>
              <button className="btn-secondary">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}