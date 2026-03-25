'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import {
  ChefHat, ArrowLeft, Printer, Trash2, Loader2,
  AlertTriangle, Search, Tag, X, ChevronDown, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

interface SavedRecipe {
  id: string;
  recipeName: string;
  mealType: string;
  description: string;
  yield: string;
  ingredients: string;
  prep: string;
  bulkPrep: string;
  instructions: string;
  chefNotes: string | null;
  socialPost: string | null;
  tags: string;
  createdAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_ORDER = [
  'Appetizer', 'Soup', 'Salad', 'Entree', 'Side Dish', 'Dessert',
  'Breakfast/Brunch', 'Lunch Special', 'Kids Menu', 'Seafood Special',
  'Vegetarian/Vegan', 'Pasta', 'Pizza', 'Sandwich/Wrap',
];

const SEASON_TAGS = ['Spring', 'Summer', 'Fall', 'Winter'];
const EVENT_TAGS = ['Holiday', 'Easter', 'Thanksgiving', 'Christmas', 'Valentine\'s Day', 'Mother\'s Day', 'Father\'s Day', 'New Year\'s', 'Fourth of July', 'Halloween', 'Date Night', 'Catering', 'Brunch Special', 'Weekend Special'];

// ─── Print Helper ─────────────────────────────────────────────────────────────

function printRecipe(recipe: SavedRecipe) {
  const ingredients: string[] = (() => { try { return JSON.parse(recipe.ingredients); } catch { return []; } })();
  const instructions: string[] = (() => { try { return JSON.parse(recipe.instructions); } catch { return []; } })();
  const prep: string[] = (() => { try { return JSON.parse(recipe.prep); } catch { return []; } })();
  const bulkPrep: string[] = (() => { try { return JSON.parse(recipe.bulkPrep); } catch { return []; } })();

  const prepHtml = prep.length ? `<h3>Mise en Place</h3><ol style="padding-left:18px">${prep.map(s => `<li>${s}</li>`).join('')}</ol>` : '';
  const bulkHtml = bulkPrep.length ? `<h3>Pre-Service Prep</h3><ol style="padding-left:18px">${bulkPrep.map(s => `<li>${s}</li>`).join('')}</ol>` : '';
  const notesHtml = recipe.chefNotes ? `<h3>Chef's Notes</h3><p>${recipe.chefNotes}</p>` : '';

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
    <h3>Ingredients</h3><ul style="padding-left:18px">${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    ${prepHtml}${bulkHtml}
    <h3>Instructions</h3><ol style="padding-left:18px">${instructions.map(s => `<li style="margin-bottom:6px">${s}</li>`).join('')}</ol>
    ${notesHtml}
  </body></html>`;

  const win = window.open('', '_blank');
  if (win) { win.document.write(html); win.document.close(); win.focus(); win.print(); }
}

// ─── Tag Modal ────────────────────────────────────────────────────────────────

function TagModal({
  recipe,
  onClose,
  onSave,
}: {
  recipe: SavedRecipe;
  onClose: () => void;
  onSave: (id: string, tags: string[]) => void;
}) {
  const current: string[] = (() => { try { return JSON.parse(recipe.tags); } catch { return []; } })();
  const [selected, setSelected] = useState<string[]>(current);
  const [saving, setSaving] = useState(false);

  const toggle = (tag: string) =>
    setSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/recipes/saved/${recipe.id}/tags`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: selected }),
      });
      onSave(recipe.id, selected);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div>
            <h3 className="font-bold text-white">Tag Recipe</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{recipe.recipeName}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition p-1"><X size={18} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Season</p>
            <div className="flex flex-wrap gap-2">
              {SEASON_TAGS.map(tag => (
                <button key={tag} onClick={() => toggle(tag)}
                  className={`text-sm px-3 py-1.5 rounded-full border font-semibold transition ${selected.includes(tag) ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-yellow-500/50'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Event / Occasion</p>
            <div className="flex flex-wrap gap-2">
              {EVENT_TAGS.map(tag => (
                <button key={tag} onClick={() => toggle(tag)}
                  className={`text-sm px-3 py-1.5 rounded-full border font-semibold transition ${selected.includes(tag) ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-yellow-500/50'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 pb-5">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white bg-gray-800 rounded-lg transition">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition">
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Tags
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  recipes,
  activeFilter,
  onFilter,
}: {
  recipes: SavedRecipe[];
  activeFilter: string;
  onFilter: (f: string) => void;
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [seasonsOpen, setSeasonsOpen] = useState(true);
  const [eventsOpen, setEventsOpen] = useState(false);

  // Count by mealType
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    recipes.forEach(r => { counts[r.mealType] = (counts[r.mealType] ?? 0) + 1; });
    return counts;
  }, [recipes]);

  // Count by tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    recipes.forEach(r => {
      const tags: string[] = (() => { try { return JSON.parse(r.tags); } catch { return []; } })();
      tags.forEach(t => { counts[t] = (counts[t] ?? 0) + 1; });
    });
    return counts;
  }, [recipes]);

  // Show all actual mealTypes from saved recipes, preferred order first, then any others alphabetically
  const allCategories = Object.keys(categoryCounts);
  const presentCategories = [
    ...CATEGORY_ORDER.filter(c => categoryCounts[c]),
    ...allCategories.filter(c => !CATEGORY_ORDER.includes(c)).sort(),
  ];
  const presentSeasons = SEASON_TAGS.filter(t => tagCounts[t]);
  const presentEvents = EVENT_TAGS.filter(t => tagCounts[t]);

  const NavItem = ({ value, label, count }: { value: string; label: string; count: number }) => (
    <button
      onClick={() => onFilter(value)}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
        activeFilter === value
          ? 'bg-yellow-500/15 text-yellow-400 font-bold border border-yellow-500/30'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <span className="truncate">{label}</span>
      <span className={`text-xs ml-2 flex-shrink-0 ${activeFilter === value ? 'text-yellow-500' : 'text-gray-600'}`}>{count}</span>
    </button>
  );

  const SectionHeader = ({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="w-full flex items-center justify-between px-1 py-1.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-300 transition mt-4 mb-1">
      {label}
      {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
    </button>
  );

  return (
    <aside className="w-56 flex-shrink-0">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sticky top-24">
        <NavItem value="all" label="All Recipes" count={recipes.length} />

        <SectionHeader label="By Category" open={categoriesOpen} onToggle={() => setCategoriesOpen(v => !v)} />
        {categoriesOpen && (
          <div className="space-y-0.5">
            {presentCategories.length === 0
              ? <p className="text-xs text-gray-600 px-3 py-1">None saved yet</p>
              : presentCategories.map(c => <NavItem key={c} value={`category:${c}`} label={c} count={categoryCounts[c]} />)
            }
          </div>
        )}

        <SectionHeader label="By Season" open={seasonsOpen} onToggle={() => setSeasonsOpen(v => !v)} />
        {seasonsOpen && (
          <div className="space-y-0.5">
            {presentSeasons.length === 0
              ? <p className="text-xs text-gray-600 px-3 py-1">Tag recipes to filter</p>
              : presentSeasons.map(t => <NavItem key={t} value={`tag:${t}`} label={t} count={tagCounts[t]} />)
            }
          </div>
        )}

        <SectionHeader label="By Event" open={eventsOpen} onToggle={() => setEventsOpen(v => !v)} />
        {eventsOpen && (
          <div className="space-y-0.5">
            {presentEvents.length === 0
              ? <p className="text-xs text-gray-600 px-3 py-1">Tag recipes to filter</p>
              : presentEvents.map(t => <NavItem key={t} value={`tag:${t}`} label={t} count={tagCounts[t]} />)
            }
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Recipe Card ──────────────────────────────────────────────────────────────

function RecipeCard({
  recipe,
  onDelete,
  onTag,
  deleting,
}: {
  recipe: SavedRecipe;
  onDelete: (id: string) => void;
  onTag: (recipe: SavedRecipe) => void;
  deleting: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const ingredients: string[] = (() => { try { return JSON.parse(recipe.ingredients); } catch { return []; } })();
  const instructions: string[] = (() => { try { return JSON.parse(recipe.instructions); } catch { return []; } })();
  const prep: string[] = (() => { try { return JSON.parse(recipe.prep); } catch { return []; } })();
  const bulkPrep: string[] = (() => { try { return JSON.parse(recipe.bulkPrep); } catch { return []; } })();
  const tags: string[] = (() => { try { return JSON.parse(recipe.tags); } catch { return []; } })();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header — always visible */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-black text-yellow-400 leading-tight">{recipe.recipeName}</h3>
            <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded">
                {recipe.mealType}
              </span>
              {tags.map(tag => (
                <span key={tag} className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xs text-gray-500 bg-gray-800 border border-gray-700 px-2 py-1 rounded-lg whitespace-nowrap">
              {recipe.yield}
            </span>
          </div>
        </div>
        {recipe.description && (
          <p className="mt-2 text-gray-400 text-sm leading-relaxed line-clamp-2">{recipe.description}</p>
        )}
        <p className="mt-1.5 text-xs text-gray-600">
          Saved {new Date(recipe.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Expandable body */}
      {expanded && (
        <div className="px-5 pb-4 space-y-4 border-t border-gray-800 pt-4">
          {ingredients.length > 0 && (
            <section>
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Ingredients</h4>
              <ul className="space-y-1">
                {ingredients.map((ing, i) => (
                  <li key={i} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-yellow-600 mt-0.5 flex-shrink-0">—</span>{ing}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {prep.length > 0 && (
            <section>
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Mise en Place</h4>
              <ol className="space-y-1">
                {prep.map((step, i) => (
                  <li key={i} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-yellow-600 font-bold flex-shrink-0 w-5">{i + 1}.</span>{step}
                  </li>
                ))}
              </ol>
            </section>
          )}
          {bulkPrep.length > 0 && (
            <section>
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Pre-Service Prep</h4>
              <ol className="space-y-1">
                {bulkPrep.map((step, i) => (
                  <li key={i} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-yellow-600 font-bold flex-shrink-0 w-5">{i + 1}.</span>{step}
                  </li>
                ))}
              </ol>
            </section>
          )}
          {instructions.length > 0 && (
            <section>
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Instructions</h4>
              <ol className="space-y-2">
                {instructions.map((step, i) => (
                  <li key={i} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-yellow-500 font-black flex-shrink-0 w-5">{i + 1}.</span>{step}
                  </li>
                ))}
              </ol>
            </section>
          )}
          {recipe.chefNotes && (
            <section className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-500 mb-2">Chef&apos;s Notes</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{recipe.chefNotes}</p>
            </section>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="px-5 pb-5 flex flex-wrap gap-2 border-t border-gray-800 pt-4">
        <button
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          {expanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          {expanded ? 'Collapse' : 'View Recipe'}
        </button>
        <button
          onClick={() => printRecipe(recipe)}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          <Printer size={15} />
          Print
        </button>
        <button
          onClick={() => onTag(recipe)}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          <Tag size={15} />
          Tag
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          disabled={deleting}
          className="flex items-center gap-1.5 text-sm font-bold bg-gray-800 text-red-400 border border-gray-700 px-4 py-2 rounded-lg hover:bg-red-900/30 hover:border-red-700 transition disabled:opacity-50 ml-auto"
        >
          {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
          Delete
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SavedRecipesPage() {
  const { status } = useSession();
  const router = useRouter();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [tagRecipe, setTagRecipe] = useState<SavedRecipe | null>(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/recipes/saved')
      .then(r => r.json())
      .then(data => { if (data.recipes) setRecipes(data.recipes); else setError(data.error || 'Failed to load'); })
      .catch(() => setError('Failed to load saved recipes'))
      .finally(() => setLoading(false));
  }, [status]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/recipes/saved/${id}`, { method: 'DELETE' });
      if (res.ok) setRecipes(prev => prev.filter(r => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleTagSave = (id: string, tags: string[]) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, tags: JSON.stringify(tags) } : r));
  };

  const filtered = useMemo(() => {
    let list = recipes;
    if (activeFilter !== 'all') {
      if (activeFilter.startsWith('category:')) {
        const cat = activeFilter.slice(9);
        list = list.filter(r => r.mealType === cat);
      } else if (activeFilter.startsWith('tag:')) {
        const tag = activeFilter.slice(4);
        list = list.filter(r => {
          const tags: string[] = (() => { try { return JSON.parse(r.tags); } catch { return []; } })();
          return tags.includes(tag);
        });
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.recipeName.toLowerCase().includes(q) ||
        r.mealType.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [recipes, activeFilter, search]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 size={32} className="text-yellow-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {tagRecipe && (
        <TagModal
          recipe={tagRecipe}
          onClose={() => setTagRecipe(null)}
          onSave={handleTagSave}
        />
      )}

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ChefHat size={22} className="text-yellow-400" />
              <span className="text-xl font-black text-yellow-400 tracking-tight">MenuSparks</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition">
              <ArrowLeft size={15} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar recipes={recipes} activeFilter={activeFilter} onFilter={setActiveFilter} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header + search */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div>
                <h1 className="text-2xl font-black text-yellow-400">Saved Recipes</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {filtered.length} of {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
                  {activeFilter !== 'all' && <button onClick={() => setActiveFilter('all')} className="ml-2 text-yellow-500 hover:text-yellow-400 underline text-xs">clear filter</button>}
                </p>
              </div>
              <div className="relative ml-auto">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search recipes..."
                  className="bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-56"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-4 py-3 mb-6">
                <AlertTriangle size={16} />{error}
              </div>
            )}

            {filtered.length === 0 && !error && (
              <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl">
                <p className="text-gray-400 text-lg font-semibold">
                  {recipes.length === 0 ? 'No saved recipes yet' : 'No recipes match this filter'}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {recipes.length === 0
                    ? 'Generate recipes on the dashboard and click "Save Recipe"'
                    : 'Try a different category or clear the filter'}
                </p>
                {recipes.length === 0 && (
                  <Link href="/dashboard" className="inline-flex items-center gap-2 mt-6 bg-yellow-500 text-black font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition">
                    Go Generate Recipes
                  </Link>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filtered.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={handleDelete}
                  onTag={setTagRecipe}
                  deleting={deletingId === recipe.id}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
