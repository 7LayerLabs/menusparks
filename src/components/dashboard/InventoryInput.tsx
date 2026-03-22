'use client'

import { useState } from 'react'

export interface InventoryItem {
  id: string
  name: string
  quantity: string
  unit: string
  category: string
  notes: string
}

interface InventoryInputProps {
  onInventoryChange: (items: InventoryItem[]) => void
}

const CATEGORIES = [
  'Protein',
  'Seafood',
  'Produce',
  'Dairy',
  'Dry Goods',
  'Frozen',
  'Herbs & Spices',
  'Other',
]

const UNITS = [
  'lbs', 'oz', 'kg', 'g',
  'cases', 'portions', 'each', 'dozen',
  'gallons', 'quarts', 'pints', 'cups',
  'bunches', 'bags', 'boxes', 'cans',
]

const QUICK_PROTEINS = [
  'Chicken Breast', 'Chicken Thigh', 'Ground Beef', 'Sirloin', 'Ribeye',
  'Pork Tenderloin', 'Bacon', 'Sausage', 'Lamb Chops',
]

const QUICK_SEAFOOD = [
  'Haddock', 'Cod', 'Salmon', 'Shrimp', 'Scallops', 'Lobster',
  'Clams', 'Mussels', 'Tuna', 'Tilapia', 'Swordfish',
]

const QUICK_PRODUCE = [
  'Potatoes', 'Onions', 'Garlic', 'Tomatoes', 'Spinach', 'Mushrooms',
  'Bell Peppers', 'Carrots', 'Broccoli', 'Asparagus', 'Corn', 'Zucchini',
]

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

function emptyItem(): InventoryItem {
  return { id: generateId(), name: '', quantity: '', unit: 'lbs', category: 'Protein', notes: '' }
}

export default function InventoryInput({ onInventoryChange }: InventoryInputProps) {
  const [items, setItems] = useState<InventoryItem[]>([emptyItem()])
  const [pasteMode, setPasteMode] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const [activeQuickAdd, setActiveQuickAdd] = useState<string | null>(null)

  const updateItem = (id: string, field: keyof InventoryItem, value: string) => {
    const updated = items.map(item => item.id === id ? { ...item, [field]: value } : item)
    setItems(updated)
    onInventoryChange(updated.filter(i => i.name.trim()))
  }

  const addRow = () => {
    const updated = [...items, emptyItem()]
    setItems(updated)
    onInventoryChange(updated.filter(i => i.name.trim()))
  }

  const removeRow = (id: string) => {
    const updated = items.filter(i => i.id !== id)
    const final = updated.length === 0 ? [emptyItem()] : updated
    setItems(final)
    onInventoryChange(final.filter(i => i.name.trim()))
  }

  const quickAdd = (name: string, category: string) => {
    // Check if already in list
    if (items.some(i => i.name.toLowerCase() === name.toLowerCase())) return
    // Fill the last empty row or add new one
    const lastEmpty = items.findIndex(i => !i.name.trim())
    let updated: InventoryItem[]
    if (lastEmpty >= 0) {
      updated = items.map((item, idx) =>
        idx === lastEmpty ? { ...item, name, category } : item
      )
    } else {
      updated = [...items, { id: generateId(), name, quantity: '', unit: 'lbs', category, notes: '' }]
    }
    setItems(updated)
    onInventoryChange(updated.filter(i => i.name.trim()))
  }

  const parsePaste = () => {
    // Parse lines like "3 lbs haddock" or "haddock - 3 lbs" or just "haddock"
    const lines = pasteText.split('\n').filter(l => l.trim())
    const parsed: InventoryItem[] = lines.map(line => {
      const item = emptyItem()
      // Try to extract quantity + unit + name
      const match = line.match(/^([\d.]+)\s*(lbs?|oz|kg|g|cases?|portions?|each|dozen|gallons?|quarts?|pints?|cups?|bunches?|bags?|boxes?|cans?)?\s+(.+)$/i)
      if (match) {
        item.quantity = match[1]
        item.unit = match[2] || 'lbs'
        item.name = match[3].trim()
      } else {
        // Just take the whole line as the name
        item.name = line.replace(/[-–—]\s*[\d.]+\s*\w+/g, '').trim()
        const unitMatch = line.match(/([\d.]+)\s*(lbs?|oz|kg|g|cases?|portions?)/i)
        if (unitMatch) {
          item.quantity = unitMatch[1]
          item.unit = unitMatch[2]
        }
      }
      // Categorize by name
      const lower = item.name.toLowerCase()
      if (/chicken|beef|pork|lamb|duck|veal|steak|ground/.test(lower)) item.category = 'Protein'
      else if (/fish|salmon|haddock|cod|shrimp|lobster|scallop|clam|mussel|tuna|tilapia|seafood|halibut/.test(lower)) item.category = 'Seafood'
      else if (/potato|onion|garlic|tomato|pepper|carrot|spinach|lettuce|mushroom|corn|zucchini|broccoli|asparagus|herb|basil|thyme|parsley/.test(lower)) item.category = 'Produce'
      else if (/milk|cream|butter|cheese|egg|yogurt/.test(lower)) item.category = 'Dairy'
      return item
    }).filter(i => i.name)

    if (parsed.length > 0) {
      setItems(parsed)
      onInventoryChange(parsed.filter(i => i.name.trim()))
      setPasteMode(false)
      setPasteText('')
    }
  }

  const filledCount = items.filter(i => i.name.trim()).length

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            What's in your walk-in?
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Add what you have. We'll build specials around it — no extra spending.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPasteMode(!pasteMode)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
          >
            {pasteMode ? 'Cancel' : 'Paste List'}
          </button>
        </div>
      </div>

      {/* Paste mode */}
      {pasteMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-800 mb-2">
            Paste your inventory list — one item per line. Works with formats like "3 lbs haddock" or just "haddock".
          </p>
          <textarea
            value={pasteText}
            onChange={e => setPasteText(e.target.value)}
            placeholder={"3 lbs haddock\n2 cases chicken breast\n10 lbs potatoes\nasparagus\nbutter - 5 lbs\n..."}
            rows={6}
            className="w-full px-3 py-2 border border-amber-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          />
          <button
            type="button"
            onClick={parsePaste}
            disabled={!pasteText.trim()}
            className="mt-2 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 disabled:opacity-40 transition-colors"
          >
            Parse & Import
          </button>
        </div>
      )}

      {/* Quick add buttons */}
      <div className="space-y-2">
        {[
          { label: 'Proteins', items: QUICK_PROTEINS, cat: 'Protein', color: 'red' },
          { label: 'Seafood', items: QUICK_SEAFOOD, cat: 'Seafood', color: 'blue' },
          { label: 'Produce', items: QUICK_PRODUCE, cat: 'Produce', color: 'green' },
        ].map(group => (
          <div key={group.label}>
            <button
              type="button"
              onClick={() => setActiveQuickAdd(activeQuickAdd === group.label ? null : group.label)}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-1"
            >
              <span>{activeQuickAdd === group.label ? '▼' : '▶'}</span>
              Quick add {group.label}
            </button>
            {activeQuickAdd === group.label && (
              <div className="flex flex-wrap gap-1.5">
                {group.items.map(name => {
                  const already = items.some(i => i.name.toLowerCase() === name.toLowerCase())
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => quickAdd(name, group.cat)}
                      disabled={already}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        already
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : `bg-${group.color}-50 text-${group.color}-700 border border-${group.color}-200 hover:bg-${group.color}-100`
                      }`}
                    >
                      {already ? '✓ ' : '+ '}{name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inventory table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
          <div className="col-span-4">Item</div>
          <div className="col-span-2">Qty</div>
          <div className="col-span-2">Unit</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 px-3 py-2 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={e => updateItem(item.id, 'name', e.target.value)}
                  placeholder={idx === 0 ? 'e.g., Fresh Haddock' : 'Item name...'}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  value={item.quantity}
                  onChange={e => updateItem(item.id, 'quantity', e.target.value)}
                  placeholder="3"
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-center"
                />
              </div>
              <div className="col-span-2">
                <select
                  value={item.unit}
                  onChange={e => updateItem(item.id, 'unit', e.target.value)}
                  className="w-full px-1 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                >
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="col-span-3">
                <select
                  value={item.category}
                  onChange={e => updateItem(item.id, 'category', e.target.value)}
                  className="w-full px-1 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => removeRow(item.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add row */}
        <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={addRow}
            className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add item
          </button>
        </div>
      </div>

      {/* Summary */}
      {filledCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>{filledCount} item{filledCount !== 1 ? 's' : ''}</strong> in your inventory — AI will build specials around what you have, no extra spend.
          </span>
        </div>
      )}
    </div>
  )
}
