'use client'

import { useState } from 'react'
import { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h3>
            <p className="text-gray-600">{recipe.description}</p>
            <p className="text-sm text-orange-600 font-semibold mt-2">{recipe.yield}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 px-3 py-1 text-sm bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors"
          >
            {isExpanded ? 'Collapse' : 'View Details'}
          </button>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Key Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 5 && (
              <span className="px-2 py-1 text-gray-500 text-sm">
                +{recipe.ingredients.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* Full Ingredients */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">All Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Prep Steps */}
            {recipe.prep && recipe.prep.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Mise en Place:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {recipe.prep.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Bulk Prep */}
            {recipe.bulkPrep && recipe.bulkPrep.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pre-Service Prep:</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {recipe.bulkPrep.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Service Instructions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Service Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>

            {/* Chef Notes */}
            {recipe.chefNotes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Chef's Notes:</h4>
                <p className="text-gray-700 italic">{recipe.chefNotes}</p>
              </div>
            )}

            {/* Social Media Post */}
            {recipe.socialMediaPost && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">📱 Social Media Post:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{recipe.socialMediaPost}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
                Print Recipe
              </button>
              <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                Save to Favorites
              </button>
              <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors">
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}