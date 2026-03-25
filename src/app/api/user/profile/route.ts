import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [restaurantProfile, socialSettings] = await Promise.all([
    prisma.userRestaurantProfile.findUnique({ where: { userId: session.user.id } }),
    prisma.userSocialSettings.findUnique({ where: { userId: session.user.id } }),
  ]);

  return NextResponse.json({ restaurantProfile, socialSettings });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { restaurantProfile, socialSettings } = body;

  const updates: Promise<unknown>[] = [];

  if (restaurantProfile) {
    updates.push(
      prisma.userRestaurantProfile.upsert({
        where: { userId: session.user.id },
        update: {
          restaurantName: restaurantProfile.restaurantName ?? undefined,
          restaurantType: restaurantProfile.restaurantType ?? undefined,
          cuisineStyle: restaurantProfile.cuisineStyle ?? undefined,
          location: restaurantProfile.location ?? undefined,
          phone: restaurantProfile.phone ?? undefined,
          description: restaurantProfile.description ?? undefined,
          defaultRecipeStyle: restaurantProfile.defaultRecipeStyle ?? undefined,
          defaultComplexity: restaurantProfile.defaultComplexity ?? undefined,
          defaultDecade: restaurantProfile.defaultDecade ?? undefined,
          defaultTheme: restaurantProfile.defaultTheme ?? undefined,
          defaultRestaurantStyles: restaurantProfile.defaultRestaurantStyles ?? undefined,
        },
        create: {
          userId: session.user.id,
          restaurantName: restaurantProfile.restaurantName ?? '',
          restaurantType: restaurantProfile.restaurantType ?? '',
          cuisineStyle: restaurantProfile.cuisineStyle ?? '',
          location: restaurantProfile.location ?? '',
          phone: restaurantProfile.phone ?? '',
          description: restaurantProfile.description ?? '',
          defaultRecipeStyle: restaurantProfile.defaultRecipeStyle ?? 'classic',
          defaultComplexity: restaurantProfile.defaultComplexity ?? 'basic',
          defaultDecade: restaurantProfile.defaultDecade ?? '',
          defaultTheme: restaurantProfile.defaultTheme ?? '',
          defaultRestaurantStyles: restaurantProfile.defaultRestaurantStyles ?? '[]',
        },
      })
    );
  }

  if (socialSettings) {
    updates.push(
      prisma.userSocialSettings.upsert({
        where: { userId: session.user.id },
        update: {
          tone: socialSettings.tone ?? undefined,
          brandHashtags: socialSettings.brandHashtags ?? undefined,
          ctaTemplate: socialSettings.ctaTemplate ?? undefined,
          alwaysInclude: socialSettings.alwaysInclude ?? undefined,
          alwaysExclude: socialSettings.alwaysExclude ?? undefined,
          platforms: socialSettings.platforms ?? undefined,
        },
        create: {
          userId: session.user.id,
          tone: socialSettings.tone ?? 'casual',
          brandHashtags: socialSettings.brandHashtags ?? '',
          ctaTemplate: socialSettings.ctaTemplate ?? '',
          alwaysInclude: socialSettings.alwaysInclude ?? '',
          alwaysExclude: socialSettings.alwaysExclude ?? '',
          platforms: socialSettings.platforms ?? 'Instagram,Facebook',
        },
      })
    );
  }

  await Promise.all(updates);

  return NextResponse.json({ success: true });
}
