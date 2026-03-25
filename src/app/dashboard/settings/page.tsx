'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChefHat, Save, ArrowLeft, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface RestaurantProfile {
  restaurantName: string;
  restaurantType: string;
  cuisineStyle: string;
  location: string;
  phone: string;
  description: string;
  defaultRecipeStyle: string;
  defaultComplexity: string;
  defaultDecade: string;
  defaultTheme: string;
}

interface SocialSettings {
  tone: string;
  brandHashtags: string;
  ctaTemplate: string;
  alwaysInclude: string;
  alwaysExclude: string;
  platforms: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [restaurantProfile, setRestaurantProfile] = useState<RestaurantProfile>({
    restaurantName: '',
    restaurantType: '',
    cuisineStyle: '',
    location: '',
    phone: '',
    description: '',
    defaultRecipeStyle: 'classic',
    defaultComplexity: 'basic',
    defaultDecade: '',
    defaultTheme: '',
  });

  const [socialSettings, setSocialSettings] = useState<SocialSettings>({
    tone: 'casual',
    brandHashtags: '',
    ctaTemplate: '',
    alwaysInclude: '',
    alwaysExclude: '',
    platforms: 'Instagram,Facebook',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/user/profile')
        .then((r) => r.json())
        .then((data) => {
          if (data.restaurantProfile) {
            setRestaurantProfile({
              restaurantName: data.restaurantProfile.restaurantName ?? '',
              restaurantType: data.restaurantProfile.restaurantType ?? '',
              cuisineStyle: data.restaurantProfile.cuisineStyle ?? '',
              location: data.restaurantProfile.location ?? '',
              phone: data.restaurantProfile.phone ?? '',
              description: data.restaurantProfile.description ?? '',
              defaultRecipeStyle: data.restaurantProfile.defaultRecipeStyle ?? 'classic',
              defaultComplexity: data.restaurantProfile.defaultComplexity ?? 'basic',
              defaultDecade: data.restaurantProfile.defaultDecade ?? '',
              defaultTheme: data.restaurantProfile.defaultTheme ?? '',
            });
          }
          if (data.socialSettings) {
            setSocialSettings({
              tone: data.socialSettings.tone ?? 'casual',
              brandHashtags: data.socialSettings.brandHashtags ?? '',
              ctaTemplate: data.socialSettings.ctaTemplate ?? '',
              alwaysInclude: data.socialSettings.alwaysInclude ?? '',
              alwaysExclude: data.socialSettings.alwaysExclude ?? '',
              platforms: data.socialSettings.platforms ?? 'Instagram,Facebook',
            });
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantProfile, socialSettings }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save settings');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 size={32} className="text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const inputClass =
    'w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500';
  const labelClass = 'block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <ChefHat size={20} className="text-yellow-400" />
              <span className="text-lg font-black text-yellow-400">MenuSparks</span>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition"
            >
              <ArrowLeft size={14} />
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-black text-white">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Customize your restaurant profile and recipe defaults.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-800 rounded-xl px-4 py-3 text-sm">
            <AlertTriangle size={15} />
            {error}
          </div>
        )}

        {/* Restaurant Profile */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-yellow-400">Restaurant Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Restaurant Name</label>
              <input
                type="text"
                value={restaurantProfile.restaurantName}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, restaurantName: e.target.value }))}
                placeholder="e.g. Bobola's Restaurant"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Restaurant Type</label>
              <input
                type="text"
                value={restaurantProfile.restaurantType}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, restaurantType: e.target.value }))}
                placeholder="e.g. Casual American, Fine Dining"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input
                type="text"
                value={restaurantProfile.location.split(',')[0]?.trim() ?? ''}
                onChange={(e) => {
                  const parts = restaurantProfile.location.split(',');
                  parts[0] = e.target.value;
                  setRestaurantProfile((p) => ({ ...p, location: parts.join(',') }));
                }}
                placeholder="e.g. Nashua"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>State</label>
              <input
                type="text"
                value={restaurantProfile.location.split(',')[1]?.trim() ?? ''}
                onChange={(e) => {
                  const parts = restaurantProfile.location.split(',');
                  parts[1] = ' ' + e.target.value;
                  setRestaurantProfile((p) => ({ ...p, location: parts.join(',') }));
                }}
                placeholder="e.g. NH"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="text"
                value={restaurantProfile.phone}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, phone: e.target.value }))}
                placeholder="e.g. (603) 555-1234"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cuisine Style</label>
              <input
                type="text"
                value={restaurantProfile.cuisineStyle}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, cuisineStyle: e.target.value }))}
                placeholder="e.g. Italian, American, Seafood"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={restaurantProfile.description}
              onChange={(e) => setRestaurantProfile((p) => ({ ...p, description: e.target.value }))}
              placeholder="Brief description of your restaurant..."
              className={inputClass + ' resize-none'}
            />
          </div>
        </div>

        {/* Recipe Defaults */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-yellow-400">Recipe Defaults</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Default Recipe Style</label>
              <select
                value={restaurantProfile.defaultRecipeStyle}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, defaultRecipeStyle: e.target.value }))}
                className={inputClass}
              >
                <option value="creative">Creative</option>
                <option value="classic">Classic</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Default Complexity</label>
              <select
                value={restaurantProfile.defaultComplexity}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, defaultComplexity: e.target.value }))}
                className={inputClass}
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="chef">Chef Level</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Default Decade Focus</label>
              <select
                value={restaurantProfile.defaultDecade}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, defaultDecade: e.target.value }))}
                className={inputClass}
              >
                <option value="">Any Era</option>
                <option value="1950s">1950s</option>
                <option value="1960s">1960s</option>
                <option value="1970s">1970s</option>
                <option value="1980s">1980s</option>
                <option value="1990s">1990s</option>
                <option value="2000s">2000s</option>
                <option value="Modern">Modern</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Default Theme</label>
              <input
                type="text"
                value={restaurantProfile.defaultTheme}
                onChange={(e) => setRestaurantProfile((p) => ({ ...p, defaultTheme: e.target.value }))}
                placeholder="e.g. Fall Harvest, Date Night"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Social Media Defaults */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-black uppercase tracking-widest text-yellow-400">Social Media Defaults</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Default Tone</label>
              <select
                value={socialSettings.tone}
                onChange={(e) => setSocialSettings((s) => ({ ...s, tone: e.target.value }))}
                className={inputClass}
              >
                <option value="casual">Casual</option>
                <option value="professional">Professional</option>
                <option value="playful">Playful</option>
                <option value="upscale">Upscale</option>
                <option value="bold">Bold</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Platforms</label>
              <input
                type="text"
                value={socialSettings.platforms}
                onChange={(e) => setSocialSettings((s) => ({ ...s, platforms: e.target.value }))}
                placeholder="e.g. Instagram,Facebook,TikTok"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Brand Hashtags</label>
            <input
              type="text"
              value={socialSettings.brandHashtags}
              onChange={(e) => setSocialSettings((s) => ({ ...s, brandHashtags: e.target.value }))}
              placeholder="e.g. #MenuSparks #FoodieLife #RestaurantLife"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Call-to-Action Template</label>
            <input
              type="text"
              value={socialSettings.ctaTemplate}
              onChange={(e) => setSocialSettings((s) => ({ ...s, ctaTemplate: e.target.value }))}
              placeholder="e.g. Visit us tonight! Link in bio."
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Always Include</label>
              <input
                type="text"
                value={socialSettings.alwaysInclude}
                onChange={(e) => setSocialSettings((s) => ({ ...s, alwaysInclude: e.target.value }))}
                placeholder="e.g. location tag, phone number"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Always Exclude</label>
              <input
                type="text"
                value={socialSettings.alwaysExclude}
                onChange={(e) => setSocialSettings((s) => ({ ...s, alwaysExclude: e.target.value }))}
                placeholder="e.g. prices, competitor names"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pb-8">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-400">
              <CheckCircle size={15} />
              Saved!
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-yellow-500 text-black font-black py-3 px-6 rounded-xl hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition text-sm uppercase tracking-wider"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </main>
    </div>
  );
}
