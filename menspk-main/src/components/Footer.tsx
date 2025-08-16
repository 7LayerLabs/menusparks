import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                Menu<span className="text-orange-500">Sparks</span>
              </Link>
              <p className="text-gray-300 mb-6 max-w-md">
                Expert-created restaurant specials delivered weekly. Transform your weekly 
                special stress into profit-optimized menu additions.
              </p>
              <div className="text-sm text-gray-400">
                <p>📧 support@menusparks.com</p>
                <p>📞 1-800-MENU-SPARK</p>
                <p>🏪 Bobola&apos;s Restaurant, Nashua NH</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#how-it-works" className="hover:text-orange-500 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-orange-500 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-orange-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-orange-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Newsletter ($5/week)</li>
                <li>Appetizer Tier ($10/week)</li>
                <li>Entree Tier ($25/week)</li>
                <li>Full Meal + Dessert ($39/week)</li>
                <li>Custom Consultation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} MenuSparks. All rights reserved.
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Restaurant Credentials */}
        <div className="border-t border-gray-800 py-4">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              <strong>Real Restaurant Experience:</strong> 25+ years operations • 12 restaurant concepts • 3 generations
            </p>
            <p>
              Created by restaurant operators for restaurant operators. Not consultants, not software developers - actual restaurant owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}