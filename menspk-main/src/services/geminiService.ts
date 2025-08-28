import { GoogleGenerativeAI } from '@google/generative-ai'
import { Recipe } from '@/types/recipe'

// The API key should be set in environment variables
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  }
}

const fileToTextPart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result)
      } else {
        reject(new Error('Failed to read file as text.'))
      }
    }
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}

export const generateRecipes = async (
  files: File[],
  menuFiles: File[],
  recipeRequests: { mealType: string; count: number }[],
  customRequest: string,
  includeIngredients: string,
  excludeIngredients: string,
  equipment: string[],
  recipeStyle: 'creative' | 'classic' | 'hybrid',
  recipeComplexity: 'basic' | 'intermediate' | 'chef',
  restaurantStyle: string,
  theme: string
): Promise<Recipe[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    // Build the prompt
    const totalCount = recipeRequests.reduce((sum, req) => sum + req.count, 0)
    if (totalCount === 0) {
      return []
    }

    const requestDescription = recipeRequests
      .map(req => `${req.count} ${req.mealType}${req.count > 1 ? 's' : ''}`)
      .join(', ')

    let prompt = `You are an executive chef creating restaurant specials. Generate ${totalCount} unique recipes (${requestDescription}) based on the following requirements:

Recipe Style: ${recipeStyle === 'creative' ? 'Original and innovative' : recipeStyle === 'classic' ? 'Traditional favorites' : 'Classic with a modern twist'}
Complexity: ${recipeComplexity === 'basic' ? 'Simple, quick execution' : recipeComplexity === 'chef' ? 'Advanced techniques' : 'Moderate prep and skill'}
${restaurantStyle ? `Restaurant Style: ${restaurantStyle}` : ''}
${theme ? `Theme: ${theme}` : ''}
${equipment.length > 0 ? `Available Equipment: ${equipment.join(', ')}` : ''}
${includeIngredients ? `Must Include: ${includeIngredients}` : ''}
${excludeIngredients ? `Must Exclude: ${excludeIngredients}` : ''}
${customRequest ? `Special Instructions: ${customRequest}` : ''}

Please provide each recipe in the following JSON format:
{
  "recipeName": "Creative name for the dish",
  "description": "Menu-worthy description",
  "yield": "e.g., Serves 4 or Makes 12 portions",
  "ingredients": ["ingredient 1 with amount", "ingredient 2 with amount"],
  "prep": ["Mise en place step 1", "Mise en place step 2"],
  "bulkPrep": ["Batch cooking step 1", "Batch cooking step 2"],
  "instructions": ["Service/plating step 1", "Service/plating step 2"],
  "chefNotes": "Tips for scaling or substitutions",
  "socialMediaPost": "Instagram-ready description with emojis and hashtags"
}

Return an array of ${totalCount} recipe objects.`

    // Process ingredient files
    if (files.length > 0) {
      prompt += '\n\nIngredient List:\n'
      for (const file of files) {
        if (file.type.includes('text') || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
          const content = await fileToTextPart(file)
          prompt += content + '\n'
        }
      }
    }

    // Process menu files
    if (menuFiles.length > 0) {
      prompt += '\n\nCurrent Menu (avoid similar dishes):\n'
      for (const file of menuFiles) {
        if (file.type.includes('text') || file.name.endsWith('.txt')) {
          const content = await fileToTextPart(file)
          prompt += content + '\n'
        }
      }
    }

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse the JSON response
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const recipes = JSON.parse(jsonMatch[0])
        return recipes as Recipe[]
      } else {
        throw new Error('No valid JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse response:', text)
      throw new Error('Failed to parse recipe data. Please try again.')
    }
  } catch (error: any) {
    console.error('Gemini API error:', error)
    if (error.message?.includes('API_KEY')) {
      throw new Error('API key not configured. Please contact support.')
    }
    throw new Error('Failed to generate recipes. Please try again.')
  }
}