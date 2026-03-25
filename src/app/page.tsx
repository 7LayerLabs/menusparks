'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'weekly'>('monthly');

  const plans = {
    quickBite: { monthly: 49, weekly: 65 },
    chefsChoice: { monthly: 79, weekly: 108 },
    fullKitchen: { monthly: 140, weekly: 152 },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-gray-900">Menu</span>
            <span className="text-orange-500">Sparks</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#calculator" className="hover:text-gray-900 transition-colors">Calculator</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
            <Link href="/referral" className="hover:text-gray-900 transition-colors">Referrals</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-bold bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#0d1117] py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              <span className="text-blue-400">●</span> Professional Recipe Creation
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              <span className="text-white">Line cooks can cook.</span>
              <br />
              <span className="text-orange-500">They can&apos;t create.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-lg">
              Independent kitchens struggle with fresh, profitable specials. Managers end up overspending at Sysco or wasting food they already have. The creativity gap costs money and adds waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/auth/register"
                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors text-center"
              >
                Start Creating Specials
              </Link>
              <a
                href="#how-it-works"
                className="px-6 py-3 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-center"
              >
                See How It Works
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-green-400 text-sm font-bold">
                <span className="text-green-400">✓</span> INSTANT RECIPES
              </span>
              <span className="flex items-center gap-1.5 text-green-400 text-sm font-bold">
                <span className="text-green-400">✓</span> CHEF-LEVEL RESULTS!
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6 items-center">
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-500 text-lg">●</span>
                <span className="text-orange-400 font-bold text-sm">Kitchen Creativity Gap Detected</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                You&apos;ve got talented cooks, but when it comes to creating weekly specials? The creativity just isn&apos;t there. Same old ideas, week after week.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-700 w-full">
              <Image
                src="/images/comic.png"
                alt="Chef looking in the fridge then at a blank specials board"
                width={600}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY SECRET */}
      <section className="bg-[#0d1117] py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            🔓 Industry Secret Exposed
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-orange-500 mb-10">
            The Real Advantage Chains Have
          </h2>
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 mb-6 text-center">
            <p className="text-gray-300 text-lg leading-relaxed mb-2">
              Same suppliers. Same catalogs.{' '}
              <strong className="text-white">Sysco, US Foods, PFG</strong> — independents and chains order from the exact same vendors.
            </p>
            <p className="text-gray-400 text-sm mt-1">The secret isn&apos;t the ingredients.</p>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-orange-400 font-black text-sm tracking-widest">THE REAL DIFFERENCE</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Chains have <strong className="text-white">corporate chef teams</strong>, test kitchens, and{' '}
              <strong className="text-white">menu R&amp;D budgets</strong>. You&apos;ve been competing without those tools.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8">
            <p className="text-white text-xl font-bold leading-relaxed">
              Now, one intelligent system gives you the same creative firepower — without the corporate overhead.
            </p>
          </div>
        </div>
      </section>

      {/* WHO MENUSPARKS IS FOR */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-10">Who MenuSparks Is For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Restaurant Owners */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-center mb-4">
                <Image src="/images/owner.png" alt="Restaurant Owner" width={72} height={72} className="object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Restaurant Owners</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  &quot;I need to reduce food costs and increase margins without hiring expensive consultants.&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Save 30% on waste</span>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Boost margins by 5-7%</span>
                </div>
              </div>
            </div>

            {/* Kitchen Managers */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-center mb-4">
                <Image src="/images/kitchenmgr.png" alt="Kitchen Manager" width={72} height={72} className="object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Kitchen Managers</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  &quot;I&apos;m tired of scrambling for special ideas and watching inventory expire in the walk-in.&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Save time from your busy schedule</span>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Never run out of ideas</span>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Look like a genius to your boss!</span>
                </div>
              </div>
            </div>

            {/* Line Cooks */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-center mb-4">
                <Image src="/images/linecooks.png" alt="Line Cooks" width={72} height={72} className="object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Line Cooks</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  &quot;I can execute any recipe perfectly, but creating new dishes from scratch? That&apos;s not my strength.&quot;
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Focus on cooking</span>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Leave creativity to us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEVEL THE PLAYING FIELD */}
      <section className="bg-[#0d1117] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Level the Playing Field for Independent Restaurants
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Big chains have teams of corporate chefs. You have MenuSparks. We&apos;re here to give every independent restaurant the creative firepower to compete and win. Because great food shouldn&apos;t be limited to those with deep pockets.
          </p>
        </div>
      </section>

      {/* RECIPE GENERATION */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/cookbook.png"
                alt="Cookbook"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Recipe Generation That Actually Works</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Input your inventory. Select your style. Get professionally crafted recipes in seconds. Draw from 10,000+ classics or create innovative new twists — complete with prep instructions, portion sizes, plating notes, and even social posts.
            </p>
            <ul className="text-left max-w-2xl mx-auto space-y-3 mb-8 text-gray-700">
              <li>
                <strong>Multi-Style Generation</strong> — Create recipes for 24 restaurant styles and 14 categories.
              </li>
              <li>
                <strong>Equipment Matching</strong> — Tailors steps and techniques to your kitchen&apos;s gear.
              </li>
            </ul>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">24 Restaurant Styles</span>
              <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">14 Recipe Categories</span>
              <span className="bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">10,000+ Classic Recipes (1950-2025)</span>
            </div>
            <p className="text-gray-500 italic text-sm">
              Never run the same special twice unless it sells so good you have no choice!
            </p>
          </div>

          {/* Two sub-cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/whisk.png"
                  alt="Whisk"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 text-center">Creative Recipe Development</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 text-center">
                Transform everyday ingredients into extraordinary dishes. Our culinary expertise ensures every recipe is both innovative and perfectly suited to your kitchen&apos;s capabilities.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Theme Specific Options</span>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Creative New Options</span>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Hybrid Recipe Fusion</span>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/tray.png"
                  alt="Tray"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 text-center">Instant Implementation</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 text-center">
                Recipes come with prep instructions, scaling tips, and even social media posts. From generation to service in minutes, not hours.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Include/Exclude Ingredients</span>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">Recipe Scaling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON PORTAL */}
      <section className="bg-[#0d1117] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Coming Soon: The Ultimate Solution
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Your Private Recipe Web Portal</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              The long-term solution for managing all your generated specials. Each client gets their own secure login to access their complete recipe database - never lose a special again.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/secureaccess.png"
                  alt="Secure Access"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Secure Access</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Private login portal for each restaurant with encrypted data storage</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/dualdatabase.png"
                  alt="Recipe Database"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Recipe Database</h3>
              <p className="text-gray-400 text-sm leading-relaxed">All your generated specials saved and searchable for future use</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/chicken.png"
                  alt="Dual Delivery"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Dual Delivery</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Recipes sent via email AND stored in your portal for permanent access</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE FEATURE SET */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Everything You Need to Create Like a Chef</h2>
            <p className="text-gray-600 text-lg">Professional tools that turn your inventory into profit. No culinary degree required.</p>
          </div>

          {/* Highlight tiles */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-2">Your Private Portal</h3>
              <p className="text-gray-500 text-sm mb-4">Secure dashboard with all your recipes saved forever</p>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">COMING SOON</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-2">Endless Variety</h3>
              <p className="text-gray-500 text-sm mb-4">24 restaurant styles × 14 recipe categories</p>
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">336 COMBINATIONS</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-2">Smart Creation</h3>
              <p className="text-gray-500 text-sm mb-4">Include/exclude ingredients, scale portions instantly</p>
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">FULLY CUSTOMIZABLE</span>
            </div>
          </div>

          {/* Feature checklist grid */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Three-phase recipes (prep/bulk/service)',
                'Scale from 10-200 portions',
                'Export & print formats',
                'Waste tracking alerts',
                'Cost analysis dashboard',
                'Holiday & event themes',
                'Social media templates',
                'Idea Spark brainstorming',
                'Recipe performance tracking',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="text-orange-500 text-lg font-black">✓</span>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-10">
            From Inventory to Income in 4 Simple Steps
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Input Your Inventory', desc: 'Upload ingredient lists or manually select what you have on hand' },
              { num: '2', title: 'Set Your Style', desc: 'Choose recipe types, complexity, and restaurant style preferences' },
              { num: '3', title: 'Generate Recipes', desc: 'Our system creates innovative specials with full instructions', check: true },
              { num: '4', title: 'Serve & Delight', desc: 'Execute recipes with confidence and watch customers return' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-500 text-white font-black text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-black text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {step.check && (
                  <span className="inline-block mt-3 text-green-500 font-bold text-sm">✓ Done</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR */}
      <section id="calculator" className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-900 mb-4">See Your Potential Savings</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Industry averages: 32% food cost, 7% waste rate, 21% from spoilage. We help you use inventory BEFORE it expires - turning waste into profit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* $500k */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-6 text-center">$500k Revenue</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Food Budget</span>
                  <span className="font-black text-gray-900">$160,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Annual Waste</span>
                  <span className="font-black text-red-500">-$11,200</span>
                </div>
                <p className="text-gray-400 text-xs">Spoilage &amp; Expiration 21%</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Poor rotation / excess</span>
                  <span className="font-black text-red-500">-$2,352</span>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                  <span className="text-orange-600 font-black text-xs">👉 THIS IS WHERE WE HELP!</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-700 font-bold">Annual Savings</span>
                  <span className="font-black text-green-500 text-lg">+$5,600</span>
                </div>
                <p className="text-gray-400 text-xs">back in your pocket</p>
                <p className="text-orange-600 text-xs font-bold">Eliminate spoilage waste</p>
              </div>
            </div>

            {/* $750k */}
            <div className="bg-white border-2 border-orange-500 rounded-2xl p-8 shadow-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                Most Common
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-6 text-center">$750k Revenue</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Food Budget</span>
                  <span className="font-black text-gray-900">$240,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Annual Waste</span>
                  <span className="font-black text-red-500">-$16,800</span>
                </div>
                <p className="text-gray-400 text-xs">Spoilage &amp; Expiration 21%</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Poor rotation / excess</span>
                  <span className="font-black text-red-500">-$3,528</span>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                  <span className="text-orange-600 font-black text-xs">👉 THIS IS WHERE WE HELP!</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-700 font-bold">Annual Savings</span>
                  <span className="font-black text-green-500 text-lg">+$8,400</span>
                </div>
                <p className="text-gray-400 text-xs">back in your pocket</p>
                <p className="text-orange-600 text-xs font-bold">Eliminate spoilage waste</p>
              </div>
            </div>

            {/* $1M */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-6 text-center">$1M Revenue</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Food Budget</span>
                  <span className="font-black text-gray-900">$320,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Annual Waste</span>
                  <span className="font-black text-red-500">-$22,400</span>
                </div>
                <p className="text-gray-400 text-xs">Spoilage &amp; Expiration 21%</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Poor rotation / excess</span>
                  <span className="font-black text-red-500">-$4,704</span>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
                  <span className="text-orange-600 font-black text-xs">👉 THIS IS WHERE WE HELP!</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-700 font-bold">Annual Savings</span>
                  <span className="font-black text-green-500 text-lg">+$11,200</span>
                </div>
                <p className="text-gray-400 text-xs">back in your pocket</p>
                <p className="text-orange-600 text-xs font-bold">Eliminate spoilage waste</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/calculator"
              className="inline-block px-8 py-4 bg-orange-500 text-white font-black text-lg rounded-xl hover:bg-orange-600 transition-colors"
            >
              Calculate My Exact Savings
            </Link>
            <p className="text-gray-400 text-xs mt-4 max-w-2xl mx-auto">
              Based on NRA data: 21% of all food waste comes from spoilage &amp; expiration. MenuSparks creates specials using inventory BEFORE it expires - eliminating this waste.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-8">Choose Your Plan</h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingCycle('weekly')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${
                billingCycle === 'weekly'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-colors flex items-center gap-2 ${
                billingCycle === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
              {billingCycle === 'monthly' && (
                <span className="bg-green-500 text-white text-xs font-black px-2 py-0.5 rounded-full">SAVE 20%</span>
              )}
            </button>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Quick Bite */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm">
              <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Quick Bite</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black text-gray-900">${plans.quickBite[billingCycle]}</span>
                <span className="text-gray-500 mb-2">/{billingCycle === 'monthly' ? 'mo' : 'wk'}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">Perfect for small kitchens</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8 flex-1">
                {['20 monthly recipes', 'Basic ingredient optimization', 'Simple prep instructions', 'Email support'].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register?plan=quick_bite"
                className="w-full text-center py-3 rounded-xl border-2 border-orange-500 text-orange-500 font-bold hover:bg-orange-50 transition-colors"
              >
                Start {billingCycle === 'monthly' ? 'Monthly' : 'Weekly'}
              </Link>
            </div>

            {/* Chef's Choice */}
            <div className="bg-orange-500 rounded-2xl p-8 flex flex-col relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                MOST POPULAR
              </div>
              <p className="text-sm font-bold text-orange-100 mb-1 uppercase tracking-wider">Chef&apos;s Choice</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black text-white">${plans.chefsChoice[billingCycle]}</span>
                <span className="text-orange-200 mb-2">/{billingCycle === 'monthly' ? 'mo' : 'wk'}</span>
              </div>
              <p className="text-orange-100 text-sm mb-6">Most popular for busy restaurants</p>
              <ul className="space-y-3 text-sm text-white mb-8 flex-1">
                {[
                  '40 monthly recipes',
                  'Advanced customization options',
                  'Social media content included',
                  'Recipe performance analytics',
                  'Priority support',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-white font-bold mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register?plan=chefs_choice"
                className="w-full text-center py-3 rounded-xl bg-white text-orange-500 font-black hover:bg-orange-50 transition-colors"
              >
                Go Pro {billingCycle === 'monthly' ? 'Monthly' : 'Weekly'}
              </Link>
            </div>

            {/* Full Kitchen */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                🍰 LAUNCHING SOON
              </div>
              <p className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Full Kitchen</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black text-gray-900">${plans.fullKitchen[billingCycle]}</span>
                <span className="text-gray-500 mb-2">/{billingCycle === 'monthly' ? 'mo' : 'wk'}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">Everything you need to dominate</p>
              <ul className="space-y-3 text-sm text-gray-500 mb-8 flex-1">
                {[
                  'Unlimited monthly recipes',
                  'Pour Plan included (beverages)',
                  'Seasonal menu planning',
                  'Waste tracking & alerts',
                  '1-on-1 consultation calls',
                  'White-glove support',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full text-center py-3 rounded-xl bg-gray-100 text-gray-400 font-bold cursor-not-allowed"
              >
                Maximize Success
              </button>
            </div>
          </div>

          {/* A La Carte */}
          <div>
            <h3 className="text-xl font-black text-gray-900 text-center mb-6">A La Carte Options</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h4 className="font-black text-gray-900 mb-1">Industry Newsletter</h4>
                <p className="text-2xl font-black text-orange-500 mb-2">$5<span className="text-base text-gray-500 font-normal">/week</span></p>
                <p className="text-gray-500 text-sm mb-4">Market intelligence, pricing trends, and industry insights</p>
                <button className="w-full py-2.5 rounded-xl border-2 border-orange-500 text-orange-500 font-bold text-sm hover:bg-orange-50 transition-colors">
                  Subscribe Now
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h4 className="font-black text-gray-900 mb-1">Custom Newsletter</h4>
                <p className="text-2xl font-black text-orange-500 mb-2">$10<span className="text-base text-gray-500 font-normal">/week</span></p>
                <p className="text-gray-500 text-sm mb-4">Personalized market updates based on YOUR inventory and menu</p>
                <button className="w-full py-2.5 rounded-xl border-2 border-orange-500 text-orange-500 font-bold text-sm hover:bg-orange-50 transition-colors">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="bg-[#0d1117] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4">Powered by Intelligent Technology</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our platform leverages advanced algorithms and culinary databases to generate recipes that are both creative and delicious.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/smartanalysis.png"
                  alt="Smart Analysis"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Smart Analysis</h3>
              <p className="text-gray-400 text-sm">Analyzes ingredient combinations and flavor profiles</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/precisionmatching.png"
                  alt="Precision Matching"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Precision Matching</h3>
              <p className="text-gray-400 text-sm">Matches recipes to your specific inventory and equipment</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/learning.png"
                  alt="Continuous Learning"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Continuous Learning</h3>
              <p className="text-gray-400 text-sm">Improves recommendations based on your preferences</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / ABOUT */}
      <section id="about" className="bg-gray-900 py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
            &ldquo;Built by Restaurant people for restaurant people. 25+ years in kitchens, over 10 restaurants managed, 1 simple mission: help restaurants maximize creativity from existing inventory.&rdquo;
          </blockquote>
          <cite className="text-orange-400 font-bold text-sm not-italic">— The MenuSparks Team</cite>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1117] border-t-4 border-orange-500 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-4">© 2025 MenuSparks. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/referral" className="hover:text-orange-400 transition-colors">🎁 Referral Program</Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
