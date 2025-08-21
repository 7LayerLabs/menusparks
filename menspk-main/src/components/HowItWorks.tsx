export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Fill Out Quick Form",
      description: "Send us your inventory",
      icon: "📋"
    },
    {
      number: "2", 
      title: "We Get to Work",
      description: "Creating your profitable specials",
      icon: "👨‍🍳"
    },
    {
      number: "3",
      title: "Delivered to You",
      description: "In <24 hrs",
      icon: "📧"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-black">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to profitable specials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <div className="mt-16 bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-700">
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
              <div className="text-3xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-300">Recipe Database Items</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}