'use client'

import { useState, useEffect } from 'react'
import RecipeOutput from './RecipeOutput'

export default function RecipeHistory() {
  const [history, setHistory] = useState<any[]>([])
  const [selectedEntry, setSelectedEntry] = useState<any>(null)

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('recipeHistory') || '[]')
    setHistory(savedHistory)
  }, [])

  const deleteEntry = (id: number) => {
    const updatedHistory = history.filter(entry => entry.id !== id)
    setHistory(updatedHistory)
    localStorage.setItem('recipeHistory', JSON.stringify(updatedHistory))
    if (selectedEntry?.id === id) {
      setSelectedEntry(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipe Generation History</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No history yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Generate your first set of recipes to see them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* History List */}
            <div className="lg:col-span-1 space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Past Generations</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedEntry?.id === entry.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {entry.recipes.length} recipe{entry.recipes.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(entry.date)}
                        </p>
                        {entry.settings?.theme && (
                          <p className="text-xs text-gray-600 mt-1">
                            Theme: {entry.settings.theme}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteEntry(entry.id)
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipe Display */}
            <div className="lg:col-span-2">
              {selectedEntry ? (
                <>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Generated on {formatDate(selectedEntry.date)}
                  </h3>
                  <RecipeOutput recipes={selectedEntry.recipes} />
                </>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Select a generation to view recipes</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}