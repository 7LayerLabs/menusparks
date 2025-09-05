'use client'

import { useState } from 'react'

interface RecipeSettingsProps {
  onGenerate: (settings: any) => void
  loading: boolean
}

export default function RecipeSettings({ onGenerate, loading }: RecipeSettingsProps) {
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>(['Main Course'])
  const [recipeCounts, setRecipeCounts] = useState<Record<string, number>>({
    'Main Course': 2
  })
  
  const [customRequest, setCustomRequest] = useState('')
  const [includeIngredients, setIncludeIngredients] = useState('')
  const [excludeIngredients, setExcludeIngredients] = useState('')
  const [recipeStyle, setRecipeStyle] = useState('creative')
  const [recipeComplexity, setRecipeComplexity] = useState('intermediate')
  const [restaurantStyles, setRestaurantStyles] = useState<string[]>([])
  const [theme, setTheme] = useState('')
  const [equipment, setEquipment] = useState<string[]>([])
  const [ingredientFiles, setIngredientFiles] = useState<File[]>([])
  const [menuFiles, setMenuFiles] = useState<File[]>([])

  const mealTypes = [
    'Breakfast',
    'Brunch',
    'Lunch', 
    'Dinner',
    'Appetizer',
    'Main Course',
    'Dessert',
    'Soup / Chowder',
    'Salad',
    'Sandwich',
    'Side Dish',
    'Beverage',
    'Snack',
    'Bakery Item'
  ]

  const restaurantTypeOptions = [
    { value: 'American (New)', label: '🍽️ American (New)', icon: '🍽️' },
    { value: 'American (Traditional)', label: '🍔 American (Traditional)', icon: '🍔' },
    { value: 'Classic Diner', label: '🥞 Classic Diner', icon: '🥞' },
    { value: 'Bistro / Brasserie', label: '🥖 Bistro / Brasserie', icon: '🥖' },
    { value: 'Café / Coffee Shop', label: '☕ Café / Coffee Shop', icon: '☕' },
    { value: 'Casual Dining', label: '🍴 Casual Dining', icon: '🍴' },
    { value: 'Family Style', label: '👨‍👩‍👧‍👦 Family Style', icon: '👨‍👩‍👧‍👦' },
    { value: 'Kids Menu', label: '🧒 Kids Menu', icon: '🧒' },
    { value: 'Fine Dining', label: '⭐ Fine Dining', icon: '⭐' },
    { value: 'Food Truck', label: '🚚 Food Truck', icon: '🚚' },
    { value: 'Gastropub', label: '🍺 Gastropub', icon: '🍺' },
    { value: 'Italian', label: '🍝 Italian', icon: '🍝' },
    { value: 'French', label: '🥐 French', icon: '🥐' },
    { value: 'Japanese / Sushi', label: '🍱 Japanese / Sushi', icon: '🍱' },
    { value: 'Mexican / Tex-Mex', label: '🌮 Mexican / Tex-Mex', icon: '🌮' },
    { value: 'Chinese', label: '🥡 Chinese', icon: '🥡' },
    { value: 'Indian', label: '🍛 Indian', icon: '🍛' },
    { value: 'Mediterranean', label: '🫒 Mediterranean', icon: '🫒' },
    { value: 'Middle Eastern', label: '🥙 Middle Eastern', icon: '🥙' },
    { value: 'Seafood', label: '🦞 Seafood', icon: '🦞' },
    { value: 'Steakhouse', label: '🥩 Steakhouse', icon: '🥩' },
    { value: 'Tapas / Small Plates', label: '🍤 Tapas / Small Plates', icon: '🍤' },
    { value: 'Gluten-Free', label: '🌾 Gluten-Free', icon: '🌾' },
    { value: 'Vegetarian / Vegan', label: '🌱 Vegetarian / Vegan', icon: '🌱' }
  ]

  const equipmentOptions = [
    'Grill', 'Fryer', 'Smoker', 'Sous Vide', 'Pizza Oven', 
    'Salamander', 'Combi Oven', 'Blast Chiller', 'Ice Cream Maker',
    'Pasta Machine', 'Wok Station', 'Plancha', 'Rotisserie', 'Griddle',
    'Charbroiler', 'Steam Table', 'Pressure Cooker'
  ]

  const toggleMealType = (mealType: string) => {
    if (selectedMealTypes.includes(mealType)) {
      setSelectedMealTypes(selectedMealTypes.filter(t => t !== mealType))
      const newCounts = { ...recipeCounts }
      delete newCounts[mealType]
      setRecipeCounts(newCounts)
    } else {
      setSelectedMealTypes([...selectedMealTypes, mealType])
      setRecipeCounts({ ...recipeCounts, [mealType]: 1 })
    }
  }

  const toggleRestaurantStyle = (style: string) => {
    if (restaurantStyles.includes(style)) {
      setRestaurantStyles(restaurantStyles.filter(s => s !== style))
    } else {
      setRestaurantStyles([...restaurantStyles, style])
    }
  }

  const updateRecipeCount = (mealType: string, count: number) => {
    setRecipeCounts({ ...recipeCounts, [mealType]: count })
  }

  const handleGenerate = () => {
    const recipeRequests = selectedMealTypes.map(mealType => ({
      mealType,
      count: recipeCounts[mealType] || 1
    }))

    const settings = {
      recipeRequests,
      customRequest,
      includeIngredients,
      excludeIngredients,
      equipment,
      recipeStyle,
      recipeComplexity,
      restaurantStyle: restaurantStyles.join(', '),
      theme,
      ingredientFiles,
      menuFiles
    }
    onGenerate(settings)
  }

  const totalRecipeCount = Object.values(recipeCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-8">
      {/* Recipe Types Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🍽️</span>
          Recipe Types & Quantities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {mealTypes.map((mealType) => (
            <div 
              key={mealType}
              className={`relative border-2 rounded-lg p-3 transition-all ${
                selectedMealTypes.includes(mealType)
                  ? 'border-orange-500 bg-orange-50 shadow-md transform scale-105'
                  : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={selectedMealTypes.includes(mealType)}
                    onChange={() => toggleMealType(mealType)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {mealType}
                  </span>
                </label>
              </div>
              {selectedMealTypes.includes(mealType) && (
                <div className="mt-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={recipeCounts[mealType] || 1}
                    onChange={(e) => updateRecipeCount(mealType, parseInt(e.target.value) || 1)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {totalRecipeCount > 0 && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              Total: {totalRecipeCount} recipe{totalRecipeCount !== 1 ? 's' : ''} selected
            </span>
          </div>
        )}
      </div>

      {/* Restaurant Style Multi-Select */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🍴</span>
          Restaurant Style(s) - Select All That Apply
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {restaurantTypeOptions.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => toggleRestaurantStyle(style.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 flex items-center justify-start ${
                restaurantStyles.includes(style.value)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50'
              }`}
            >
              <span className="mr-2">{style.icon}</span>
              <span className="text-xs">{style.value}</span>
            </button>
          ))}
        </div>
        {restaurantStyles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Selected: <span className="font-semibold text-blue-600">{restaurantStyles.join(', ')}</span>
            </p>
          </div>
        )}
      </div>

      {/* Style and Complexity Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl mr-2">✨</span>
            Recipe Creativity
          </label>
          <select
            value={recipeStyle}
            onChange={(e) => setRecipeStyle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="creative">🎨 Creative & Innovative</option>
            <option value="classic">📖 Traditional Favorites</option>
            <option value="hybrid">🔄 Classic with a Twist</option>
          </select>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl mr-2">📊</span>
            Complexity Level
          </label>
          <select
            value={recipeComplexity}
            onChange={(e) => setRecipeComplexity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="basic">🟢 Basic (Quick Execution)</option>
            <option value="intermediate">🟡 Intermediate (Moderate)</option>
            <option value="chef">🔴 Chef Level (Advanced)</option>
          </select>
        </div>
      </div>

      {/* Theme Input */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          <span className="text-xl mr-2">🎭</span>
          Theme or Occasion (optional)
        </label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g., Summer Specials, Valentine's Day, Local Harvest, Game Day, Holiday Menu"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Ingredients Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl mr-2">✅</span>
            Must Include Ingredients
          </label>
          <textarea
            value={includeIngredients}
            onChange={(e) => setIncludeIngredients(e.target.value)}
            placeholder="e.g., salmon, asparagus, lemon, olive oil, seasonal vegetables"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />
          <p className="text-xs text-gray-600 mt-2">
            These ingredients will be featured prominently in your recipes
          </p>
        </div>
        
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl mr-2">🚫</span>
            Must Exclude (Allergies/Restrictions)
          </label>
          <textarea
            value={excludeIngredients}
            onChange={(e) => setExcludeIngredients(e.target.value)}
            placeholder="e.g., nuts, shellfish, gluten, dairy, eggs, soy"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          />
          <p className="text-xs text-gray-600 mt-2">
            These ingredients will be completely avoided
          </p>
        </div>
      </div>

      {/* Equipment Selection */}
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <label className="block text-sm font-bold text-gray-700 mb-4">
          <span className="text-xl mr-2">🔧</span>
          Available Kitchen Equipment
        </label>
        <div className="flex flex-wrap gap-2">
          {equipmentOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (equipment.includes(item)) {
                  setEquipment(equipment.filter(e => e !== item))
                } else {
                  setEquipment([...equipment, item])
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                equipment.includes(item)
                  ? 'bg-yellow-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-yellow-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl mr-2">📋</span>
            Upload Ingredient List (optional)
          </label>
          <div className="relative">
            <input
              type="file"
              multiple
              accept=".txt,.csv,.pdf,image/*"
              onChange={(e) => setIngredientFiles(Array.from(e.target.files || []))}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            {ingredientFiles.length > 0 && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {ingredientFiles.length} file(s) selected
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            <span className="text-xl mr-2">📄</span>
            Upload Current Menu (optional)
          </label>
          <div className="relative">
            <input
              type="file"
              multiple
              accept=".txt,.pdf,image/*"
              onChange={(e) => setMenuFiles(Array.from(e.target.files || []))}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            {menuFiles.length > 0 && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {menuFiles.length} file(s) selected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          <span className="text-xl mr-2">💬</span>
          Special Instructions (optional)
        </label>
        <textarea
          value={customRequest}
          onChange={(e) => setCustomRequest(e.target.value)}
          placeholder="Any specific requirements, dietary notes, portion sizes, or creative direction for your recipes..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        />
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading || selectedMealTypes.length === 0}
          className={`
            px-10 py-5 text-lg font-bold rounded-xl transition-all transform
            ${loading || selectedMealTypes.length === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white hover:from-orange-600 hover:via-orange-700 hover:to-red-600 hover:scale-105 shadow-xl hover:shadow-2xl'
            }
          `}
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Your Culinary Masterpieces...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-2xl mr-3">🚀</span>
              <span>Generate {totalRecipeCount} Restaurant Special{totalRecipeCount !== 1 ? 's' : ''}</span>
              <span className="text-2xl ml-3">✨</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}