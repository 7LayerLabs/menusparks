'use client'

import { useState } from 'react'
import RecipeSettings from './RecipeSettings'
import RecipeOutput from './RecipeOutput'

export default function RecipeGenerator() {
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState<any[]>([])
  const [error, setError] = useState('')

  const generateRecipes = async (settings: any) => {
    setLoading(true)
    setError('')
    setRecipes([])

    try {
      const formData = new FormData()
      
      // Add all settings to form data
      formData.append('recipeRequests', JSON.stringify(settings.recipeRequests))
      formData.append('customRequest', settings.customRequest || '')
      formData.append('includeIngredients', settings.includeIngredients || '')
      formData.append('excludeIngredients', settings.excludeIngredients || '')
      formData.append('equipment', JSON.stringify(settings.equipment || []))
      formData.append('recipeStyle', settings.recipeStyle || 'creative')
      formData.append('recipeComplexity', settings.recipeComplexity || 'intermediate')
      formData.append('restaurantStyle', settings.restaurantStyle || '')
      formData.append('theme', settings.theme || '')

      // Add files if they exist
      if (settings.ingredientFiles) {
        settings.ingredientFiles.forEach((file: File) => {
          formData.append('ingredients', file)
        })
      }

      if (settings.menuFiles) {
        settings.menuFiles.forEach((file: File) => {
          formData.append('menus', file)
        })
      }

      // Call our secure API endpoint
      const response = await fetch('/api/generate-recipes-full', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setRecipes(data.recipes || [])
        // Save to history
        const history = JSON.parse(localStorage.getItem('recipeHistory') || '[]')
        const newEntry = {
          id: Date.now(),
          date: new Date().toISOString(),
          recipes: data.recipes,
          settings: settings
        }
        history.unshift(newEntry)
        localStorage.setItem('recipeHistory', JSON.stringify(history.slice(0, 50)))
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate recipes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Settings Panel */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
            Generate Chef-Quality Specials
          </h2>
          <p className="text-gray-600">
            Create restaurant-quality recipes tailored to your ingredients, style, and equipment
          </p>
        </div>
        <RecipeSettings onGenerate={generateRecipes} loading={loading} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-red-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Recipe Generation Error</h3>
              <p className="text-red-700 mb-3">{error}</p>
              <button
                onClick={() => setError('')}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Dismiss error and try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating your restaurant-quality specials...</p>
          <p className="text-sm text-gray-500 mt-2">This usually takes 10-15 seconds</p>
        </div>
      )}

      {/* Recipe Output */}
      {recipes.length > 0 && !loading && (
        <RecipeOutput recipes={recipes} />
      )}
    </div>
  )
}