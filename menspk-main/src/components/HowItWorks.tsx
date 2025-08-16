export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Share Your Inventory",
      description: "Email us your current inventory, equipment, and any dietary restrictions. Takes 2 minutes.",
      icon: "📋"
    },
    {
      number: "2", 
      title: "Expert Creation",
      description: "Our restaurant veterans create 5-10 profitable specials based on your exact situation.",
      icon: "👨‍🍳"
    },
    {
      number: "3",
      title: "48-Hour Delivery",
      description: "Receive complete specials with recipes, costs, pricing, and social media content.",
      icon: "📧"
    },
    {
      number: "4",
      title: "Implement & Profit",
      description: "Use our preparation guides and watch your margins improve while customers love the variety.",
      icon: "💰"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            From Inventory to Inspiration
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple, proven process that eliminates your weekly special stress while 
            optimizing your profit margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {step.number}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-700" 
                       style={{ transform: 'translateX(50%)' }}></div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">25+</div>
              <div className="text-gray-300">Years Restaurant Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">12</div>
              <div className="text-gray-300">Restaurants Operated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">8,500+</div>
              <div className="text-gray-300">Recipe Database Items</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}