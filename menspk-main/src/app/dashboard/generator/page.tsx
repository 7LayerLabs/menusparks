'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FileUpload from '@/components/generator/FileUpload'
import RecipeCard from '@/components/generator/RecipeCard'
import EquipmentSelector from '@/components/generator/EquipmentSelector'
import RecipeCountSelector from '@/components/generator/RecipeCountSelector'
import { generateRecipes } from '@/services/geminiService'
import { Recipe } from '@/types/recipe'

type RecipeStyle = 'creative' | 'classic' | 'hybrid'
type RecipeComplexity = 'basic' | 'intermediate' | 'chef'

export default function GeneratorPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Generator State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [menuFiles, setMenuFiles] = useState<File[]>([])
  const [recipeRequests, setRecipeRequests] = useState([{ mealType: 'Dinner', count: 3 }])
  const [recipeStyle, setRecipeStyle] = useState<RecipeStyle>('creative')
  const [recipeComplexity, setRecipeComplexity] = useState<RecipeComplexity>('intermediate')
  const [restaurantStyle, setRestaurantStyle] = useState('')
  const [theme, setTheme] = useState('')
  const [customRequest, setCustomRequest] = useState('')
  const [includeIngredients, setIncludeIngredients] = useState('')
  const [excludeIngredients, setExcludeIngredients] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  
  // Output State
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // TEMPORARILY DISABLED FOR TESTING - FREE ACCESS
    setIsAuthenticated(true)
    setLoading(false)
    
    // Original auth check commented out for testing
    /*
    const checkAuth = async () => {
      const hasSession = localStorage.getItem('menusparks_session')
      if (!hasSession) {
        router.push('/#pricing')
      } else {
        setIsAuthenticated(true)
      }
      setLoading(false)
    }
    checkAuth()
    */
  }, [router])

  const handleFileChange = (files: File[]) => {
    setUploadedFiles(files)
    setGeneratedRecipes([])
    setError(null)
  }

  const handleMenuFileChange = (files: File[]) => {
    setMenuFiles(files)
  }

  const handleGenerateRecipes = async () => {
    if (uploadedFiles.length === 0 && menuFiles.length === 0) {
      setError('Please upload at least an ingredient list or menu file.')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const recipes = await generateRecipes(
        uploadedFiles,
        menuFiles,
        recipeRequests,
        customRequest,
        includeIngredients,
        excludeIngredients,
        selectedEquipment,
        recipeStyle,
        recipeComplexity,
        restaurantStyle,
        theme
      )
      setGeneratedRecipes(recipes)
    } catch (err: any) {
      setError(err.message || 'Failed to generate recipes. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">AI Recipe Generator</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {generatedRecipes.length === 0 ? (
          <div className="space-y-6">
            {/* Step 1: Upload Ingredients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Step 1: Upload Your Inventory
              </h2>
              <FileUpload
                label="Upload ingredient list (CSV, TXT, or image)"
                accept=".csv,.txt,.pdf,image/*"
                files={uploadedFiles}
                onFileChange={handleFileChange}
                multiple={true}
              />
            </div>

            {/* Step 2: Upload Menu (Optional) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Step 2: Upload Your Menu (Optional)
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload your current menu so we can avoid suggesting similar dishes
              </p>
              <FileUpload
                label="Upload menu (PDF, image, or text)"
                accept=".pdf,.txt,image/*"
                files={menuFiles}
                onFileChange={handleMenuFileChange}
                multiple={true}
              />
            </div>

            {/* Step 3: Recipe Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Step 3: Recipe Preferences
              </h2>
              
              {/* Recipe Count */}
              <div className="mb-6">
                <RecipeCountSelector
                  recipeRequests={recipeRequests}
                  onChange={setRecipeRequests}
                />
              </div>

              {/* Style and Complexity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Style
                  </label>
                  <select
                    value={recipeStyle}
                    onChange={(e) => setRecipeStyle(e.target.value as RecipeStyle)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="creative">Creative - Original fusion dishes</option>
                    <option value="classic">Classic - Traditional favorites</option>
                    <option value="hybrid">Hybrid - Classic with a twist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complexity Level
                  </label>
                  <select
                    value={recipeComplexity}
                    onChange={(e) => setRecipeComplexity(e.target.value as RecipeComplexity)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="basic">Basic - Quick & simple</option>
                    <option value="intermediate">Intermediate - Standard prep</option>
                    <option value="chef">Chef - Advanced techniques</option>
                  </select>
                </div>
              </div>

              {/* Restaurant Style */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant Style (Optional)
                </label>
                <input
                  type="text"
                  value={restaurantStyle}
                  onChange={(e) => setRestaurantStyle(e.target.value)}
                  placeholder="e.g., Italian, Food Truck, Fine Dining, Gluten-Free"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Theme */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme (Optional)
                </label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g., St. Patrick's Day, Summer BBQ, Comfort Food"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Equipment */}
              <div className="mb-6">
                <EquipmentSelector
                  selectedEquipment={selectedEquipment}
                  onChange={setSelectedEquipment}
                />
              </div>

              {/* Include/Exclude Ingredients */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Must Include Ingredients
                  </label>
                  <input
                    type="text"
                    value={includeIngredients}
                    onChange={(e) => setIncludeIngredients(e.target.value)}
                    placeholder="e.g., chicken, tomatoes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exclude Ingredients
                  </label>
                  <input
                    type="text"
                    value={excludeIngredients}
                    onChange={(e) => setExcludeIngredients(e.target.value)}
                    placeholder="e.g., nuts, shellfish"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Custom Request */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  placeholder="Any specific requirements or preferences..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerateRecipes}
                disabled={isGenerating || (uploadedFiles.length === 0 && menuFiles.length === 0)}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Recipes...
                  </span>
                ) : (
                  'Generate Specials'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Generated Specials ({generatedRecipes.length})
              </h2>
              <button
                onClick={() => {
                  setGeneratedRecipes([])
                  setUploadedFiles([])
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Generate New Specials
              </button>
            </div>

            {/* Recipe Cards */}
            <div className="space-y-6">
              {generatedRecipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}