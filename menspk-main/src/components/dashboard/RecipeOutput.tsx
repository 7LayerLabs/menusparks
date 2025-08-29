'use client'

import { useState } from 'react'

interface RecipeOutputProps {
  recipes: any[]
}

export default function RecipeOutput({ recipes }: RecipeOutputProps) {
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(0)
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])

  const saveRecipe = (index: number) => {
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    const recipeToSave = {
      ...recipes[index],
      savedAt: new Date().toISOString(),
      id: Date.now()
    }
    saved.unshift(recipeToSave)
    localStorage.setItem('savedRecipes', JSON.stringify(saved))
    setSavedRecipes([...savedRecipes, index])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const exportRecipe = (recipe: any) => {
    const content = `
# ${recipe.recipeName}

${recipe.description}

**Yield:** ${recipe.yield}

## Ingredients
${recipe.ingredients?.map((i: string) => `- ${i}`).join('\n') || ''}

## Prep
${recipe.prep?.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n') || ''}

## Bulk Prep
${recipe.bulkPrep?.map((b: string, i: number) => `${i + 1}. ${b}`).join('\n') || ''}

## Service Instructions
${recipe.instructions?.map((inst: string, i: number) => `${i + 1}. ${inst}`).join('\n') || ''}

## Chef's Notes
${recipe.chefNotes || ''}

## Social Media Post
${recipe.socialMediaPost || ''}
    `
    
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${recipe.recipeName.replace(/\s+/g, '_')}.md`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Generated Specials ({recipes.length} recipes)
        </h3>
        
        <div className="space-y-4">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Recipe Header */}
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === index ? null : index)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {recipe.recipeName}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {recipe.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        {recipe.yield}
                      </span>
                      {recipe.costPerServing && (
                        <span className="text-xs text-green-600 font-medium">
                          Cost: ${recipe.costPerServing}
                        </span>
                      )}
                      {recipe.suggestedPrice && (
                        <span className="text-xs text-blue-600 font-medium">
                          Menu Price: ${recipe.suggestedPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedRecipe === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedRecipe === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Ingredients */}
                      {recipe.ingredients && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Ingredients</h5>
                          <ul className="space-y-1">
                            {recipe.ingredients.map((ing: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700 flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                {ing}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Prep */}
                      {recipe.prep && recipe.prep.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Mise en Place</h5>
                          <ol className="space-y-1">
                            {recipe.prep.map((step: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700 flex">
                                <span className="text-orange-500 mr-2">{i + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Bulk Prep */}
                      {recipe.bulkPrep && recipe.bulkPrep.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Bulk Prep</h5>
                          <ol className="space-y-1">
                            {recipe.bulkPrep.map((step: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700 flex">
                                <span className="text-orange-500 mr-2">{i + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Service Instructions */}
                      {recipe.instructions && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Service Instructions</h5>
                          <ol className="space-y-1">
                            {recipe.instructions.map((inst: string, i: number) => (
                              <li key={i} className="text-sm text-gray-700 flex">
                                <span className="text-orange-500 mr-2">{i + 1}.</span>
                                <span>{inst}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chef Notes */}
                  {recipe.chefNotes && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-1">Chef's Notes</h5>
                      <p className="text-sm text-gray-700">{recipe.chefNotes}</p>
                    </div>
                  )}

                  {/* Social Media Post */}
                  {recipe.socialMediaPost && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-semibold text-gray-900">Social Media Post</h5>
                        <button
                          onClick={() => copyToClipboard(recipe.socialMediaPost)}
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-gray-700">{recipe.socialMediaPost}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => exportRecipe(recipe)}
                      className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Export
                    </button>
                    <button
                      onClick={() => saveRecipe(index)}
                      disabled={savedRecipes.includes(index)}
                      className="px-4 py-2 text-sm text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {savedRecipes.includes(index) ? 'Saved' : 'Save Recipe'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}