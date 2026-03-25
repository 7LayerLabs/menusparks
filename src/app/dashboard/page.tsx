'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
  ChefHat,
  Sparkles,
  Send,
  X,
  Plus,
  Minus,
  AlertTriangle,
  Loader2,
  BookmarkPlus,
  MessageSquare,
  RefreshCw,
  Crown,
  Zap,
  Settings,
  ShieldCheck,
  Printer,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { Recipe, RecipeStyle, RecipeComplexity, RecipeRequest, GenerateRecipesBody } from '@/types/recipes';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CreditsData {
  generationsUsed: number;
  freeTrialLimit: number | null;
  isAdmin?: boolean;
  tier?: string;
  subscription: { tier: string; monthlyLimit: number; monthlyUsed: number } | null;
}

interface ChatMessage {
  role: 'user' | 'chef';
  text: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MEAL_TYPES = [
  'Appetizer', 'Soup', 'Salad', 'Entree', 'Side Dish', 'Dessert',
  'Breakfast/Brunch', 'Lunch Special', 'Kids Menu', 'Seafood Special',
  'Vegetarian/Vegan', 'Pasta', 'Pizza', 'Sandwich/Wrap',
];

const RESTAURANT_STYLES = [
  'American Diner', 'Fine Dining', 'Casual American', 'Italian', 'Mexican',
  'Seafood', 'Steakhouse', 'BBQ', 'Sports Bar', 'Farm-to-Table',
  'Japanese/Sushi', 'Chinese', 'Thai', 'Indian', 'Mediterranean',
  'French', 'Greek', 'Caribbean', 'Latin American', 'Irish Pub',
  'Pizza Casual', 'Burger Joint', 'Sandwich/Deli', 'Breakfast Café',
];

const DECADE_OPTIONS = [
  { value: '', label: 'Any Era' },
  { value: '1950s', label: '1950s' },
  { value: '1960s', label: '1960s' },
  { value: '1970s', label: '1970s' },
  { value: '1980s', label: '1980s' },
  { value: '1990s', label: '1990s' },
  { value: '2000s', label: '2000s' },
  { value: 'Modern', label: 'Modern' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-1 rounded-lg bg-gray-950 p-1 border border-gray-700"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-2 text-sm font-bold rounded-md transition-colors duration-200 text-center ${
            value === opt.value
              ? 'bg-yellow-500 text-black'
              : 'bg-transparent text-gray-400 hover:bg-gray-800'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CreditsLabel({ credits }: { credits: CreditsData | null }) {
  if (!credits) return null;
  if (credits.isAdmin) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-full">
        <Crown size={12} />
        Unlimited
      </span>
    );
  }
  if (credits.subscription) {
    const { monthlyUsed, monthlyLimit } = credits.subscription;
    const remaining = monthlyLimit - monthlyUsed;
    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-3 py-1.5 rounded-full">
        <Crown size={12} />
        {remaining} of {monthlyLimit} this month
      </span>
    );
  }
  const remaining = (credits.freeTrialLimit ?? 5) - credits.generationsUsed;
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1.5 rounded-full">
      <Zap size={12} />
      {remaining} of {credits.freeTrialLimit ?? 5} free specials left
    </span>
  );
}

// ─── Upgrade Modal ────────────────────────────────────────────────────────────

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (tier: 'quick_bite' | 'chefs_choice') => {
    setLoading(tier);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to start checkout');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Unlock Unlimited Recipes</h2>
            <p className="text-gray-400 mt-1">You&apos;ve used all 5 free specials. Choose a plan to keep generating.</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition p-1">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2 text-red-400 bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-sm">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-4 p-6">
          {/* Quick Bite */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={20} className="text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Quick Bite</h3>
            </div>
            <p className="text-3xl font-black text-yellow-400 mt-2">
              $49<span className="text-base font-normal text-gray-400">/mo</span>
            </p>
            <ul className="mt-4 space-y-2 flex-1 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> 30 recipe generations/month</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Ask the Chef unlimited</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Save &amp; export recipes</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Social media captions</li>
            </ul>
            <button
              onClick={() => handleCheckout('quick_bite')}
              disabled={loading !== null}
              className="mt-6 w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading === 'quick_bite' && <Loader2 size={16} className="animate-spin" />}
              Choose Quick Bite
            </button>
          </div>

          {/* Chef's Choice */}
          <div className="bg-gray-800 border border-yellow-500/40 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-black px-2 py-0.5 rounded-full">BEST VALUE</div>
            <div className="flex items-center gap-2 mb-1">
              <Crown size={20} className="text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Chef&apos;s Choice</h3>
            </div>
            <p className="text-3xl font-black text-yellow-400 mt-2">
              $79<span className="text-base font-normal text-gray-400">/mo</span>
            </p>
            <ul className="mt-4 space-y-2 flex-1 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Unlimited recipe generations</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Ask the Chef unlimited</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Save &amp; export recipes</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Social media captions</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Priority generation speed</li>
              <li className="flex items-center gap-2"><span className="text-yellow-400">✓</span> Early access to new features</li>
            </ul>
            <button
              onClick={() => handleCheckout('chefs_choice')}
              disabled={loading !== null}
              className="mt-6 w-full bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading === 'chefs_choice' && <Loader2 size={16} className="animate-spin" />}
              Choose Chef&apos;s Choice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Ask the Chef Modal ───────────────────────────────────────────────────────

function AskChefModal({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    `How do I scale this for 50 portions?`,
    `What can I substitute for an ingredient?`,
    `How do I plate this elegantly?`,
    `What wine pairs with this dish?`,
    `Can I prep this ahead of service?`,
  ];

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const question = text.trim();
    setInput('');
    setError(null);

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: question }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/recipes/ask-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          recipe,
          history: messages,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Chef is unavailable right now');
      setMessages([...newMessages, { role: 'chef', text: data.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [messages, recipe, loading]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full p-2">
              <ChefHat size={18} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Ask the Chef</h3>
              <p className="text-xs text-gray-400 truncate max-w-[200px] sm:max-w-xs">{recipe.recipeName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition p-1">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 && (
            <div className="text-center py-6">
              <ChefHat size={36} className="text-yellow-400/50 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Ask me anything about this recipe — techniques, substitutions, scaling, plating, pairings...</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-yellow-500 text-black font-medium rounded-br-sm'
                    : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm'
                }`}
              >
                {msg.role === 'chef' && (
                  <p className="text-xs text-yellow-400 font-bold mb-1 uppercase tracking-wider">Chef</p>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
                <p className="text-xs text-yellow-400 font-bold mb-1 uppercase tracking-wider">Chef</p>
                <div className="flex gap-1 items-center h-4">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-3 py-2 text-sm">
              <AlertTriangle size={14} />
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips */}
        {messages.length === 0 && (
          <div className="px-4 pb-2 flex-shrink-0">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={loading}
                  className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about technique, substitutions, scaling..."
              className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-yellow-500 text-black p-2.5 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Recipe Card ──────────────────────────────────────────────────────────────

function RecipeCard({
  recipe,
  onSave,
  onAskChef,
  onModify,
  saved,
}: {
  recipe: Recipe;
  onSave: () => void;
  onAskChef: () => void;
  onModify: () => void;
  saved: boolean;
}) {
  const handlePrint = () => {
    const groups = recipe.ingredientGroups && recipe.ingredientGroups.length > 0
      ? recipe.ingredientGroups.map(g =>
          `<div style="margin-bottom:12px"><strong style="font-size:11px;text-transform:uppercase;color:#888">${g.group}</strong><ul style="margin:4px 0 0 0;padding-left:18px">${g.items.map(i => `<li>${i}</li>`).join('')}</ul></div>`
        ).join('')
      : `<ul style="padding-left:18px">${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>`;

    const prep = recipe.prep?.length ? `<h3>Mise en Place</h3><ol style="padding-left:18px">${recipe.prep.map(s => `<li>${s}</li>`).join('')}</ol>` : '';
    const bulk = recipe.bulkPrep?.length ? `<h3>Pre-Service Prep</h3><ol style="padding-left:18px">${recipe.bulkPrep.map(s => `<li>${s}</li>`).join('')}</ol>` : '';
    const notes = recipe.chefNotes ? `<h3>Chef's Notes</h3><p>${recipe.chefNotes}</p>` : '';

    const html = `<!DOCTYPE html><html><head><title>${recipe.recipeName}</title><style>
      body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#111;line-height:1.5}
      h1{font-size:24px;margin-bottom:4px}
      h2{font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#888;margin:0 0 16px}
      h3{font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:1px solid #eee;padding-bottom:4px;margin:20px 0 8px}
      li{margin-bottom:4px}p{margin:4px 0}
      .yield{font-size:12px;color:#666;margin-bottom:20px}
      @media print{body{margin:20px}}
    </style></head><body>
      <h1>${recipe.recipeName}</h1>
      <h2>${recipe.mealType}</h2>
      <p class="yield">Yield: ${recipe.yield}</p>
      ${recipe.description ? `<p style="margin-bottom:16px;color:#333">${recipe.description}</p>` : ''}
      <h3>Ingredients</h3>${groups}
      ${prep}${bulk}
      <h3>Instructions</h3><ol style="padding-left:18px">${recipe.instructions.map(s => `<li style="margin-bottom:6px">${s}</li>`).join('')}</ol>
      ${notes}
    </body></html>`;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      win.print();
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Recipe Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-800">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-black text-yellow-400 leading-tight">{recipe.recipeName}</h3>
            <span className="inline-block mt-1 text-xs font-bold uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded">
              {recipe.mealType}
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-800 border border-gray-700 px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0">
            Yield: {recipe.yield}
          </span>
        </div>
        {recipe.description && (
          <p className="mt-3 text-gray-300 text-sm leading-relaxed">{recipe.description}</p>
        )}
      </div>

      {/* Recipe Body */}
      <div className="px-6 py-5 space-y-5">
        {/* Ingredients */}
        {(recipe.ingredientGroups && recipe.ingredientGroups.length > 0) ? (
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-3">Ingredients</h4>
            <div className="space-y-4">
              {recipe.ingredientGroups.map((group, gi) => (
                <div key={gi}>
                  <p className="text-xs font-bold uppercase tracking-wider text-yellow-600/80 mb-1.5">{group.group}</p>
                  <ul className="space-y-1">
                    {group.items.map((ing, i) => (
                      <li key={i} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-yellow-600 mt-0.5 flex-shrink-0">—</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : recipe.ingredients.length > 0 ? (
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Ingredients</h4>
            <ul className="space-y-1">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-yellow-600 mt-0.5 flex-shrink-0">—</span>
                  {ing}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Mise en Place */}
        {recipe.prep && recipe.prep.length > 0 && (
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Mise en Place</h4>
            <ol className="space-y-1">
              {recipe.prep.map((step, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-yellow-600 font-bold flex-shrink-0 w-5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Pre-Service / Bulk Prep */}
        {recipe.bulkPrep && recipe.bulkPrep.length > 0 && (
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Pre-Service Prep</h4>
            <ol className="space-y-1">
              {recipe.bulkPrep.map((step, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-yellow-600 font-bold flex-shrink-0 w-5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Instructions */}
        {recipe.instructions.length > 0 && (
          <section>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Instructions</h4>
            <ol className="space-y-2">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-yellow-500 font-black flex-shrink-0 w-5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Chef's Notes */}
        {recipe.chefNotes && (
          <section className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Chef&apos;s Notes</h4>
            <p className="text-sm text-gray-300 leading-relaxed">{recipe.chefNotes}</p>
          </section>
        )}

        {/* Social Media Post */}
        {recipe.socialMediaPost && (
          <section className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Social Media Caption</h4>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{recipe.socialMediaPost}</p>
          </section>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex flex-wrap gap-2 border-t border-gray-800 pt-4">
        <button
          onClick={onSave}
          disabled={saved}
          className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg transition ${
            saved
              ? 'bg-green-900/40 text-green-400 border border-green-700 cursor-default'
              : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <BookmarkPlus size={15} />
          {saved ? 'Saved' : 'Save Recipe'}
        </button>
        <button
          onClick={onAskChef}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          <MessageSquare size={15} />
          Ask the Chef
        </button>
        <button
          onClick={onModify}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          <RefreshCw size={15} />
          Modify
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          <Printer size={15} />
          Print
        </button>
      </div>
    </div>
  );
}

// ─── Modify Modal ─────────────────────────────────────────────────────────────

function ModifyModal({
  recipe,
  onClose,
  onSubmit,
  loading,
}: {
  recipe: Recipe;
  onClose: () => void;
  onSubmit: (request: string) => void;
  loading: boolean;
}) {
  const [request, setRequest] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div>
            <h3 className="font-bold text-white">Modify Recipe</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{recipe.recipeName}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-400">Describe how you&apos;d like to change this recipe. Be specific — the chef will regenerate it with your adjustments.</p>
          <textarea
            rows={4}
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="e.g., Make it gluten-free, swap the chicken for tofu, add more heat, simplify the technique..."
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
          />
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(request)}
              disabled={!request.trim() || loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? 'Modifying...' : 'Modify Recipe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auth redirect
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  // ── Controls State ────────────────────────────────────────────────────────
  const [recipeRequests, setRecipeRequests] = useState<RecipeRequest[]>([{ mealType: 'Dinner', count: 3 }]);
  const [recipeStyle, setRecipeStyle] = useState<RecipeStyle>('creative');
  const [recipeComplexity, setRecipeComplexity] = useState<RecipeComplexity>('intermediate');
  const [decade, setDecade] = useState('');
  const [theme, setTheme] = useState('');
  const [restaurantStyles, setRestaurantStyles] = useState<string[]>([]);
  const [includeIngredients, setIncludeIngredients] = useState('');
  const [excludeIngredients, setExcludeIngredients] = useState('');
  const [customRequest, setCustomRequest] = useState('');

  // ── Output State ──────────────────────────────────────────────────────────
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipeNames, setSavedRecipeNames] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Modal State ───────────────────────────────────────────────────────────
  const [askChefRecipe, setAskChefRecipe] = useState<Recipe | null>(null);
  const [modifyRecipe, setModifyRecipe] = useState<{ recipe: Recipe; index: number } | null>(null);
  const [isModifying, setIsModifying] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // ── Credits ───────────────────────────────────────────────────────────────
  const [credits, setCredits] = useState<CreditsData | null>(null);

  const fetchCredits = useCallback(async () => {
    try {
      const res = await fetch('/api/user/credits');
      if (res.ok) {
        const data = await res.json();
        setCredits(data);
      }
    } catch {
      // Credits fetch failing silently is fine
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') fetchCredits();
  }, [status, fetchCredits]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 size={32} className="text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  // ── Helpers ───────────────────────────────────────────────────────────────

  const isOutOfCredits = credits
    ? credits.isAdmin
      ? false
      : credits.subscription
        ? credits.subscription.monthlyUsed >= credits.subscription.monthlyLimit
        : credits.generationsUsed >= (credits.freeTrialLimit ?? 5)
    : false;

  const toggleRestaurantStyle = (style: string) => {
    setRestaurantStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const updateRequest = (index: number, field: keyof RecipeRequest, value: string | number) => {
    setRecipeRequests((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const addRequest = () => {
    setRecipeRequests((prev) => [...prev, { mealType: '', count: 1 }]);
  };

  const removeRequest = (index: number) => {
    setRecipeRequests((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Generate ──────────────────────────────────────────────────────────────

  const handleGenerate = async () => {
    if (isOutOfCredits) {
      setShowUpgradeModal(true);
      return;
    }

    const total = recipeRequests.reduce((s, r) => s + r.count, 0);
    if (total === 0) {
      setError('Please add at least one meal type and count.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);
    setSavedRecipeNames(new Set());

    const body: GenerateRecipesBody = {
      recipeRequests,
      recipeStyle,
      recipeComplexity,
      restaurantStyles,
      theme: theme || undefined,
      decade: decade || undefined,
      includeIngredients: includeIngredients || undefined,
      excludeIngredients: excludeIngredients || undefined,
      customRequest: customRequest || undefined,
    };

    try {
      const res = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403 || data.error?.toLowerCase().includes('credit')) {
          setShowUpgradeModal(true);
          return;
        }
        throw new Error(data.error || 'Generation failed');
      }
      setRecipes(data.recipes || []);
      fetchCredits();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Save Recipe ───────────────────────────────────────────────────────────

  const handleSaveRecipe = async (recipe: Recipe, index: number) => {
    try {
      const res = await fetch('/api/recipes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe }),
      });
      if (res.ok) {
        setSavedRecipeNames((prev) => new Set([...prev, recipe.recipeName]));
      }
    } catch {
      // Save failures are non-critical
      setSavedRecipeNames((prev) => new Set([...prev, recipe.recipeName]));
    }
  };

  // ── Modify Recipe ─────────────────────────────────────────────────────────

  const handleModifySubmit = async (modificationRequest: string) => {
    if (!modifyRecipe) return;
    setIsModifying(true);
    setError(null);

    try {
      const res = await fetch('/api/recipes/modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipe: modifyRecipe.recipe,
          modificationRequest,
          recipeStyle,
          recipeComplexity,
          restaurantStyles,
          theme,
          decade,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Modification failed');

      setRecipes((prev) => {
        const updated = [...prev];
        updated[modifyRecipe.index] = data.recipe;
        return updated;
      });
      setModifyRecipe(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Modification failed. Please try again.');
    } finally {
      setIsModifying(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Modals */}
      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      {askChefRecipe && <AskChefModal recipe={askChefRecipe} onClose={() => setAskChefRecipe(null)} />}
      {modifyRecipe && (
        <ModifyModal
          recipe={modifyRecipe.recipe}
          onClose={() => setModifyRecipe(null)}
          onSubmit={handleModifySubmit}
          loading={isModifying}
        />
      )}

      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
              <ChefHat size={22} className="text-yellow-400" />
              <span className="text-xl font-black text-yellow-400 tracking-tight">MenuSparks</span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-2 min-w-0">
              <CreditsLabel credits={credits} />
              <span className="text-sm text-gray-400 hidden sm:block truncate max-w-[160px]">
                {session.user?.name || session.user?.email}
              </span>
              {session.user?.isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 px-2.5 py-1.5 rounded-lg transition flex-shrink-0"
                >
                  <ShieldCheck size={13} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
              <Link
                href="/dashboard/saved"
                className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-2.5 py-1.5 rounded-lg transition flex-shrink-0"
                title="Saved Recipes"
              >
                <BookOpen size={14} />
                <span className="hidden sm:inline">Saved</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-2.5 py-1.5 rounded-lg transition flex-shrink-0"
                title="Settings"
              >
                <Settings size={14} />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-1.5 rounded-lg transition flex-shrink-0"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Controls Panel ──────────────────────────────────────────────── */}
          <aside className="lg:col-span-4 xl:col-span-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={18} className="text-yellow-400" />
                <h2 className="text-lg font-black text-yellow-400 uppercase tracking-wide">Recipe Controls</h2>
              </div>

              <div className="space-y-6">
                {/* 1. Meal Type + Count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Meal Type &amp; Count
                  </label>
                  {/* Selected meal types with count steppers */}
                  <div className="space-y-2 mb-2">
                    {recipeRequests.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-950 border border-gray-700 rounded-lg px-3 py-2">
                        <span className="flex-1 text-sm font-semibold text-yellow-400">{req.mealType || '—'}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button type="button" onClick={() => updateRequest(i, 'count', Math.max(1, req.count - 1))}
                            className="w-6 h-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition text-gray-300">
                            <Minus size={10} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-white">{req.count}</span>
                          <button type="button" onClick={() => updateRequest(i, 'count', Math.min(10, req.count + 1))}
                            className="w-6 h-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded transition text-gray-300">
                            <Plus size={10} />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeRequest(i)}
                          className="text-gray-600 hover:text-red-400 transition p-0.5 flex-shrink-0">
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Meal type picker grid */}
                  <details className="group">
                    <summary className="cursor-pointer list-none flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 transition select-none">
                      <Plus size={13} />
                      Add Meal Type
                      <span className="text-gray-600 font-normal normal-case ml-auto group-open:hidden">tap to expand</span>
                    </summary>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      {MEAL_TYPES.map((type) => {
                        const already = recipeRequests.some(r => r.mealType === type);
                        return (
                          <button key={type} type="button"
                            onClick={() => {
                              if (already) {
                                setRecipeRequests(prev => prev.filter(r => r.mealType !== type));
                              } else {
                                setRecipeRequests(prev => [...prev, { mealType: type, count: 1 }]);
                              }
                            }}
                            className={`text-xs font-semibold px-3 py-2 rounded-lg border text-left transition ${
                              already
                                ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 cursor-default'
                                : 'bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-500'
                            }`}
                          >
                            {already ? '✓ ' : ''}{type}
                          </button>
                        );
                      })}
                    </div>
                  </details>
                </div>

                {/* 2. Recipe Style */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Recipe Style
                  </label>
                  <ToggleGroup
                    options={[
                      { value: 'creative', label: 'Creative' },
                      { value: 'classic', label: 'Classic' },
                      { value: 'hybrid', label: 'Hybrid' },
                    ]}
                    value={recipeStyle}
                    onChange={setRecipeStyle}
                  />
                </div>

                {/* 3. Recipe Complexity */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Recipe Complexity
                  </label>
                  <ToggleGroup
                    options={[
                      { value: 'basic', label: 'Basic' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'chef', label: 'Chef' },
                    ]}
                    value={recipeComplexity}
                    onChange={setRecipeComplexity}
                  />
                </div>

                {/* 4. Decade Focus */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Decade Focus
                  </label>
                  <select
                    value={decade}
                    onChange={(e) => setDecade(e.target.value)}
                    disabled={recipeStyle === 'creative'}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {DECADE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {recipeStyle === 'creative' && (
                    <p className="text-xs text-gray-600 mt-1">Decade focus applies to Classic &amp; Hybrid styles</p>
                  )}
                </div>

                {/* 5. Theme */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Theme <span className="font-normal normal-case text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g. Easter, St. Patrick's Day, Fall Harvest"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                {/* 6. Restaurant Style */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Restaurant Style <span className="font-normal normal-case text-gray-600">(select all that apply)</span>
                  </label>
                  {/* Selected tags */}
                  {restaurantStyles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {restaurantStyles.map(s => (
                        <span key={s} className="flex items-center gap-1 text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full">
                          {s}
                          <button type="button" onClick={() => toggleRestaurantStyle(s)} className="hover:text-red-400 transition">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <details className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 hover:border-gray-500 transition cursor-pointer">
                        <span className="text-sm text-gray-400">
                          {restaurantStyles.length === 0 ? 'Select styles...' : `${restaurantStyles.length} selected`}
                        </span>
                        <span className="text-gray-500 text-xs group-open:rotate-180 transition-transform inline-block">▼</span>
                      </div>
                    </summary>
                    <div className="mt-1 bg-gray-950 border border-gray-700 rounded-lg p-2 grid grid-cols-2 gap-1 max-h-52 overflow-y-auto">
                      {RESTAURANT_STYLES.map((style) => (
                        <button key={style} type="button"
                          onClick={() => toggleRestaurantStyle(style)}
                          className={`text-xs font-semibold px-3 py-2 rounded-lg border text-left transition ${
                            restaurantStyles.includes(style)
                              ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                              : 'bg-gray-900 text-gray-400 border-transparent hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          {restaurantStyles.includes(style) ? '✓ ' : ''}{style}
                        </button>
                      ))}
                    </div>
                  </details>
                </div>

                {/* 7. Must-Have Ingredients */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Must-Have Ingredients <span className="font-normal normal-case text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={includeIngredients}
                    onChange={(e) => setIncludeIngredients(e.target.value)}
                    placeholder="e.g. chicken, tomatoes, basil"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                {/* 8. Exclude Ingredients */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Exclude Ingredients <span className="font-normal normal-case text-gray-600">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={excludeIngredients}
                    onChange={(e) => setExcludeIngredients(e.target.value)}
                    placeholder="e.g. peanuts, gluten, dairy"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>

                {/* 9. Special Request */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Special Request <span className="font-normal normal-case text-gray-600">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={customRequest}
                    onChange={(e) => setCustomRequest(e.target.value)}
                    placeholder="e.g. vegetarian focus, date night vibe, budget-friendly..."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black font-black py-3.5 px-4 rounded-xl hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 text-sm uppercase tracking-wider shadow-lg shadow-yellow-500/10"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Crafting your specials...
                    </>
                  ) : (
                    <>
                      <ChefHat size={18} />
                      Generate Recipes
                    </>
                  )}
                </button>

                {/* Out of credits CTA */}
                {isOutOfCredits && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition"
                  >
                    <Crown size={13} /> Upgrade for unlimited recipes
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Results Panel ────────────────────────────────────────────────── */}
          <section className="lg:col-span-8 xl:col-span-8">
            {/* Error Banner */}
            {error && (
              <div className="flex items-center gap-3 bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
                <AlertTriangle size={16} className="flex-shrink-0 text-red-400" />
                <span>{error}</span>
                <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-300">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center bg-gray-900 border border-gray-800 rounded-2xl p-16">
                <div className="relative mb-6">
                  <ChefHat size={48} className="text-yellow-400 animate-pulse" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Loader2 size={12} className="animate-spin text-black" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Crafting your specials...</h3>
                <p className="text-gray-500 text-sm">The chef is working. This may take a moment.</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && recipes.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center bg-gray-900 border-2 border-dashed border-gray-800 rounded-2xl p-16">
                <ChefHat size={56} className="text-gray-700 mb-5" />
                <h3 className="text-xl font-bold text-gray-300 mb-2">Your recipes await</h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  Configure your recipe controls on the left and hit &ldquo;Generate Recipes&rdquo; to get started.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {['Creative Dinner', 'Classic Appetizer', 'Chef-Level Entree'].map((example) => (
                    <span key={example} className="text-xs text-gray-600 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-full">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recipe Cards */}
            {!isLoading && recipes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
                    {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''} Generated
                  </h2>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition"
                  >
                    <RefreshCw size={12} />
                    Regenerate
                  </button>
                </div>

                {recipes.map((recipe, index) => (
                  <RecipeCard
                    key={`${recipe.recipeName}-${index}`}
                    recipe={recipe}
                    saved={savedRecipeNames.has(recipe.recipeName)}
                    onSave={() => handleSaveRecipe(recipe, index)}
                    onAskChef={() => setAskChefRecipe(recipe)}
                    onModify={() => setModifyRecipe({ recipe, index })}
                  />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
