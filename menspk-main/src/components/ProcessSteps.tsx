export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Submit Your Inventory",
      description: "Tell us what ingredients you have in excess - proteins, produce, dairy. Takes just 2 minutes.",
      image: "/api/placeholder/400/300",
      details: ["Quick online form", "No app download needed", "Mobile-friendly"]
    },
    {
      number: "02",
      title: "We Create Your Specials",
      description: "Our culinary AI analyzes your inventory and creates 5-7 profitable specials overnight.",
      image: "/api/placeholder/400/300",
      details: ["Complete recipes", "Exact costs calculated", "Suggested pricing"]
    },
    {
      number: "03",
      title: "Serve & Save",
      description: "Execute the specials in your kitchen. Track your savings and watch profits grow.",
      image: "/api/placeholder/400/300",
      details: ["Ready to cook", "Staff-friendly instructions", "Customer-tested recipes"]
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            How It Works
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            From Inventory to Income in 24 Hours
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to turn your excess inventory into profitable specials. 
            No complicated software, no lengthy onboarding.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-gray-200">{step.number}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{step.title}</h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>

                {index === 0 && (
                  <div className="pt-4">
                    <a href="#pricing" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold group">
                      Start your free trial
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="flex-1">
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-6">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                  
                  {/* Decorative Elements */}
                  {index === 0 && (
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 hidden lg:block">
                      <span className="text-2xl">⏱️</span>
                      <span className="text-sm font-semibold text-gray-700 ml-2">2 minutes</span>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 hidden lg:block">
                      <span className="text-2xl">🤖</span>
                      <span className="text-sm font-semibold text-gray-700 ml-2">AI-Powered</span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 hidden lg:block">
                      <span className="text-2xl">💰</span>
                      <span className="text-sm font-semibold text-gray-700 ml-2">+$8,400/year</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-gray-50 rounded-2xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24 hours</div>
            <div className="text-gray-600">From submission to specials</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">5-7 specials</div>
            <div className="text-gray-600">Delivered weekly</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">70% margins</div>
            <div className="text-gray-600">Average special profitability</div>
          </div>
        </div>
      </div>
    </section>
  )
}