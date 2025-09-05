'use client'

import { useState, useEffect } from 'react'

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalGenerated: 0,
    totalSaved: 0,
    avgRecipesPerGeneration: 0,
    mostUsedIngredients: [] as string[],
    favoriteStyles: [] as { style: string; count: number }[],
    recentActivity: [] as any[]
  })

  useEffect(() => {
    // Calculate stats from localStorage
    const history = JSON.parse(localStorage.getItem('recipeHistory') || '[]')
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    
    // Total recipes generated
    const totalGenerated = history.reduce((sum: number, entry: any) => 
      sum + (entry.recipes?.length || 0), 0
    )
    
    // Average recipes per generation
    const avgRecipesPerGeneration = history.length > 0 
      ? (totalGenerated / history.length).toFixed(1)
      : 0
    
    // Most used ingredients
    const ingredientCounts: Record<string, number> = {}
    history.forEach((entry: any) => {
      entry.recipes?.forEach((recipe: any) => {
        recipe.ingredients?.forEach((ing: string) => {
          const mainIngredient = ing.split(',')[0].toLowerCase()
          ingredientCounts[mainIngredient] = (ingredientCounts[mainIngredient] || 0) + 1
        })
      })
    })
    
    const mostUsedIngredients = Object.entries(ingredientCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([ingredient]) => ingredient)
    
    // Style preferences
    const styleCounts: Record<string, number> = {}
    history.forEach((entry: any) => {
      const style = entry.settings?.recipeStyle || 'creative'
      styleCounts[style] = (styleCounts[style] || 0) + 1
    })
    
    const favoriteStyles = Object.entries(styleCounts)
      .map(([style, count]) => ({ style, count }))
      .sort((a, b) => b.count - a.count)
    
    // Recent activity
    const recentActivity = history.slice(0, 5).map((entry: any) => ({
      date: entry.date,
      recipeCount: entry.recipes?.length || 0,
      style: entry.settings?.recipeStyle || 'creative'
    }))
    
    setStats({
      totalGenerated,
      totalSaved: saved.length,
      avgRecipesPerGeneration: Number(avgRecipesPerGeneration),
      mostUsedIngredients,
      favoriteStyles,
      recentActivity
    })
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
              <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Generated</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalGenerated}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Saved Recipes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalSaved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Avg per Session</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.avgRecipesPerGeneration}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Sessions</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.recentActivity.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Style Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Style Preferences</h3>
          {stats.favoriteStyles.length > 0 ? (
            <div className="space-y-3">
              {stats.favoriteStyles.map((style) => (
                <div key={style.style} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {style.style.replace('_', ' ')}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ 
                          width: `${(style.count / Math.max(...stats.favoriteStyles.map(s => s.count))) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{style.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No style data available yet</p>
          )}
        </div>

        {/* Most Used Ingredients */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Ingredients</h3>
          {stats.mostUsedIngredients.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stats.mostUsedIngredients.map((ingredient) => (
                <span 
                  key={ingredient}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No ingredient data available yet</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        {stats.recentActivity.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipes Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Style
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentActivity.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.recipeCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {activity.style.replace('_', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No activity recorded yet</p>
        )}
      </div>
    </div>
  )
}