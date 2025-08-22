'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurant: '',
    tier: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Basic validation
      if (!formData.name || !formData.email) {
        alert('Please fill in your name and email address')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address')
        return
      }

      // Store contact form data locally (replace with backend later)
      const contactData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'contact_form'
      }
      
      const existingContacts = JSON.parse(localStorage.getItem('menusparks_contacts') || '[]')
      existingContacts.push(contactData)
      localStorage.setItem('menusparks_contacts', JSON.stringify(existingContacts))
      
      console.log('Contact form submitted:', contactData)
      alert('🎉 Thank you! We&apos;ll get back to you within 24 hours.')
      
      setFormData({
        name: '',
        email: '',
        restaurant: '',
        tier: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Oops! Something went wrong. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Specials?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started today or ask us anything about how MenuSparks can help your restaurant.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@restaurant.com"
                  />
                </div>

                <div>
                  <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="restaurant"
                    name="restaurant"
                    value={formData.restaurant}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Restaurant Name"
                  />
                </div>

                <div>
                  <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-2">
                    Interested In
                  </label>
                  <select
                    id="tier"
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a tier</option>
                    <option value="newsletter">Newsletter Only ($5/week)</option>
                    <option value="appetizer">Appetizer Tier ($10/week)</option>
                    <option value="entree">Entree Tier ($25/week)</option>
                    <option value="full-meal">Full Meal + Dessert ($39/week)</option>
                    <option value="consultation">Just have questions</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your restaurant and any specific challenges you're facing with specials..."
                  />
                </div>

                <button type="submit" className="w-full btn-primary">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start Options</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600">📧</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Join the Waitlist</div>
                      <div className="text-gray-600 text-sm">Secure your spot for upcoming launch</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">15-Minute Consultation</div>
                      <div className="text-gray-600 text-sm">Free strategy call to discuss your needs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600">🚀</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">7-Day Free Trial</div>
                      <div className="text-gray-600 text-sm">Full service trial on any paid tier</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Response Times</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">General inquiries</span>
                    <span className="font-semibold text-gray-900">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waitlist confirmation</span>
                    <span className="font-semibold text-gray-900">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paid customers</span>
                    <span className="font-semibold text-gray-900">4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency support</span>
                    <span className="font-semibold text-gray-900">1 hour</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Still Not Sure?
                </h3>
                <p className="text-gray-600 mb-6">
                  We get it. Restaurant margins are tight and you can&apos;t afford another expense 
                  that doesn&apos;t deliver results. That&apos;s why we offer a satisfaction guarantee 
                  and are accepting limited restaurants to ensure quality service.
                </p>
                <div className="text-center">
                  <button className="btn-secondary">
                    Schedule a Free Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}