export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Real Restaurant Experience, Real Solutions
            </h2>
            
            <p className="text-xl text-gray-600 mb-6">
              We&apos;re not tech consultants who learned about restaurants from YouTube. 
              We&apos;re restaurant operators who learned technology to solve our own problems.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Generational Restaurant Family</h3>
                  <p className="text-gray-600">
                    Three generations running restaurants. We understand the pressure, the operations, 
                    and the daily struggle of keeping customers happy while staying creative.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">12 Different Restaurant Concepts</h3>
                  <p className="text-gray-600">
                    From breakfast diners to late-night bars, food trucks to full-service dining. 
                    We&apos;ve solved special creation challenges across every restaurant category.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">25+ Years of Operations Excellence</h3>
                  <p className="text-gray-600">
                    We&apos;ve negotiated with every major distributor, survived economic downturns, 
                    and optimized operations through multiple market cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The MenuSparks Difference</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Human expertise and culinary knowledge</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Creative optimization, not just pretty pictures</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Operational reality, not theoretical perfection</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Complete solutions, not partial answers</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <blockquote className="text-gray-700 italic text-center">
                  &quot;We don&apos;t just create specials. We solve the weekly stress that keeps 
                  restaurant owners up at night, while building their creative reputation 
                  and customer excitement.&quot;
                </blockquote>
                <div className="text-center mt-4">
                  <div className="font-semibold text-gray-900">Derek, Founder</div>
                  <div className="text-blue-600 text-sm">Bobola&apos;s Restaurant &amp; MenuSparks</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Our Restaurant Portfolio
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🥞</div>
                <h4 className="font-semibold text-gray-900 mb-2">Breakfast Operations</h4>
                <p className="text-gray-600 text-sm">5:00 AM starts, egg-based specials, coffee culture integration</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🍽️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Full-Service Dining</h4>
                <p className="text-gray-600 text-sm">Complete operations, alcohol pairings, date-night atmosphere</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🍺</div>
                <h4 className="font-semibold text-gray-900 mb-2">Bar & Pub Operations</h4>
                <p className="text-gray-600 text-sm">Late-night crowds, menu innovation, entertainment integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}