import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t-4 border-orange-500 text-white">
      <div className="section-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm font-medium">
            © {currentYear} MenuSparks. All rights reserved.
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/referral" className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors">
              🎁 Referral Program
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}