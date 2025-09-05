import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// This runs ONLY on the server - API key is safe here
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists (server-side only)
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured on server' },
        { status: 500 }
      )
    }

    // Parse the request
    const data = await request.json()
    const {
      ingredients,
      recipeCount = 3,
      style = 'creative',
      complexity = 'intermediate',
      restaurantStyle = '',
      theme = '',
      equipment = [],
      includeIngredients = '',
      excludeIngredients = '',
      customRequest = ''
    } = data

    // Validate input
    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide ingredients' },
        { status: 400 }
      )
    }

    // Build the prompt
    const prompt = `You are an executive chef creating restaurant specials. 
    
Generate ${recipeCount} unique recipes based on these ingredients:
${ingredients}

Requirements:
- Style: ${style === 'creative' ? 'Original and innovative' : style === 'classic' ? 'Traditional favorites' : 'Classic with a modern twist'}
- Complexity: ${complexity === 'basic' ? 'Simple, quick execution' : complexity === 'chef' ? 'Advanced techniques' : 'Moderate prep and skill'}
${restaurantStyle ? `- Restaurant Style: ${restaurantStyle}` : ''}
${theme ? `- Theme: ${theme}` : ''}
${equipment.length > 0 ? `- Available Equipment: ${equipment.join(', ')}` : ''}
${includeIngredients ? `- Must Include: ${includeIngredients}` : ''}
${excludeIngredients ? `- Must Exclude: ${excludeIngredients}` : ''}
${customRequest ? `- Special Instructions: ${customRequest}` : ''}

For each recipe, provide:
1. Recipe Name (creative and appealing)
2. Description (menu-worthy, 1-2 sentences)
3. Yield (e.g., "Serves 4")
4. Ingredients (with amounts)
5. Instructions (numbered steps)
6. Chef Notes (tips for scaling or substitutions)
7. Estimated food cost per serving
8. Suggested menu price

Format as JSON array with these fields: recipeName, description, yield, ingredients (array), instructions (array), chefNotes, costPerServing, suggestedPrice`

    // Call Gemini API (server-side only)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',  // Using gemini-1.5-flash as gemini-pro is deprecated
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        maxOutputTokens: 8192,
      }
    })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the response
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const recipes = JSON.parse(jsonMatch[0])
        return NextResponse.json({ recipes })
      } else {
        // If no JSON array found, return the text for debugging
        return NextResponse.json({ 
          recipes: [],
          rawResponse: text,
          error: 'Could not parse recipes from response' 
        })
      }
    } catch (parseError) {
      console.error('Parse error:', parseError)
      return NextResponse.json({ 
        recipes: [],
        rawResponse: text,
        error: 'Failed to parse recipe data' 
      })
    }

  } catch (error: any) {
    console.error('Recipe generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate recipes' },
      { status: 500 }
    )
  }
}

// Optional: Add rate limiting or authentication here
export async function GET() {
  return NextResponse.json({ 
    message: 'Recipe generation API',
    status: 'Ready',
    method: 'POST required'
  })
}