import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SavingsCalculator from '@/components/SavingsCalculator'
import MenuSparkExample from '@/components/MenuSparkExample'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      
      {/* Savings Calculator - Moved up to show immediate value */}
      <SavingsCalculator />
      
      {/* MenuSpark Example - Moved before How It Works to show tangible output */}
      <MenuSparkExample />
      
      {/* How It Works - After seeing the example, now explain the process */}
      <HowItWorks />
      
      {/* Pricing with guarantee */}
      <Pricing />
      
      {/* Final Closer - Credibility + CTA */}
      <section className="py-8 bg-gray-900">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            {/* Credibility Quote */}
            <div className="text-center mb-16">
              <blockquote className="text-xl lg:text-2xl font-medium text-white mb-8 leading-relaxed">
                &quot;Built by Restaurant people for restaurant people.<br />
                <span className="text-orange-500 font-semibold">25+ years in kitchens, over 10 restaurants managed,</span><br />
                1 simple mission: help restaurants maximize profitability from existing inventory.&quot;
              </blockquote>
              <p className="text-lg text-gray-400 font-medium">
                - The MenuSparks Team
              </p>
            </div>
            
            {/* Final CTA Form */}
            <FinalCTA />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}