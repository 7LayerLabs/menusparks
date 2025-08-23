'use client'

import { useState } from 'react'
import Link from 'next/link'
import Toast from '@/components/Toast'

export default function ReferralPage() {
  const [email, setEmail] = useState('')
  const [referralData, setReferralData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)

  const checkReferralStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/customer/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setReferralData(data)
        setToast({ message: 'Referral stats loaded!', type: 'success' })
      } else {
        setToast({ message: data.error || 'Email not found. Join the waitlist first!', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Error loading referral stats', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setToast({ message: 'Copied to clipboard!', type: 'success' })
  }

  const shareOnTwitter = () => {
    const text = `I'm saving restaurants thousands on food costs with @MenuSparks! Join the waitlist with my code for priority access: `
    const url = referralData?.shareUrl
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = referralData?.shareUrl
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareOnFacebook = () => {
    const url = referralData?.shareUrl
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">
              MenuSparks
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Customer Referral Program
          </h1>
          <p className="text-xl text-gray-300">
            As a paying customer, earn free weeks when your referrals become subscribers!
          </p>
          <p className="text-sm text-orange-400 mt-2">
            ⭐ Exclusive benefit for active subscribers only
          </p>
        </div>

        {/* Rewards Structure */}
        <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-500 text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Subscribe</h3>
              <p className="text-gray-400">Become a paying customer to unlock referrals</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Share Your Code</h3>
              <p className="text-gray-400">Send to other restaurant owners</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Earn Rewards</h3>
              <p className="text-gray-400">Get 1 free week for each paying referral</p>
            </div>
          </div>
        </div>

        {/* Check Status Form */}
        {!referralData && (
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Check Your Referral Status</h2>
            <form onSubmit={checkReferralStatus} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your waitlist email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Loading...' : 'Check My Referral Status'}
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              Not a customer yet? <Link href="/#pricing" className="text-orange-500 hover:text-orange-400">View our pricing plans</Link>
            </p>
          </div>
        )}

        {/* Referral Dashboard */}
        {referralData && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Your Referral Dashboard</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-orange-100">Total Referrals</p>
                  <p className="text-4xl font-bold text-white">{referralData.totalReferrals}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-orange-100">Free Weeks Earned</p>
                  <p className="text-4xl font-bold text-white">{referralData.freeWeeks}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-orange-100">Next Reward In</p>
                  <p className="text-4xl font-bold text-white">{referralData.nextMilestone}</p>
                  <p className="text-sm text-orange-100">more referrals</p>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">Share Your Referral Link</h3>
              
              {/* Referral Code */}
              <div className="mb-6">
                <p className="text-gray-400 mb-2">Your Referral Code:</p>
                <div className="flex items-center gap-4">
                  <code className="text-2xl font-mono text-orange-500 bg-gray-800 px-4 py-2 rounded">
                    {referralData.referralCode}
                  </code>
                  <button
                    onClick={() => copyToClipboard(referralData.referralCode)}
                    className="btn-secondary"
                  >
                    Copy Code
                  </button>
                </div>
              </div>

              {/* Share URL */}
              <div className="mb-6">
                <p className="text-gray-400 mb-2">Your Unique Link:</p>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={referralData.shareUrl}
                    readOnly
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg"
                  />
                  <button
                    onClick={() => copyToClipboard(referralData.shareUrl)}
                    className="btn-secondary"
                  >
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={shareOnTwitter}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Share on LinkedIn
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Share on Facebook
                </button>
              </div>
            </div>

            {/* Sample Message */}
            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Sample Message to Share</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300 mb-4">
                  Hey! I found this tool that's helping restaurants save thousands on food costs. 
                  MenuSparks creates weekly specials using your existing inventory - turning potential 
                  waste into profit. They're offering limited spots on their waitlist. 
                  Use my code <span className="text-orange-500 font-bold">{referralData.referralCode}</span> when 
                  you sign up: {referralData.shareUrl}
                </p>
                <button
                  onClick={() => copyToClipboard(`Hey! I found this tool that's helping restaurants save thousands on food costs. MenuSparks creates weekly specials using your existing inventory - turning potential waste into profit. They're offering limited spots on their waitlist. Use my code ${referralData.referralCode} when you sign up: ${referralData.shareUrl}`)}
                  className="btn-secondary"
                >
                  Copy Message
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setReferralData(null)
                  setEmail('')
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Check Different Email
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}