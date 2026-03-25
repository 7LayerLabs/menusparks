import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { GenerateRecipesBody, Recipe, SocialMediaSettings } from '@/types/recipes';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 8192 },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} — ${err}`);
  }
  const data = await res.json();
  const candidate = data.candidates?.[0];
  if (candidate?.finishReason === 'MAX_TOKENS') {
    console.warn('[MenuSparks] Gemini hit MAX_TOKENS — response may be truncated');
  }
  return candidate?.content?.parts?.[0]?.text ?? '';
}

function parseJsonFromResponse(text: string): any {
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  if (!cleaned) throw new Error('Empty response from AI');
  // If JSON is truncated, try to salvage it by closing open brackets
  try {
    return JSON.parse(cleaned);
  } catch {
    // Attempt to close truncated JSON array
    const fixed = cleaned.replace(/,?\s*$/, '') + ']}]';
    try { return JSON.parse(fixed); } catch {}
    // Last resort: find the last complete object
    const lastComplete = cleaned.lastIndexOf('},');
    if (lastComplete > 0) {
      try { return JSON.parse(cleaned.slice(0, lastComplete + 1) + ']'); } catch {}
    }
    console.error('[MenuSparks] Raw Gemini response:', cleaned.slice(0, 500));
    throw new Error('AI returned invalid JSON — try generating fewer recipes at once');
  }
}

function buildSocialInstructions(social?: SocialMediaSettings): string {
  if (!social) return `"socialMediaPost": "engaging social media caption with relevant hashtags"`;

  const toneDesc = {
    fun: 'fun, energetic, and playful',
    casual: 'warm, friendly, and conversational',
    professional: 'polished and informative',
    upscale: 'refined, elegant, and aspirational',
  }[social.tone];

  const lines: string[] = [`Tone: ${toneDesc}`];
  if (social.platforms?.length > 0) lines.push(`Platforms: ${social.platforms.join(', ')}`);
  if (social.brandHashtags) lines.push(`Always end with these brand hashtags: ${social.brandHashtags}`);
  if (social.ctaTemplate) lines.push(`Always include this call to action: "${social.ctaTemplate}"`);
  if (social.alwaysInclude) lines.push(`Always include: ${social.alwaysInclude}`);
  if (social.alwaysExclude) lines.push(`Never include: ${social.alwaysExclude}`);

  return `"socialMediaPost": "Write a social post following these rules:\\n${lines.join('\\n')}"`;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check credits before doing any work
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscriptions: {
        where: { status: 'active' },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  const activeSubscription = user?.subscriptions?.[0];
  const FREE_TRIAL_LIMIT = 5;

  // Admins have unlimited generations
  if (!user?.isAdmin) {
    if (!activeSubscription) {
      if ((user?.generationsUsed ?? 0) >= FREE_TRIAL_LIMIT) {
        return NextResponse.json(
          { error: 'FREE_TRIAL_EXHAUSTED', message: 'You have used all 5 free specials. Please subscribe to continue.' },
          { status: 402 }
        );
      }
    } else {
      const limit = activeSubscription.monthlyGenerationLimit;
      if ((user?.generationsThisMonth ?? 0) >= limit) {
        return NextResponse.json(
          { error: 'MONTHLY_LIMIT_REACHED', message: 'You have reached your monthly generation limit.' },
          { status: 402 }
        );
      }
    }
  }

  let body: GenerateRecipesBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const {
    recipeRequests,
    customRequest = '',
    includeIngredients = '',
    excludeIngredients = '',
    equipment = [],
    recipeStyle,
    recipeComplexity,
    restaurantStyles = [],
    theme = '',
    decade = '',
    socialMediaSettings,
  } = body;

  const total = recipeRequests.reduce((s, r) => s + r.count, 0);
  if (total === 0) {
    return NextResponse.json({ error: 'No recipes requested' }, { status: 400 });
  }

  const styleDesc = {
    creative: 'innovative and modern with unexpected flavor combinations',
    classic: 'traditional and time-tested, true to culinary heritage',
    hybrid: 'a creative twist on a classic, blending tradition with innovation',
  }[recipeStyle];

  const complexityDesc = {
    basic: 'simple, line-cook friendly execution during a busy service. One protein, one simple sauce (e.g. raisin sauce, pineapple glaze, pan gravy, herb butter). No reductions, no multi-step sauces, no advanced technique. Under 15 minute ticket time.',
    intermediate: 'moderate technique requiring a sous chef. 2-3 components, may include a simple pan sauce or reduction, some prep-ahead work. 15-25 minute ticket time.',
    chef: 'advanced technique, executive chef showcase dish. Multiple refined components, classical sauces (demi-glace, port reduction, consommé), precise plating, complex prep. This is the signature dish level.',
  }[recipeComplexity];

  const contextParts: string[] = [];
  if (restaurantStyles.length > 0) contextParts.push(`Restaurant type: ${restaurantStyles.join(', ')}`);
  if (theme) contextParts.push(`Theme/occasion: ${theme}`);
  if (decade) contextParts.push(`Era/decade inspiration: ${decade}`);
  if (customRequest) contextParts.push(`Special request: ${customRequest}`);
  if (includeIngredients) contextParts.push(`Must include these ingredients: ${includeIngredients}`);
  if (excludeIngredients) contextParts.push(`Do NOT use these ingredients: ${excludeIngredients}`);
  if (equipment.length > 0) contextParts.push(`Available equipment: ${equipment.join(', ')}`);

  const recipeList = recipeRequests
    .map(r => `${r.count} ${r.mealType} recipe${r.count > 1 ? 's' : ''}`)
    .join(', ');

  const socialPostInstruction = buildSocialInstructions(socialMediaSettings);

  const prompt = `You are an expert executive chef and menu consultant. Generate ${total} restaurant-quality recipes.

REQUIREMENTS:
- Generate: ${recipeList}
- Style: ${styleDesc}
- Complexity: ${complexityDesc}
${contextParts.map(c => `- ${c}`).join('\n')}

CRITICAL: Generate REAL, SPECIFIC named dishes appropriate for the context. For example:
- For a classic American Easter dinner: suggest dishes like "Glazed Ham with Pineapple Raisin Sauce", "Herb-Roasted Leg of Lamb", "Stuffed Chicken Breast with Asparagus"
- NOT generic names like "Easter dinner classic garlic"

Return ONLY a valid JSON array with exactly ${total} recipe objects. No markdown, no explanation, just the JSON array.

Each recipe object must have:
{
  "recipeName": "specific dish name",
  "mealType": "meal type",
  "description": "2-3 sentence description of the dish",
  "yield": "X portions",
  "ingredientGroups": [
    { "group": "For the [Component]", "items": ["quantity item, prep", ...] },
    { "group": "For the [Sauce/Side/etc]", "items": ["quantity item, prep", ...] }
  ],
  "prep": ["mise en place step 1", "mise en place step 2", ...],
  "bulkPrep": ["batch prep step 1", ...],
  "instructions": ["service step 1", "service step 2", ...],
  "chefNotes": "plating, scaling, and execution notes",
  ${socialPostInstruction}
}`;

  try {
    const raw = await callGemini(prompt);
    const parsed = parseJsonFromResponse(raw);

    if (!Array.isArray(parsed)) {
      return NextResponse.json({ error: 'Unexpected AI response format' }, { status: 500 });
    }

    const recipes: Recipe[] = parsed.map((r: any) => {
      // Flatten ingredientGroups into a flat list for backward compat (ask-chef, etc.)
      const ingredientGroups = Array.isArray(r.ingredientGroups) ? r.ingredientGroups : [];
      const flatIngredients: string[] = ingredientGroups.length > 0
        ? ingredientGroups.flatMap((g: any) => Array.isArray(g.items) ? g.items : [])
        : (Array.isArray(r.ingredients) ? r.ingredients : []);

      return {
        recipeName: r.recipeName ?? 'Chef Special',
        mealType: r.mealType ?? recipeRequests[0]?.mealType ?? 'Entree',
        description: r.description ?? '',
        yield: r.yield ?? '8 portions',
        ingredientGroups,
        ingredients: flatIngredients,
        prep: Array.isArray(r.prep) ? r.prep : [],
        bulkPrep: Array.isArray(r.bulkPrep) ? r.bulkPrep : [],
        instructions: Array.isArray(r.instructions) ? r.instructions : [],
        chefNotes: r.chefNotes ?? '',
        socialMediaPost: r.socialMediaPost ?? '',
      };
    });

    // Deduct credits and log the generation
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        generationsUsed: { increment: 1 },
        generationsThisMonth: { increment: 1 },
      },
    });

    await prisma.recipeGeneration.create({
      data: {
        userId: session.user.id,
        recipeCount: recipes.length,
        mealTypes: recipeRequests.map(r => r.mealType).join(','),
        recipeStyle,
        complexity: recipeComplexity,
        theme: theme || null,
      },
    });

    console.log(`[MenuSparks] User ${session.user.id} generated ${recipes.length} recipes`);

    return NextResponse.json({ recipes });
  } catch (err) {
    console.error('[MenuSparks] Recipe generation error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
