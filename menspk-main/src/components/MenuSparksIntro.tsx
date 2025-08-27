export default function MenuSparksIntro() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Introduction */}
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            This is <span className="gradient-text">MenuSparks</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            A weekly subscription service that turns your existing inventory 
            into <span className="text-green-500 font-bold">profitable specials</span> in less than 24 hours.
          </p>

          {/* What Makes Us Different */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Submit your inventory today, get 5-7 ready-to-serve specials tomorrow morning
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h3 className="text-lg font-bold text-white mb-2">Built by Chefs</h3>
              <p className="text-gray-400">
                25+ years in real kitchens means we know what actually works during the rush
              </p>
            </div>
          </div>

          {/* Before/After Visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="bg-red-900/20 border-2 border-red-500/30 rounded-xl p-6">
                <h4 className="text-red-400 font-bold mb-3">❌ WITHOUT MenuSparks</h4>
                <ul className="text-left text-gray-400 space-y-2">
                  <li>• Same boring specials every week</li>
                  <li>• Food dying in the walk-in</li>
                  <li>• Panic-creating dishes during service</li>
                  <li>• Money literally in the trash</li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-green-900/20 border-2 border-green-500/30 rounded-xl p-6">
                <h4 className="text-green-400 font-bold mb-3">✅ WITH MenuSparks</h4>
                <ul className="text-left text-gray-300 space-y-2">
                  <li>• Fresh, exciting specials weekly</li>
                  <li>• Every ingredient gets used</li>
                  <li>• Complete recipes ready to execute</li>
                  <li>• Profit margins you can track</li>
                </ul>
              </div>
            </div>
          </div>

          {/* One-liner CTA */}
          <p className="text-xl text-orange-400 font-bold mt-12">
            Stop losing money. Start making specials that sell.
          </p>
        </div>
      </div>
    </section>
  )
}