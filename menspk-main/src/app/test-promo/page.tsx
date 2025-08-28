'use client'

import { useState } from 'react'

export default function TestPromoPage() {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('test@menusparks.com')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testValidation = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email, tier: 'weekly' })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Test Promo Code System</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Promo Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter promo code (e.g., FREEWEEK)"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <button
            onClick={testValidation}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Validation'}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Available Test Codes:</h3>
          <ul className="text-sm space-y-1">
            <li><strong>FREEWEEK</strong> - 7 days free trial</li>
            <li><strong>LAUNCH50</strong> - 50% off first month (max 100 uses)</li>
            <li><strong>NASHUA2025</strong> - 14 days free (Appetizer/Main only, max 50 uses)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}