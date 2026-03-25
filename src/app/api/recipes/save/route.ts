import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';
import { Recipe } from '@/types/recipes';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { recipe: Recipe };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { recipe } = body;
  if (!recipe?.recipeName) {
    return NextResponse.json({ error: 'Recipe is required' }, { status: 400 });
  }

  try {
    await prisma.savedRecipe.create({
      data: {
        userId: session.user.id,
        recipeName: recipe.recipeName,
        mealType: recipe.mealType,
        description: recipe.description ?? '',
        yield: recipe.yield,
        ingredients: JSON.stringify(recipe.ingredients),
        prep: JSON.stringify(recipe.prep ?? []),
        bulkPrep: JSON.stringify(recipe.bulkPrep ?? []),
        instructions: JSON.stringify(recipe.instructions),
        chefNotes: recipe.chefNotes ?? null,
        socialPost: recipe.socialMediaPost ?? null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[MenuSparks] Save recipe error:', err);
    return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 });
  }
}
