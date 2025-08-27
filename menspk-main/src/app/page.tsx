import { Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SavingsCalculator from '@/components/SavingsCalculator'
import MenuSparksIntro from '@/components/MenuSparksIntro'
import HowItWorks from '@/components/HowItWorks'
import MenuSparkExample from '@/components/MenuSparkExample'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      {/* 1. Hook the Pain */}
      <Suspense fallback={<div className="py-20 bg-black" />}>
        <Hero />
      </Suspense>
      
      {/* 2. Show the Potential (Savings) */}
      <SavingsCalculator />
      
      {/* 3. Introduce MenuSparks (The Hero) */}
      <MenuSparksIntro />
      
      {/* 4. Explain How It Works (Process) */}
      <HowItWorks />
      
      {/* Show Example of What They Get */}
      <MenuSparkExample />
      
      {/* 5. Pricing / Plans */}
      <Pricing />
      
      {/* 6. Social Proof / Guarantee */}
      <Testimonials />
      
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