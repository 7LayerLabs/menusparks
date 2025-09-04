export default function ProfileSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-gray-800/90 backdrop-blur rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Profile Complete!
          </h1>
          <p className="text-xl text-gray-300">
            Your restaurant profile has been saved successfully
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">What Happens Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">We Analyze Your Information</h3>
                <p className="text-gray-400 text-sm">Our culinary experts review your restaurant details and inventory preferences</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Custom Specials Created</h3>
                <p className="text-gray-400 text-sm">Within 24 hours, we'll create your first batch of chef-quality specials</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Delivered to Your Inbox</h3>
                <p className="text-gray-400 text-sm">Check your email for your personalized specials with recipes and pricing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 mb-8">
          <p className="text-green-400 font-semibold mb-2">
            ⏰ Expected Delivery Time
          </p>
          <p className="text-gray-300">
            Your first specials will arrive within 24 hours
          </p>
        </div>

        <div className="space-y-4">
          <a 
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            Return to Home
          </a>
          
          <p className="text-sm text-gray-400">
            Questions? Contact us at admin@menusparks.com
          </p>
        </div>
      </div>
    </div>
  )
}