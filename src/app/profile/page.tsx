'use client'

import { useEffect, useState } from 'react'

export default function RestaurantProfilePage() {
  const [tallyUrl, setTallyUrl] = useState('')
  
  useEffect(() => {
    // Get email from localStorage if available
    const userEmail = localStorage.getItem('userEmail')
    
    // Replace with your actual Tally form ID
    const TALLY_FORM_ID = 'YOUR_TALLY_FORM_ID' // TODO: Replace with actual ID
    
    // Build URL with pre-filled email if available
    let formUrl = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
    
    if (userEmail) {
      formUrl += `&email=${encodeURIComponent(userEmail)}`
    }
    
    setTallyUrl(formUrl)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Complete Your Restaurant Profile
            </h1>
            <p className="text-orange-50">
              Help us understand your restaurant so we can create perfect specials tailored to your needs.
            </p>
          </div>
          
          {tallyUrl && (
            <div className="p-4">
              <iframe
                src={tallyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Restaurant Profile Form"
                style={{ 
                  minHeight: '800px',
                  background: 'transparent'
                }}
                allow="clipboard-write"
              />
            </div>
          )}
          
          {!tallyUrl && (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading form...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}