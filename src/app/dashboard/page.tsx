'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MenuSparks</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to MenuSparks!
            </h2>
            <p className="text-gray-600">
              Your AI-powered menu optimization platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Restaurant Profile
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Set up your restaurant details and preferences
              </p>
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                Get Started →
              </button>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Recipes
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate custom recipes tailored to your brand
              </p>
              <button className="text-green-600 text-sm font-semibold hover:text-green-700">
                Generate →
              </button>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Subscriptions
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage your weekly recipe delivery plans
              </p>
              <button className="text-purple-600 text-sm font-semibold hover:text-purple-700">
                View Plans →
              </button>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white">
            <h3 className="text-xl font-bold mb-2">
              Ready to transform your menu?
            </h3>
            <p className="text-blue-100 mb-4">
              Choose a subscription plan and start receiving AI-powered recipes weekly
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Choose Your Plan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
