'use client'

import { useState } from 'react'

export default function RecipeTestPage() {
  const [ingredients, setIngredients] = useState('')
  const [recipeCount, setRecipeCount] = useState(3)
  const [style, setStyle] = useState('creative')
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState<any[]>([])
  const [error, setError] = useState('')

  const generateRecipes = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients')
      return
    }

    setLoading(true)
    setError('')
    setRecipes([])

    try {
      // Call our SECURE backend API
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          recipeCount,
          style,
          complexity: 'intermediate',
          restaurantStyle: 'American Casual'
        })
      })

      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setRecipes(data.recipes || [])
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate recipes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Recipe Generator Test (Secure API)
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Ingredients
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., chicken breast, tomatoes, basil, pasta"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Recipes
                </label>
                <select
                  value={recipeCount}
                  onChange={(e) => setRecipeCount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>1 Recipe</option>
                  <option value={3}>3 Recipes</option>
                  <option value={5}>5 Recipes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="creative">Creative</option>
                  <option value="classic">Classic</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <button
              onClick={generateRecipes}
              disabled={loading}
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Recipes'}
            </button>
          </div>
        </div>

        {/* Results */}
        {recipes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Generated Recipes</h2>
            
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {recipe.recipeName}
                </h3>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-semibold">Yield:</span> {recipe.yield}
                  </div>
                  {recipe.costPerServing && (
                    <div>
                      <span className="font-semibold">Cost:</span> ${recipe.costPerServing}
                    </div>
                  )}
                </div>

                {recipe.ingredients && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {recipe.ingredients.map((ing: string, i: number) => (
                        <li key={i} className="text-gray-700">{ing}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {recipe.instructions && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {recipe.instructions.map((inst: string, i: number) => (
                        <li key={i} className="text-gray-700">{inst}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {recipe.chefNotes && (
                  <div className="p-3 bg-gray-100 rounded">
                    <span className="font-semibold">Chef's Notes:</span> {recipe.chefNotes}
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