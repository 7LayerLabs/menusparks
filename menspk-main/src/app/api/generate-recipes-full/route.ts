import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// This runs ONLY on the server - API key is safe here
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Convert file to base64 for Gemini
async function fileToGenerativePart(buffer: Buffer, mimeType: string) {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType,
    },
  }
}

// Process text files
async function processTextFile(buffer: Buffer): Promise<string> {
  return buffer.toString('utf-8')
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured on server' },
        { status: 500 }
      )
    }

    // Parse multipart form data
    const formData = await request.formData()
    
    // Extract all the settings
    const recipeRequests = JSON.parse(formData.get('recipeRequests') as string || '[]')
    const customRequest = formData.get('customRequest') as string || ''
    const includeIngredients = formData.get('includeIngredients') as string || ''
    const excludeIngredients = formData.get('excludeIngredients') as string || ''
    const equipment = JSON.parse(formData.get('equipment') as string || '[]')
    const recipeStyle = formData.get('recipeStyle') as string || 'creative'
    const recipeComplexity = formData.get('recipeComplexity') as string || 'intermediate'
    const restaurantStyle = formData.get('restaurantStyle') as string || ''
    const theme = formData.get('theme') as string || ''

    // Process uploaded files
    const ingredientFiles = formData.getAll('ingredients') as File[]
    const menuFiles = formData.getAll('menus') as File[]

    // Build the comprehensive prompt (from original app)
    const systemInstruction = `You are a critically-acclaimed executive chef with a Michelin-star background, known for your pragmatic yet innovative approach to menu development in high-pressure, professional kitchens. Your philosophy is built on creating dishes that are both delicious and profitable.

Your core directives are:
1. USE PROVIDED INGREDIENTS: You MUST create recipes using the ingredients specified in "Must Include" and "Available Ingredients" sections.
2. CRITICAL CULINARY LOGIC: Be a harsh critic of your own ideas. Every component of a dish must have a purpose.
   - NO REDUNDANCY: Never pair a primary ingredient with a side of the same ingredient.
   - DISH COHESION: Ensure all parts work together harmoniously.
3. SERVICE SPEED & EFFICIENCY: Recipes must be optimized for rapid service. Pick-up time under 15 minutes.
4. STRUCTURED METHODOLOGY: Divide instructions into three phases:
   - 'prep': All mise en place tasks (knife work, portioning, basic prep)
   - 'bulkPrep': Batch cooking before service (sauces, stocks, pre-cooking proteins)
   - 'instructions': Final pick-up steps for service (plating, finishing, garnish)
5. PROFESSIONAL LANGUAGE: Write for a seasoned kitchen brigade with industry terminology.
6. PRACTICAL SCALABILITY: Provide both metric and imperial measurements. Include scaling tips.
7. SPECIFY YIELD: Clear professional yield (e.g., "Yields: 12 portions" or "Serves: 4-6")
8. FOOD COST AWARENESS: Calculate realistic food costs and suggest profitable menu prices (3x-4x food cost).
9. CUISINE & CONTEXT: Align with specified restaurant style and theme.
10. SOCIAL MEDIA READY: Include Instagram-worthy description with relevant emojis and trending hashtags.`

    // Calculate total recipes
    const totalCount = recipeRequests.reduce((sum: number, req: any) => sum + req.count, 0)
    if (totalCount === 0) {
      return NextResponse.json({ error: 'Please specify at least one recipe to generate' }, { status: 400 })
    }

    // Build the user prompt
    const requestDescription = recipeRequests
      .map((req: any) => `${req.count} ${req.mealType}${req.count > 1 ? 's' : ''}`)
      .join(', ')

    // Combine system instruction with user prompt
    let fullPrompt = systemInstruction + `

TASK: Generate ${totalCount} unique restaurant-quality recipes (${requestDescription}).

REQUIREMENTS:
Recipe Style: ${recipeStyle === 'creative' ? 'Original and innovative fusion' : recipeStyle === 'classic' ? 'Traditional favorites with perfect execution' : 'Classic dishes with modern twists'}
Complexity: ${recipeComplexity === 'basic' ? 'Simple, quick execution, minimal prep' : recipeComplexity === 'chef' ? 'Advanced techniques, complex preparations' : 'Moderate prep and skill level'}
${restaurantStyle ? `Restaurant Style: ${restaurantStyle}` : ''}
${theme ? `Theme: ${theme}` : ''}
${equipment.length > 0 ? `Available Equipment: ${equipment.join(', ')}` : ''}
${includeIngredients ? `MUST INCLUDE THESE INGREDIENTS: ${includeIngredients}` : ''}
${excludeIngredients ? `MUST EXCLUDE (allergies/restrictions): ${excludeIngredients}` : ''}
${customRequest ? `Special Instructions: ${customRequest}` : ''}

CRITICAL REQUIREMENTS:
1. You MUST use the ingredients listed in "Must Include" as PRIMARY components in your recipes
2. If "Available Ingredients" are provided, prioritize using those in your recipes
3. Each recipe must be COMPLETELY DIFFERENT from others - no variations of the same dish
4. Include ALL required JSON fields for each recipe
5. Ensure prep, bulkPrep, and instructions are separate and detailed
6. IMPORTANT: Return ONLY the JSON array, no additional text or formatting

OUTPUT FORMAT: Return ONLY a valid JSON array (starting with [ and ending with ]) containing recipe objects.
Do NOT include markdown formatting, code blocks, or any text outside the JSON.

Return a JSON array with these exact fields for each recipe:
{
  "recipeName": "Creative dish name",
  "description": "Menu-worthy description (1-2 sentences)",
  "yield": "Professional yield (e.g., 'Yields: 12 portions')",
  "ingredients": ["ingredient with amount"],
  "prep": ["mise en place step"],
  "bulkPrep": ["batch cooking step"],
  "instructions": ["final service step"],
  "chefNotes": "Scaling tips and conversions",
  "costPerServing": "Estimated cost per serving",
  "suggestedPrice": "Menu price recommendation",
  "socialMediaPost": "Instagram post with emojis and hashtags"
}`

    // Process ingredient files
    if (ingredientFiles.length > 0) {
      fullPrompt += '\n\nAVAILABLE INGREDIENTS (use these to create the recipes):\n'
      for (const file of ingredientFiles) {
        const buffer = Buffer.from(await file.arrayBuffer())
        if (file.type.includes('text') || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
          const content = await processTextFile(buffer)
          fullPrompt += content + '\n'
        }
      }
    }

    // Process menu files
    if (menuFiles.length > 0) {
      fullPrompt += '\n\nCURRENT MENU (create different dishes to avoid redundancy):\n'
      for (const file of menuFiles) {
        const buffer = Buffer.from(await file.arrayBuffer())
        if (file.type.includes('text') || file.name.endsWith('.txt')) {
          const content = await processTextFile(buffer)
          fullPrompt += content + '\n'
        }
      }
    }

    // Log what we're sending for debugging
    console.log('Recipe Generation Request:', {
      totalRecipes: totalCount,
      style: recipeStyle,
      complexity: recipeComplexity,
      mustInclude: includeIngredients,
      mustExclude: excludeIngredients,
      hasIngredientFiles: ingredientFiles.length > 0,
      hasMenuFiles: menuFiles.length > 0
    })

    // Build parts for Gemini
    const parts = [{ text: fullPrompt }]

    // Add image files if any
    for (const file of [...ingredientFiles, ...menuFiles]) {
      if (file.type.startsWith('image/')) {
        const buffer = Buffer.from(await file.arrayBuffer())
        parts.push(await fileToGenerativePart(buffer, file.type))
      }
    }

    // Call Gemini API - use the appropriate model
    const hasImages = parts.some(part => 'inlineData' in part)
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',  // Use gemini-1.5-flash for all requests (text and images)
      generationConfig: {
        temperature: 0.8,
        topP: 0.9,
        maxOutputTokens: 8192,
      }
    })

    const result = await model.generateContent(hasImages ? parts : fullPrompt)
      
    const response = await result.response
    const text = response.text()

    // Parse the response
    try {
      console.log('Raw response length:', text.length)
      console.log('First 500 chars:', text.substring(0, 500))
      
      // Try to find JSON array in the response (greedy match to get the full array)
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        console.log('Found JSON match, attempting to parse...')
        const jsonString = jsonMatch[0]
        // Clean up any potential formatting issues
        const cleanedJson = jsonString
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim()
        
        const recipes = JSON.parse(cleanedJson)
        console.log('Successfully parsed', recipes.length, 'recipes')
        return NextResponse.json({ recipes })
      } else {
        // Try to find JSON between code blocks
        const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
        if (codeBlockMatch) {
          console.log('Found code block, attempting to parse...')
          const recipes = JSON.parse(codeBlockMatch[1])
          return NextResponse.json({ recipes })
        }
        
        console.log('No JSON found in response')
        return NextResponse.json({ 
          recipes: [],
          rawResponse: text.substring(0, 1000), // Send first 1000 chars for debugging
          error: 'Could not find JSON array in response. Please try again.' 
        })
      }
    } catch (parseError: any) {
      console.error('Parse error:', parseError.message)
      console.error('Failed text sample:', text.substring(0, 500))
      return NextResponse.json({ 
        recipes: [],
        rawResponse: text.substring(0, 1000),
        error: `Failed to parse recipe data: ${parseError.message}` 
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