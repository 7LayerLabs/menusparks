import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="py-20 bg-black">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="space-y-6 text-gray-300">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Last Updated: January 2025</h2>
                <p>These Terms of Service ("Terms") govern your use of MenuSparks. By using our service, you agree to these Terms.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">1. Service Description</h3>
                <p>MenuSparks provides AI-powered weekly special generation for restaurants based on existing inventory. We offer various subscription tiers with different features and special frequencies.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">2. Subscription and Billing</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscriptions are billed weekly or annually (with 10 weeks free for annual plans)</li>
                  <li>Payments are processed securely through Stripe</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>No refunds for partial billing periods</li>
                  <li>100% satisfaction guarantee for first-time subscribers (30-day money-back)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">3. User Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate inventory information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Comply with all applicable food safety regulations</li>
                  <li>Not misuse or attempt to reverse-engineer our AI algorithms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">4. Intellectual Property</h3>
                <p>The specials generated for your restaurant are yours to use. However, the MenuSparks platform, algorithms, and underlying technology remain our intellectual property.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">5. Disclaimer of Warranties</h3>
                <p>MenuSparks is provided "as is" without warranties of any kind. While we strive for accuracy, we cannot guarantee that all generated specials will be suitable for your specific needs or comply with all dietary restrictions without review.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">6. Limitation of Liability</h3>
                <p>MenuSparks shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount paid by you in the last 12 months.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">7. Food Safety Notice</h3>
                <p>All generated specials should be reviewed by your chef or kitchen manager for food safety, allergen considerations, and compliance with local health regulations before implementation.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">8. Termination</h3>
                <p>We reserve the right to terminate or suspend your account for violation of these Terms. You may cancel your subscription at any time through your account settings.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">9. Changes to Terms</h3>
                <p>We may modify these Terms at any time. Continued use of MenuSparks after changes constitutes acceptance of the new Terms.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">10. Governing Law</h3>
                <p>These Terms are governed by the laws of the United States and the State of New Hampshire, without regard to conflict of law principles.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">11. Contact Information</h3>
                <p>For questions about these Terms, please contact us at:</p>
                <p className="mt-2">
                  Email: admin@menusparks.com<br />
                  Website: menusparks.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}