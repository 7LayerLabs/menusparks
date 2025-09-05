import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="py-20 bg-black">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-300">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-3">Last Updated: August 30, 2025</h2>
                <p>MenuSparks ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Information We Collect</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Restaurant name and contact information</li>
                  <li>Email address for account management and communications</li>
                  <li>Inventory data you provide for special generation</li>
                  <li>Usage data to improve our service</li>
                  <li>Payment information (processed securely through Stripe)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Generate customized weekly specials based on your inventory</li>
                  <li>Send weekly special recommendations and newsletters</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Improve our recipe generation and service quality</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Security</h3>
                <p>We implement industry-standard security measures to protect your data. Your inventory information is encrypted and stored securely. We never sell or share your data with third parties for marketing purposes.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Retention</h3>
                <p>We retain your data for as long as your account is active. You can request deletion of your data at any time by contacting us at admin@menusparks.com.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Your Rights</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Cookies</h3>
                <p>We use essential cookies to maintain your session and preferences. We do not use tracking or advertising cookies.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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