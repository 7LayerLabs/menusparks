'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RestaurantProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    restaurantName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cuisineType: '',
    serviceType: [], // dine-in, takeout, delivery, catering
    averageTicket: '',
    seatingCapacity: '',
    inventory: '',
    challenges: '',
    preferredContact: 'email'
  })

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail')
    if (userEmail) {
      setProfile(prev => ({ ...prev, email: userEmail }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })

      if (response.ok) {
        // Redirect to dashboard or success page
        router.push('/profile-success')
      } else {
        alert('Failed to save profile. Please try again.')
      }
    } catch (error) {
      console.error('Profile save error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const cuisineTypes = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 
    'French', 'Mediterranean', 'Indian', 'Thai', 'Steakhouse',
    'Seafood', 'Pizza', 'Burgers', 'Cafe', 'Other'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Restaurant Profile
            </h1>
            <p className="text-gray-600">
              Help us understand your restaurant so we can create perfect specials tailored to your needs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.restaurantName}
                    onChange={(e) => setProfile({...profile, restaurantName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine Type *
                  </label>
                  <select
                    required
                    value={profile.cuisineType}
                    onChange={(e) => setProfile({...profile, cuisineType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select cuisine type</option>
                    {cuisineTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={(e) => setProfile({...profile, city: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={profile.state}
                      onChange={(e) => setProfile({...profile, state: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={profile.zipCode}
                      onChange={(e) => setProfile({...profile, zipCode: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Restaurant Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Types (check all that apply)
                  </label>
                  <div className="space-y-2">
                    {['Dine-In', 'Takeout', 'Delivery', 'Catering'].map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.serviceType.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProfile({...profile, serviceType: [...profile.serviceType, type]})
                            } else {
                              setProfile({...profile, serviceType: profile.serviceType.filter(t => t !== type)})
                            }
                          }}
                          className="mr-2 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Average Ticket Size
                    </label>
                    <select
                      value={profile.averageTicket}
                      onChange={(e) => setProfile({...profile, averageTicket: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select range</option>
                      <option value="under-15">Under $15</option>
                      <option value="15-30">$15 - $30</option>
                      <option value="30-50">$30 - $50</option>
                      <option value="50-75">$50 - $75</option>
                      <option value="over-75">Over $75</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seating Capacity
                    </label>
                    <input
                      type="number"
                      value={profile.seatingCapacity}
                      onChange={(e) => setProfile({...profile, seatingCapacity: e.target.value})}
                      placeholder="Number of seats"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory & Challenges */}
            <div className="pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Help Us Help You</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What ingredients do you frequently have excess of? (Optional)
                  </label>
                  <textarea
                    value={profile.inventory}
                    onChange={(e) => setProfile({...profile, inventory: e.target.value})}
                    placeholder="e.g., chicken breast, seasonal vegetables, pasta..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What are your biggest challenges? (Optional)
                  </label>
                  <textarea
                    value={profile.challenges}
                    onChange={(e) => setProfile({...profile, challenges: e.target.value})}
                    placeholder="e.g., food waste, menu variety, seasonal changes..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={profile.preferredContact}
                    onChange={(e) => setProfile({...profile, preferredContact: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving Profile...' : 'Complete Profile & Get Started'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                You'll receive your first batch of specials within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}