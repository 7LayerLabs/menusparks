'use client'

interface RecipeRequest {
  mealType: string
  count: number
}

interface RecipeCountSelectorProps {
  recipeRequests: RecipeRequest[]
  onChange: (requests: RecipeRequest[]) => void
}

const MEAL_TYPES = ['Appetizer', 'Soup', 'Salad', 'Entree', 'Dinner', 'Dessert', 'Brunch', 'Lunch']

export default function RecipeCountSelector({ recipeRequests, onChange }: RecipeCountSelectorProps) {
  const updateRequest = (index: number, field: 'mealType' | 'count', value: string | number) => {
    const updated = [...recipeRequests]
    if (field === 'mealType') {
      updated[index].mealType = value as string
    } else {
      updated[index].count = value as number
    }
    onChange(updated)
  }

  const addRequest = () => {
    onChange([...recipeRequests, { mealType: 'Dinner', count: 1 }])
  }

  const removeRequest = (index: number) => {
    onChange(recipeRequests.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Number of Recipes by Type
      </label>
      <div className="space-y-2">
        {recipeRequests.map((request, index) => (
          <div key={index} className="flex gap-2 items-center">
            <select
              value={request.mealType}
              onChange={(e) => updateRequest(index, 'mealType', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {MEAL_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="10"
              value={request.count}
              onChange={(e) => updateRequest(index, 'count', parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {recipeRequests.length > 1 && (
              <button
                type="button"
                onClick={() => removeRequest(index)}
                className="px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      {recipeRequests.length < 5 && (
        <button
          type="button"
          onClick={addRequest}
          className="mt-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
        >
          + Add Another Type
        </button>
      )}
    </div>
  )
}