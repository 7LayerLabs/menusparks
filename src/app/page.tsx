import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          MenuSparks
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          AI-Powered Menu Optimization for Restaurants
        </p>
        <p className="text-gray-600 mb-8">
          Weekly recipe specials delivered automatically. Reduce waste, control costs, and keep your menu fresh.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
