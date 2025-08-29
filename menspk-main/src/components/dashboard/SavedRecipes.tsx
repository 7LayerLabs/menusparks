'use client'

import { useState, useEffect } from 'react'

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([])
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    setSavedRecipes(saved)
  }, [])

  const deleteRecipe = (id: number) => {
    const updated = savedRecipes.filter(recipe => recipe.id !== id)
    setSavedRecipes(updated)
    localStorage.setItem('savedRecipes', JSON.stringify(updated))
  }

  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.recipeName.toLowerCase().includes(filter.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Saved Recipes</h2>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search recipes..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {filteredRecipes.length === 0 ? (
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {filter ? 'No recipes match your search' : 'No saved recipes yet'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Save recipes from your generations to access them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {recipe.recipeName}
                  </h3>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className="text-gray-400 hover:text-red-500 ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{recipe.yield}</span>
                  <span>Saved {new Date(recipe.savedAt).toLocaleDateString()}</span>
                </div>

                <button
                  onClick={() => setExpandedRecipe(expandedRecipe === index ? null : index)}
                  className="w-full px-3 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {expandedRecipe === index ? 'Hide Details' : 'View Details'}
                </button>

                {expandedRecipe === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    {recipe.ingredients && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-1">Ingredients</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {recipe.ingredients.slice(0, 5).map((ing: string, i: number) => (
                            <li key={i}>• {ing}</li>
                          ))}
                          {recipe.ingredients.length > 5 && (
                            <li className="text-gray-400">... and {recipe.ingredients.length - 5} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    {recipe.chefNotes && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 mb-1">Chef's Notes</h4>
                        <p className="text-xs text-gray-600">{recipe.chefNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}